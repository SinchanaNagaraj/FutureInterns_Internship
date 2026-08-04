import os
import random
from glob import glob
from pathlib import Path

import numpy as np
from PIL import Image
from tqdm import tqdm

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as T
import torchvision.utils as vutils

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

def weights_init_normal(m):
    classname = m.__class__.__name__
    if classname.find("Conv") != -1:
        nn.init.normal_(m.weight.data, 0.0, 0.02)
        if getattr(m, "bias", None) is not None:
            nn.init.constant_(m.bias.data, 0.0)
    elif classname.find("BatchNorm2d") != -1 or classname.find("InstanceNorm2d") != -1:
        if getattr(m, "weight", None) is not None:
            nn.init.normal_(m.weight.data, 1.0, 0.02)
        if getattr(m, "bias", None) is not None:
            nn.init.constant_(m.bias.data, 0.0)

def save_image_grid(tensors, filepath, nrow=3, normalize=True, value_range=(-1, 1)):
    grid = vutils.make_grid(tensors, nrow=nrow, normalize=normalize, value_range=value_range)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    vutils.save_image(grid, filepath)

class RandomJitter:
    def __init__(self, load_size=286, crop_size=256):
        self.load_size = load_size
        self.crop_size = crop_size

    def __call__(self, imgA, imgB):
       
        resize = T.Resize((self.load_size, self.load_size), interpolation=T.InterpolationMode.BICUBIC)
        imgA = resize(imgA)
        imgB = resize(imgB)
        
        i, j, h, w = T.RandomCrop.get_params(imgA, output_size=(self.crop_size, self.crop_size))
        imgA = T.functional.crop(imgA, i, j, h, w)
        imgB = T.functional.crop(imgB, i, j, h, w)
        
        if random.random() > 0.5:
            imgA = T.functional.hflip(imgA)
            imgB = T.functional.hflip(imgB)
        return imgA, imgB

class PairedImageDataset(Dataset):
   
    def __init__(self, root, split="train", mode="concat", crop=True):
        super().__init__()
        self.root = Path(root)
        self.split = split
        self.mode = mode
        self.crop = crop

        if mode == "concat":
            self.paths = sorted(glob(str(self.root / split / "*")))
        elif mode == "folders":
            self.pathsA = sorted(glob(str(self.root / f"{split}A" / "*")))
            self.pathsB = sorted(glob(str(self.root / f"{split}B" / "*")))
            
            mapB = {Path(p).stem: p for p in self.pathsB}
            matched = []
            for pA in self.pathsA:
                stem = Path(pA).stem
                if stem in mapB:
                    matched.append((pA, mapB[stem]))
            self.paths = matched
        else:
            raise ValueError("mode must be 'concat' or 'folders'")

        self.to_tensor = T.ToTensor()
        self.normalize = T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
        self.jitter = RandomJitter(286, 256) if crop else None
        self.resize256 = T.Resize((256, 256), interpolation=T.InterpolationMode.BICUBIC)

    def __len__(self):
        return len(self.paths)

    def _load_image(self, p):
        return Image.open(p).convert("RGB")

    def __getitem__(self, idx):
        if self.mode == "concat":
            p = self.paths[idx]
            img = self._load_image(p)
            w, h = img.size
            w2 = w // 2
            imgA = img.crop((0, 0, w2, h))
            imgB = img.crop((w2, 0, w, h))
        else:  # folders
            pA, pB = self.paths[idx]
            imgA = self._load_image(pA)
            imgB = self._load_image(pB)

        
        imgA = self.resize256(imgA)
        imgB = self.resize256(imgB)
        if self.jitter:
            imgA, imgB = self.jitter(imgA, imgB)

        imgA = self.normalize(self.to_tensor(imgA))
        imgB = self.normalize(self.to_tensor(imgB))
        return {"A": imgA, "B": imgB}

class UNetDown(nn.Module):
    def __init__(self, in_c, out_c, norm=True):
        super().__init__()
        layers = [nn.Conv2d(in_c, out_c, 4, 2, 1, bias=not norm)]
        if norm:
            layers.append(nn.InstanceNorm2d(out_c))
        layers.append(nn.LeakyReLU(0.2, inplace=True))
        self.block = nn.Sequential(*layers)

    def forward(self, x):
        return self.block(x)

class UNetUp(nn.Module):
    def __init__(self, in_c, out_c, dropout=False):
        super().__init__()
        layers = [nn.ConvTranspose2d(in_c, out_c, 4, 2, 1, bias=False),
                  nn.InstanceNorm2d(out_c),
                  nn.ReLU(inplace=True)]
        if dropout:
            layers.append(nn.Dropout(0.5))
        self.block = nn.Sequential(*layers)

    def forward(self, x, skip):
        x = self.block(x)
        
        x = torch.cat([x, skip], dim=1)
        return x

class GeneratorUNet(nn.Module):
    def __init__(self, in_channels=3, out_channels=3):
        super().__init__()
        
        self.d1 = UNetDown(in_channels, 64, norm=False)   
        self.d2 = UNetDown(64, 128)                       
        self.d3 = UNetDown(128, 256)                      
        self.d4 = UNetDown(256, 512)                     
        self.d5 = UNetDown(512, 512)                      
        self.d6 = UNetDown(512, 512)                     
        self.d7 = UNetDown(512, 512)                      
        self.d8 = UNetDown(512, 512, norm=False)          

        
        self.u1 = UNetUp(512, 512, dropout=True)         
        self.u2 = UNetUp(1024, 512, dropout=True)        
        self.u3 = UNetUp(1024, 512, dropout=True)        
        self.u4 = UNetUp(1024, 512)                       
        self.u5 = UNetUp(1024, 256)                      
        self.u6 = UNetUp(512, 128)                        
        self.u7 = UNetUp(256, 64)                         
        self.final = nn.Sequential(
            nn.ConvTranspose2d(128, out_channels, 4, 2, 1),
            nn.Tanh()
        )

    def forward(self, x):
        d1 = self.d1(x)
        d2 = self.d2(d1)
        d3 = self.d3(d2)
        d4 = self.d4(d3)
        d5 = self.d5(d4)
        d6 = self.d6(d5)
        d7 = self.d7(d6)
        d8 = self.d8(d7)

        u1 = self.u1(d8, d7)
        u2 = self.u2(u1, d6)
        u3 = self.u3(u2, d5)
        u4 = self.u4(u3, d4)
        u5 = self.u5(u4, d3)
        u6 = self.u6(u5, d2)
        u7 = self.u7(u6, d1)
        out = self.final(u7)
        return out

class Discriminator(nn.Module):
    """
    70x70 PatchGAN: takes concatenated [A, B] as input
    """
    def __init__(self, in_channels=3):
        super().__init__()
        def disc_block(in_c, out_c, norm=True):
            layers = [nn.Conv2d(in_c, out_c, 4, 2, 1, bias=not norm)]
            if norm:
                layers.append(nn.InstanceNorm2d(out_c))
            layers.append(nn.LeakyReLU(0.2, inplace=True))
            return layers

        self.model = nn.Sequential(
            *disc_block(in_channels * 2, 64, norm=False), 
            *disc_block(64, 128),                         
            *disc_block(128, 256),                        
            nn.Conv2d(256, 512, 4, 1, 1, bias=False),     
            nn.InstanceNorm2d(512),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(512, 1, 4, 1, 1)                    
        )

    def forward(self, A, B):
        x = torch.cat([A, B], dim=1)
        return self.model(x)  

class Pix2Pix:
    def __init__(self, in_channels=3, out_channels=3, lambda_L1=100.0, lr=2e-4, betas=(0.5, 0.999), device=None):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.G = GeneratorUNet(in_channels, out_channels).to(self.device)
        self.D = Discriminator(in_channels).to(self.device)

        self.G.apply(weights_init_normal)
        self.D.apply(weights_init_normal)

        self.adv_criterion = nn.BCEWithLogitsLoss()
        self.l1_criterion = nn.L1Loss()

        self.opt_G = torch.optim.Adam(self.G.parameters(), lr=lr, betas=betas)
        self.opt_D = torch.optim.Adam(self.D.parameters(), lr=lr, betas=betas)
        self.lambda_L1 = lambda_L1

    def save(self, ckpt_dir, epoch):
        os.makedirs(ckpt_dir, exist_ok=True)
        torch.save({"G": self.G.state_dict(),
                    "D": self.D.state_dict(),
                    "opt_G": self.opt_G.state_dict(),
                    "opt_D": self.opt_D.state_dict(),
                    "epoch": epoch},
                   os.path.join(ckpt_dir, f"pix2pix_epoch_{epoch}.pt"))

    def load(self, ckpt_path):
        ckpt = torch.load(ckpt_path, map_location=self.device)
        self.G.load_state_dict(ckpt["G"])
        self.D.load_state_dict(ckpt["D"])
        self.opt_G.load_state_dict(ckpt["opt_G"])
        self.opt_D.load_state_dict(ckpt["opt_D"])
        return ckpt.get("epoch", 0)

    def train_one_epoch(self, loader, epoch, sample_dir=None):
        self.G.train()
        self.D.train()
        pbar = tqdm(loader, desc=f"Epoch {epoch}", ncols=100)

        for i, batch in enumerate(pbar):
            A = batch["A"].to(self.device)
            B = batch["B"].to(self.device)

            self.opt_D.zero_grad()
            with torch.no_grad():
                fakeB = self.G(A)
            real_logits = self.D(A, B)
            fake_logits = self.D(A, fakeB.detach())

            real_targets = torch.ones_like(real_logits)
            fake_targets = torch.zeros_like(fake_logits)

            d_real = self.adv_criterion(real_logits, real_targets)
            d_fake = self.adv_criterion(fake_logits, fake_targets)
            d_loss = (d_real + d_fake) * 0.5
            d_loss.backward()
            self.opt_D.step()

            
            self.opt_G.zero_grad()
            fakeB = self.G(A)
            fake_logits = self.D(A, fakeB)
            adv_loss = self.adv_criterion(fake_logits, torch.ones_like(fake_logits))
            l1_loss = self.l1_criterion(fakeB, B) * self.lambda_L1
            g_loss = adv_loss + l1_loss
            g_loss.backward()
            self.opt_G.step()

            pbar.set_postfix({
                "D": f"{d_loss.item():.3f}",
                "G": f"{g_loss.item():.3f}",
                "L1": f"{l1_loss.item():.3f}"
            })

        
            if sample_dir and (i % 200 == 0):
                with torch.no_grad():
                    grid = torch.cat([A[:3], B[:3], fakeB[:3]], dim=0)
                    save_image_grid(grid, os.path.join(sample_dir, f"epoch{epoch}_iter{i}.png"), nrow=3)

    @torch.no_grad()
    def evaluate(self, loader, out_dir, max_batches=None):
        self.G.eval()
        os.makedirs(out_dir, exist_ok=True)
        count = 0
        for i, batch in enumerate(tqdm(loader, desc="Evaluating", ncols=100)):
            A = batch["A"].to(self.device)
            B = batch["B"].to(self.device) if "B" in batch else None
            fakeB = self.G(A)
            
            if B is not None:
                grid = torch.cat([A, B, fakeB], dim=0)
                nrow = A.size(0)
                save_image_grid(grid, os.path.join(out_dir, f"batch_{i:04d}.png"), nrow=nrow)
            else:
                grid = torch.cat([A, fakeB], dim=0)
                nrow = A.size(0)
                save_image_grid(grid, os.path.join(out_dir, f"batch_{i:04d}.png"), nrow=nrow)
            count += 1
            if max_batches and count >= max_batches:
                break

def get_loaders(data_root, mode="concat", batch_size=1, num_workers=2, crop=True):
    train_ds = PairedImageDataset(data_root, split="train", mode=mode, crop=crop)
    test_split = "val" if (Path(data_root) / "val").exists() else "test"
    test_ds = PairedImageDataset(data_root, split=test_split, mode=mode, crop=False)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True,
                              num_workers=num_workers, pin_memory=True, drop_last=True)
    test_loader = DataLoader(test_ds, batch_size=batch_size, shuffle=False,
                             num_workers=num_workers, pin_memory=True)
    return train_loader, test_loader

def train_pix2pix(
    data_root,
    mode="concat",          
    epochs=50,
    batch_size=1,
    lr=2e-4,
    lambda_L1=100.0,
    out_dir="./runs/pix2pix",
    seed=42
):
    set_seed(seed)
    os.makedirs(out_dir, exist_ok=True)
    ckpt_dir = os.path.join(out_dir, "checkpoints")
    sample_dir = os.path.join(out_dir, "samples")

    train_loader, test_loader = get_loaders(data_root, mode=mode, batch_size=batch_size)
    p2p = Pix2Pix(lambda_L1=lambda_L1, lr=lr)

    for epoch in range(1, epochs + 1):
        p2p.train_one_epoch(train_loader, epoch, sample_dir=sample_dir)
        if epoch % 10 == 0 or epoch == epochs:
            p2p.save(ckpt_dir, epoch)
         
            p2p.evaluate(test_loader, os.path.join(out_dir, f"eval_epoch_{epoch}"), max_batches=5)

    print("Training complete.")
    return os.path.join(ckpt_dir, f"pix2pix_epoch_{epochs}.pt")

@torch.no_grad()
def infer_pix2pix(ckpt_path, data_root, mode="concat", out_dir="./runs/pix2pix/infer", max_batches=None):
    _, test_loader = get_loaders(data_root, mode=mode, batch_size=1, crop=False)
    p2p = Pix2Pix()
    p2p.load(ckpt_path)
    p2p.evaluate(test_loader, out_dir, max_batches=max_batches)
    print(f"Inference saved to: {out_dir}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--data_root", type=str, required=True, help="Path to dataset root")
    parser.add_argument("--mode", type=str, default="concat", choices=["concat", "folders"])
    parser.add_argument("--epochs", type=int, default=50)
    parser.add_argument("--batch_size", type=int, default=1)
    parser.add_argument("--lr", type=float, default=2e-4)
    parser.add_argument("--lambda_L1", type=float, default=100.0)
    parser.add_argument("--out_dir", type=str, default="./runs/pix2pix")
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--infer_only", action="store_true")
    parser.add_argument("--ckpt", type=str, default="")
    parser.add_argument("--max_batches", type=int, default=0)
    args = parser.parse_args()

    if args.infer_only:
        assert args.ckpt, "Provide --ckpt for inference"
        infer_pix2pix(args.ckpt, args.data_root, mode=args.mode, out_dir=os.path.join(args.out_dir, "infer"),
                      max_batches=args.max_batches if args.max_batches > 0 else None)
    else:
        ckpt = train_pix2pix(
            data_root=args.data_root,
            mode=args.mode,
            epochs=args.epochs,
            batch_size=args.batch_size,
            lr=args.lr,
            lambda_L1=args.lambda_L1,
            out_dir=args.out_dir,
            seed=args.seed
        )
        print("Final checkpoint:", ckpt)