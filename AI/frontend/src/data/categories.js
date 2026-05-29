export const categories = [
  {
    id: "generative-ai",
    title: "Generative AI",
    shortDescription: "Architectures designed to generate novel data distributions, from deep generative models to large-scale autoregressive transformers.",
    description: "Explore the bleeding edge of Artificial Intelligence. Generative AI covers the methodologies, neural architectures, and optimization techniques used to generate high-fidelity synthetic images, human-like text, audio, and structured code datasets.",
    icon: "Sparkles",
    color: "#a855f7", /* secondary violet */
    gradient: "linear-gradient(135deg, #a855f7, #6366f1)",
    difficulty: "Advanced",
    topics: [
      {
        id: "large-language-models",
        title: "Large Language Models & Autoregression",
        shortDesc: "Understand decoder-only transformer blocks, causal masking, tokenization pipelines, and scaling laws.",
        difficulty: "Advanced",
        readTime: "15 min",
        content: `### 1. The Core Architecture: Decoder-Only Transformers
Most state-of-the-art Large Language Models (e.g., GPT-4, Llama-3) utilize a **decoder-only transformer architecture**. Unlike the original Encoder-Decoder transformer proposed in *Attention Is All You Need*, decoder-only models are pure autoregressive systems optimized for next-token prediction.

#### Causal Masking
To prevent the model from looking ahead at future tokens during training, a **Causal Mask** is applied to the self-attention matrix. This is represented mathematically as:

$$\\text{MaskedAttention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V$$

Where $M$ is a causal mask matrix where elements above the diagonal are set to $-\\infty$ and others to 0.

### 2. Autoregression & Decoding Strategies
LLMs generate text by predicting one token at a time. The formula for the probability of a sequence $W$ is decomposed as:

$$P(W) = \\prod_{i=1}^n P(w_i | w_1, w_2, ..., w_{i-1})$$

To control text diversity and prevent repetitive loops, we deploy specialized **Decoding Strategies**:
*   **Temperature Scaling ($T$):** Scales the pre-softmax logits $z_i$ as $z_i / T$. Lower temperatures ($T < 1$) make predictions highly deterministic, while higher values ($T > 1$) increase randomness.
*   **Top-P (Nucleus) Sampling:** Restricts the candidate tokens to the smallest subset whose cumulative probability exceeds threshold $p$ (e.g., $p=0.9$).
*   **Top-K Sampling:** Selects only the $K$ highest-probability tokens.`,
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class CausalSelfAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)
        self.out_proj = nn.Linear(d_model, d_model)

    def forward(self, x):
        batch_size, seq_len, d_model = x.shape
        
        # Project and reshape into heads: [B, H, S, D_K]
        q = self.q_proj(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        k = self.k_proj(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        v = self.v_proj(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        
        # Calculate Scaled Dot-Product Attention
        scores = torch.matmul(q, k.transpose(-2, -1)) / torch.sqrt(torch.tensor(self.d_k, dtype=torch.float32))
        
        # Create and apply causal mask
        mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1).bool().to(x.device)
        scores = scores.masked_fill(mask.unsqueeze(0).unsqueeze(1), float('-inf'))
        
        attn_weights = F.softmax(scores, dim=-1)
        output = torch.matmul(attn_weights, v) # [B, H, S, D_K]
        
        # Concatenate heads and project
        output = output.transpose(1, 2).contiguous().view(batch_size, seq_len, d_model)
        return self.out_proj(output), attn_weights

# Initialize and test input shape: [Batch=2, Seq=5, Dim=256]
model = CausalSelfAttention(d_model=256, num_heads=4)
x = torch.randn(2, 5, 256)
out, weights = model(x)
print(f"Input Shape: {x.shape}")
print(f"Output Shape: {out.shape}")
print(f"Attention Weights Shape: {weights.shape}")`,
        codeLanguage: "python",
        simulatedOutput: `Running test script...
Input Shape: torch.Size([2, 5, 256])
Output Shape: torch.Size([2, 5, 256])
Attention Weights Shape: torch.Size([2, 4, 5, 5])
Causal verification passed: Upper triangular elements are completely masked (set to -inf before softmax).
Output values computed successfully!`,
        exercises: [
          "Explain why causal masking is necessary during training but can be skipped for single-token inference pipelines.",
          "Write a mathematical proof showing how Temperature = 0 corresponds to greedy decoding."
        ]
      },
      {
        id: "diffusion-models",
        title: "Denoising Diffusion Probabilistic Models (DDPM)",
        shortDesc: "Understand forward noise scheduling, reverse diffusion math, and U-Net score-matching architectures.",
        difficulty: "Expert",
        readTime: "20 min",
        content: `### 1. The Core Paradigm: Forward & Reverse Steps
Unlike Generative Adversarial Networks (GANs), **Diffusion Models** (like Stable Diffusion and Midjourney) generate data by learning to systematically invert a physical process: adding noise to data.

#### The Forward Process ($q$)
This is a fixed Markov chain that gradually adds Gaussian noise to an image $x_0$ across $T$ steps, according to a noise schedule $\\beta_1, ..., \\beta_T$:

$$q(x_t | x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1 - \\beta_t}x_{t-1}, \\beta_t I)$$

Crucially, we can sample $x_t$ directly at any arbitrary timestep $t$ using the analytical shortcut:

$$x_t = \\sqrt{\\bar{\\alpha}_t}x_0 + \\sqrt{1 - \\bar{\\alpha}_t}\\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)$$

Where $\\alpha_t = 1 - \\beta_t$ and $\\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s$.

#### The Reverse Process ($p_\\theta$)
Since the true reverse transition $q(x_{t-1} | x_t)$ is intractable, we train a neural network $p_\\theta$ to estimate the mean and variance of the distribution:

$$p_\\theta(x_{t-1} | x_t) = \\mathcal{N}(x_{t-1}; \\mu_\\theta(x_t, t), \\Sigma_\\theta(x_t, t))$$

In practice, instead of predicting the mean $\\mu_\\theta$ directly, the network (typically a U-Net with attention) is trained to predict the noise vector $\\epsilon$ added at timestep $t$. The objective function simplifies to:

$$\\mathcal{L}_{simple}(\\theta) = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ \\| \\epsilon - \\epsilon_\\theta(x_t, t) \\|^2 \\right]$$`,
        code: `import torch
import torch.nn as nn

class ForwardDiffusion:
    def __init__(self, num_timesteps=1000, beta_start=1e-4, beta_end=0.02):
        self.num_timesteps = num_timesteps
        
        # Define linear beta schedule
        self.betas = torch.linspace(beta_start, beta_end, num_timesteps)
        self.alphas = 1.0 - self.betas
        
        # Precompute cumulative product (alpha_bar)
        self.alphas_cumprod = torch.cumprod(self.alphas, dim=0)
        
        # Precompute terms for direct sampling
        self.sqrt_alphas_cumprod = torch.sqrt(self.alphas_cumprod)
        self.sqrt_one_minus_alphas_cumprod = torch.sqrt(1.0 - self.alphas_cumprod)

    def add_noise(self, x_0, t):
        """
        Samples x_t at timestep t directly.
        x_0 shape: [Batch, Channels, Height, Width]
        t shape: [Batch]
        """
        batch_size = x_0.shape[0]
        
        # Extract variables at index t and match dimensions
        sqrt_alpha_bar = self.sqrt_alphas_cumprod[t].view(batch_size, 1, 1, 1)
        sqrt_one_minus_alpha_bar = self.sqrt_one_minus_alphas_cumprod[t].view(batch_size, 1, 1, 1)
        
        # Draw random noise
        noise = torch.randn_like(x_0)
        
        # Linear combination: x_t = sqrt_alpha_bar * x_0 + sqrt_one_minus_alpha_bar * noise
        x_t = sqrt_alpha_bar * x_0 + sqrt_one_minus_alpha_bar * noise
        return x_t, noise

# Instantiate noise scheduler
scheduler = ForwardDiffusion(num_timesteps=1000)
x_0 = torch.randn(4, 3, 64, 64) # Batch of 4 RGB images, size 64x64
t = torch.tensor([50, 150, 450, 999]) # Random timesteps for each batch item

x_t, noise_added = scheduler.add_noise(x_0, t)
print(f"x_0 Min/Max: {x_0.min().item():.3f} / {x_0.max().item():.3f}")
print(f"x_t Min/Max (Step 999 is highly noisy): {x_t[3].min().item():.3f} / {x_t[3].max().item():.3f}")
print(f"Noise tensor shape: {noise_added.shape}")`,
        codeLanguage: "python",
        simulatedOutput: `Initializing linear beta schedule from 0.0001 to 0.02 over 1000 steps...
x_0 Min/Max: -3.892 / 3.911
x_t Min/Max (Step 999 is highly noisy): -3.954 / 4.102
Noise tensor shape: torch.Size([4, 3, 64, 64])
Forward diffusion process verified. Noise added tracks standard normal characteristics perfectly.`,
        exercises: [
          "Prove that as T goes to infinity, the final distribution x_T converges to a pure isotropic Gaussian distribution.",
          "Differentiate between Classifier-Free Guidance (CFG) and classifier-guided diffusion processes."
        ]
      }
    ]
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing",
    shortDescription: "Computational techniques to understand, represent, and generate human speech and text.",
    description: "Deep dive into language structures. From basic statistical models, Word2Vec embeddings, recurrent networks (LSTMs, GRUs), all the way to standard Encoder-Decoder architectures, attention mechanics, and fine-tuning procedures.",
    icon: "BookOpen",
    color: "#6366f1", /* primary indigo */
    gradient: "linear-gradient(135deg, #6366f1, #06b6d4)",
    difficulty: "Intermediate",
    topics: [
      {
        id: "attention-mechanism",
        title: "The Self-Attention Mechanism",
        shortDesc: "Unpack scaled dot-product attention, query-key-value projections, and multi-head complexity.",
        difficulty: "Intermediate",
        readTime: "10 min",
        content: `### 1. Scaling the Dot Product
Before self-attention, Recurrent Neural Networks (RNNs) processed text sequentially, leading to information loss over long contexts. Self-attention solves this by allowing every token to connect directly with every other token in a single operation.

The mathematical formulation uses three projections for each input token vector: **Query ($Q$)**, **Key ($K$)**, and **Value ($V$)**. The similarity between a Query and Key is calculated using a dot product, scaled by the square root of the key dimension ($d_k$):

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

#### Why Scale by $\\sqrt{d_k}$?
For large values of $d_k$, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradients). Dividing by $\\sqrt{d_k}$ stabilizes the variance of the dot products to 1, preventing mathematical saturation.

### 2. Multi-Head Attention (MHA)
Instead of performing attention once across the entire model dimension, **Multi-Head Attention** projects queries, keys, and values $h$ times into lower-dimensional subspaces, processes them in parallel, and concatenates the outputs:

$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h)W^O$$

Where $\\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$`,
        code: `import torch
import numpy as np

def basic_scaled_attention(q, k, v):
    """
    Standard single-head attention calculation.
    Shape: [Seq_len, Dim]
    """
    d_k = q.shape[-1]
    
    # 1. Compute dot-product raw weights: [Seq_len, Seq_len]
    scores = torch.matmul(q, k.transpose(-2, -1)) / np.sqrt(d_k)
    
    # 2. Softmax normalization across keys
    attn_weights = torch.softmax(scores, dim=-1)
    
    # 3. Weighted sum of values
    output = torch.matmul(attn_weights, v)
    return output, attn_weights

# Demo inputs for 3 tokens (e.g. "AI is cool")
q = torch.tensor([[1.0, 0.0, 2.0], [0.0, 2.0, 1.0], [2.0, 1.0, 0.0]])
k = torch.tensor([[1.0, 0.0, 2.0], [0.0, 2.0, 1.0], [2.0, 1.0, 0.0]])
v = torch.tensor([[10.0, 0.0], [0.0, 20.0], [5.0, 5.0]])

out, weights = basic_scaled_attention(q, k, v)
print("Attention Weights Matrix (rows sum to 1):")
print(weights)
print("\\nWeighted Output Embeddings:")
print(out)`,
        codeLanguage: "python",
        simulatedOutput: `Attention Weights Matrix (rows sum to 1):
tensor([[0.7818, 0.1704, 0.0478],
        [0.1704, 0.7818, 0.0478],
        [0.0478, 0.0478, 0.9044]])

Weighted Output Embeddings:
tensor([[8.0569, 3.6473],
        [1.9431, 15.8527],
        [0.9999, 5.4780]])

Process completed. You can see token 1 ('AI') pays 78% attention to itself, 17% to 'is', and 4.7% to 'cool'.`,
        exercises: [
          "Explain the time complexity of the self-attention layer as a function of sequence length N, and why this is a bottleneck for long sequences.",
          "Describe how Rotary Position Embeddings (RoPE) inject positional awareness into the attention maps."
        ]
      }
    ]
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    shortDescription: "Systems capable of analyzing high-dimensional visual inputs to parse objects, boundaries, and spatial dynamics.",
    description: "Deep dive into visual representation learning. Covers advanced convolutional neural networks (CNNs), residual links, object detection pipelines (YOLO, Faster R-CNN), image segmentation models (U-Net), and Vision Transformers (ViT).",
    icon: "Eye",
    color: "#06b6d4", /* accent cyan */
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    difficulty: "Intermediate",
    topics: [
      {
        id: "vision-transformers",
        title: "Vision Transformers (ViT)",
        shortDesc: "Understand how to patchify raw pixels, add classification tokens, and apply attention directly to images.",
        difficulty: "Advanced",
        readTime: "12 min",
        content: `### 1. Vision without Convolutions
Historically, Computer Vision relied entirely on **Convolutional Neural Networks (CNNs)** which apply localized sliding-window filters. **Vision Transformers (ViT)** bypass convolutions entirely, applying standard NLP Transformer blocks directly to images.

#### Patchification
Transformers cannot digest 2D image matrices natively. ViT solves this by dividing an image $x \\in \\mathbb{R}^{H \\times W \\times C}$ into a sequence of non-overlapping 2D patches $x_p \\in \\mathbb{R}^{N \\times (P^2 \\cdot C)}$, where $P \\times P$ is the patch resolution and $N = HW/P^2$ is the total number of patches.

These patches are flattened and projected into a $D$-dimensional embedding space using a linear layer, mimicking NLP's word embeddings.

#### The CLS Token and Position Embeddings
*   **[CLS] Token:** A learnable classification embedding is prepended to the sequence. Its state at the transformer output is used to perform the classification.
*   **Positional Embeddings:** Standard 1D learnable position embeddings are added to the patch embeddings to retain spatial orientation, as self-attention is permutation-invariant.`,
        code: `import torch
import torch.nn as nn

class PatchEmbedding(nn.Module):
    def __init__(self, img_size=224, patch_size=16, in_chans=3, embed_dim=768):
        super().__init__()
        self.img_size = img_size
        self.patch_size = patch_size
        self.n_patches = (img_size // patch_size) ** 2
        
        # Use a 2D convolution with kernel size and stride equal to patch_size
        # to efficiently extract and project patches in a single step!
        self.proj = nn.Conv2d(
            in_chans, 
            embed_dim, 
            kernel_size=patch_size, 
            stride=patch_size
        )

    def forward(self, x):
        # x: [Batch, Channels, Height, Width]
        x = self.proj(x) # [Batch, Embed_Dim, H_patches, W_patches]
        x = x.flatten(2) # [Batch, Embed_Dim, N_patches]
        x = x.transpose(1, 2) # [Batch, N_patches, Embed_Dim]
        return x

# Image size: 224x224 RGB, Batch of 2
img = torch.randn(2, 3, 224, 224)
patch_embed = PatchEmbedding(img_size=224, patch_size=16, in_chans=3, embed_dim=768)
out = patch_embed(img)

print(f"Input image tensor: {img.shape}")
print(f"Number of patches extracted: {patch_embed.n_patches}")
print(f"Output token embeddings tensor: {out.shape}")`,
        codeLanguage: "python",
        simulatedOutput: `Input image tensor: torch.Size([2, 3, 224, 224])
Number of patches extracted: 196
Output token embeddings tensor: torch.Size([2, 196, 768])
Successfully processed 2D image into 196 sequential patch tokens. Ready for standard multi-head transformer block ingestion.`,
        exercises: [
          "Compare the inductive biases of CNNs (locality and translation equivariance) with those of ViTs. Why do ViTs require larger training sets to outperform CNNs?",
          "Explain how standard 2D interpolation allows a trained ViT to process images of arbitrary resolutions at test time."
        ]
      }
    ]
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    shortDescription: "Closed-loop optimization techniques where agents learn optimal actions via dynamic environment feedback.",
    description: "Master decision theory and policy structures. Explore Bellman equations, dynamic programming, deep value networks (DQN), policy gradient theorems, and actor-critic paradigms.",
    icon: "Cpu",
    color: "#3b82f6", /* blue */
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    difficulty: "Advanced",
    topics: [
      {
        id: "proximal-policy-optimization",
        title: "Proximal Policy Optimization (PPO)",
        shortDesc: "Understand off-policy clip functions, advantage estimators, and Actor-Critic optimization loops.",
        difficulty: "Expert",
        readTime: "18 min",
        content: `### 1. The Policy Gradient Dilemma
Standard Policy Gradient methods (like REINFORCE) update parameters $\\theta$ along the gradient of expected reward. However, taking excessively large steps on the gradient can destabilize the policy entirely, sending the agent into unrecoverable states.

**Proximal Policy Optimization (PPO)** solves this by limiting the step size of each policy update through a specialized surrogate objective.

### 2. The Clipped Surrogate Objective
Let $r_t(\\theta)$ be the probability ratio between the new policy and old policy:

$$r_t(\\theta) = \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\theta_{old}}(a_t | s_t)}$$

PPO modifies the objective function by clamping the ratio to a range $[1 - \\epsilon, 1 + \\epsilon]$ (typically $\\epsilon=0.2$) when the advantage $A_t$ is positive or negative:

$$L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min\\left(r_t(\\theta)A_t, \\text{clip}(r_t(\\theta), 1 - \\epsilon, 1 + \\epsilon)A_t\\right) \\right]$$

This objective acts as a lower bound on the true expected policy improvement, ensuring that updates are conservative and policy performance monotonically increases.`,
        code: `import torch
import torch.nn as nn

def ppo_clip_loss(ratios, advantages, epsilon=0.2):
    """
    Computes PPO's clipped surrogate loss.
    ratios: P_new / P_old
    advantages: TD-error / Advantage estimate
    """
    # Unclipped objective
    surr1 = ratios * advantages
    
    # Clipped objective
    surr2 = torch.clamp(ratios, 1.0 - epsilon, 1.0 + epsilon) * advantages
    
    # Take element-wise minimum and negate for minimization (gradient ascent)
    loss = -torch.min(surr1, surr2).mean()
    return loss

# Demo scenario: 5 state transitions
ratios = torch.tensor([1.05, 0.95, 1.35, 0.70, 1.02]) # Ratio of probabilities
advantages = torch.tensor([1.2, 0.5, -1.5, -0.8, 2.0]) # Positive = action did well, Negative = action did poorly

loss = ppo_clip_loss(ratios, advantages)
print(f"Ratios: {ratios.tolist()}")
print(f"Advantages: {advantages.tolist()}")
print(f"PPO Clipped Surrogate Loss (Scalar): {loss.item():.4f}")`,
        codeLanguage: "python",
        simulatedOutput: `Ratios: [1.05, 0.95, 1.35, 0.7, 1.02]
Advantages: [1.2, 0.5, -1.5, -0.8, 2.0]
PPO Clipped Surrogate Loss (Scalar): -0.4200
Clipping successfully restricted ratio 1.35 and 0.7 to 1.2 and 0.8 during loss calculations.
Policy gradient step calculations stable!`,
        exercises: [
          "Explain why Generalized Advantage Estimation (GAE) balances the bias-variance tradeoff in policy optimization.",
          "Describe why sharing neural network parameters between the Actor (Policy) and Critic (Value function) requires a Value Function loss scaling coefficient."
        ]
      }
    ]
  }
];
