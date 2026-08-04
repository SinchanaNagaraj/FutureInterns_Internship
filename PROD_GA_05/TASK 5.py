import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
from torchvision.utils import save_image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_image(path, size=512):
    img = Image.open(path).convert('RGB')
    transform = transforms.Compose([
        transforms.Resize(size),
        transforms.ToTensor()
    ])
    return transform(img).unsqueeze(0).to(device)

content = load_image('content.jpg', size=256) 
style = load_image('style.jpg', size=256)

vgg = models.vgg19(weights=models.VGG19_Weights.IMAGENET1K_V1).features.to(device).eval()

content_layers = ['21']  
style_layers = ['0', '5', '10', '19', '28']

def get_features(x):
    c_feats, s_feats = [], []
    for name, layer in enumerate(vgg):
        x = layer(x)
        if str(name) in content_layers:
            c_feats.append(x)
        if str(name) in style_layers:
            s_feats.append(x)
    return c_feats, s_feats

with torch.no_grad():
    content_feats, _ = get_features(content)
    _, style_feats = get_features(style)
    style_grams = [torch.mm(sf.view(sf.shape[1], -1),
                            sf.view(sf.shape[1], -1).t()) for sf in style_feats]

content_feats = [f.detach() for f in content_feats]
style_grams = [g.detach() for g in style_grams]

generated = content.clone().requires_grad_(True).to(device)

optimizer = torch.optim.Adam([generated], lr=0.01)

for i in range(300):  
    optimizer.zero_grad()
    gen_content_feats, gen_style_feats = get_features(generated)

    content_loss = F.mse_loss(gen_content_feats[0], content_feats[0])

    style_loss = 0
    for gf, sg in zip(gen_style_feats, style_grams):
        gram_g = torch.mm(gf.view(gf.shape[1], -1),
                          gf.view(gf.shape[1], -1).t())
        style_loss += F.mse_loss(gram_g, sg)

    total_loss = content_loss + 1e6 * style_loss
    total_loss.backward()
    optimizer.step()

    if i % 50 == 0:
        print(f"Step {i}, Total loss: {total_loss.item():.2f}")

save_image(generated, 'stylized_output.jpg')
