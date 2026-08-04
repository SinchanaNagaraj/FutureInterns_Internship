# Prodigy Internship — Generative AI Tasks

This repository contains the five Generative AI tasks completed during the Prodigy InfoTech internship.

---

## PROD_GA_01 — GPT-2 Fine-Tuning for Text Generation

Fine-tuned the `openai-community/gpt2` model on the `SparkleDark/Everything_about_dogs` dataset using Hugging Face Transformers.

**Approach:**
- Loaded and tokenized the dataset with a block size of 128 tokens
- Fine-tuned GPT-2 for 3 epochs using the `Trainer` API
- Generated text using top-p sampling (p=0.95, temperature=0.8)

**Files:** `Task 1.ipynb`, `output.png`

**Dependencies:** `transformers`, `datasets`, `accelerate`, `torch`

---

## PROD_GA_02 — Image Generation

Generated images using a generative model.

**Files:** `Task 2`, `generated_images/fantasy_castle.png`

---

## PROD_GA_03 — Markov Chain Text Generation

Built a bigram Markov chain from scratch to generate text based on *Around the World in 80 Days* (TRAVELLER.txt).

**Approach:**
- Parsed and lowercased the source text
- Built a word-level transition chain using `defaultdict`
- Generated 100-word sequences by randomly sampling next words from the chain

**Files:** `TASK 3.ipynb`

**Dependencies:** Python standard library only (`collections`, `random`)

---

## PROD_GA_04 — Pix2Pix Image-to-Image Translation

Implemented a full Pix2Pix GAN from scratch using PyTorch for paired image-to-image translation.

**Architecture:**
- Generator: U-Net with 8 encoder / 7 decoder blocks + skip connections
- Discriminator: 70×70 PatchGAN
- Loss: Adversarial (BCEWithLogitsLoss) + L1 loss (λ=100)

**Training:**
- Supports both `concat` (side-by-side pairs) and `folders` dataset modes
- Random jitter augmentation (resize to 286 → random crop to 256 + horizontal flip)
- Checkpoints saved every 10 epochs

**Usage:**
```bash
# Train
python "TASK 4.py" --data_root /path/to/dataset --epochs 50

# Inference
python "TASK 4.py" --infer_only --ckpt /path/to/checkpoint.pt --data_root /path/to/dataset
```

**Files:** `TASK 4.py`

**Dependencies:** `torch`, `torchvision`, `Pillow`, `tqdm`, `numpy`

---

## PROD_GA_05 — Neural Style Transfer

Implemented Neural Style Transfer using a pre-trained VGG-19 network to blend the content of one image with the artistic style of another.

**Approach:**
- Extracted content features from layer `conv4_2` (layer 21)
- Extracted style features from layers `conv1_1`, `conv2_1`, `conv3_1`, `conv4_1`, `conv5_1`
- Optimized the generated image directly using Adam (lr=0.01, 300 iterations)
- Style loss computed via Gram matrices; total loss = content loss + 1e6 × style loss

**Files:** `TASK 5.py`, `content.jpg`, `style.jpg`, `stylized_output.jpg`

**Dependencies:** `torch`, `torchvision`, `Pillow`

---

## Repository Structure

```
├── PROD_GA_01/          # GPT-2 fine-tuning
├── PROD_GA_02/          # Image generation
├── PROD_GA_03/          # Markov chain text generation
├── PROD_GA_04/          # Pix2Pix GAN
└── PROD_GA_05/          # Neural style transfer
```

> Note: Model checkpoints and training output images are excluded from this repo (see `.gitignore`).
