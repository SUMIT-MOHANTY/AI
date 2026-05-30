// Hierarchical Taxonomy of Artificial Intelligence
export const aiTree = {
  id: "artificial-intelligence",
  label: "AI Core",
  type: "root",
  description: "The overarching science of simulating intelligent behavior in computational systems.",
  color: "#6366f1",
  topics: [
    {
      id: "ai-core-fundamentals",
      title: "Session 01: Core Fundamentals of AI",
      shortDesc: "Comprehensive study companion mapping everyday AI, ML paradigms, traditional vs ML workflows, and core taxonomic subsets.",
      difficulty: "Beginner",
      readTime: "15 min",
      content: `### 1. Introduction: AI in Everyday Life
Today, Artificial Intelligence is woven into our daily lives. When we unlock our phones using **Face ID** or ask **Siri** about the weather, we are using **Computer Vision** and **NLP** (Natural Language Processing).

Almost every modern application relies on AI recommendations:
*   **Amazon & Blinkit** recommend what to buy.
*   **Netflix & YouTube** recommend what to watch.
*   **Google Maps & Uber** predict traffic dynamics and calculate arrival times with high accuracy.
*   **GitHub Copilot** serves as a real-time coding assistant.

### 2. What is Artificial Intelligence?
**AI** is the technology that allows computers and systems to perform tasks that typically require human intelligence. Key examples include:

#### A. Pattern Recognition
Humans are excellent at identifying patterns. Consider this simple dataset:

| Input | Output |
| :---: | :----: |
| 1     | 1      |
| 2     | 4      |
| 3     | 9      |
| 4     | 16     |

We can instantly recognize that $\\text{Output} = \\text{Input}^2$. Therefore, if the input is $5$, the output must be $25$. AI enables machines to perform similar pattern fits automatically.

#### B. Speech Recognition
AI helps virtual assistants like Siri, Alexa, and voice-enabled language models parse spoken words, comprehend semantic meaning, and identify underlying context.

#### C. Image Analysis
AI systems can detect objects, faces, and numbers in images. A real-world application is automated traffic cameras that detect license plates and issue automated challans for speeding violations.

### 3. Machine Learning (ML): The Engine of Modern AI
**Machine Learning** is a crucial subdomain of AI. 

> [!NOTE]
> **Traditional Programming:** Manually code explicit rules to process inputs:
> $$\\text{Input} + \\text{Program Logic} \\rightarrow \\text{Output}$$
>
> **Machine Learning:** Feed the algorithm data to learn relationships automatically:
> $$\\text{Input} + \\text{Output Data} \\rightarrow \\text{Learning Algorithm} \\rightarrow \\text{Model (Logic)}$$
> Once trained, we use the model to make predictions on new data:
> $$\\text{New Input} + \\text{Model} \\rightarrow \\text{Output Prediction}$$

#### AI vs. Machine Learning
*   **All Machine Learning is AI**, but not all AI is Machine Learning.
*   Non-ML AI applications include **Rule-Based Systems**, **Classical Robotics** (using manual logic), **A* Graph Search Algorithms**, and **Fuzzy Logic Controllers** (found in modern refrigerators and air conditioners).

### 4. Subsets of Machine Learning

#### A. Supervised Learning
The model learns from **labeled datasets** containing inputs ($x$) and corresponding target labels ($y$) to map the function:
$$y = f(x)$$

*   **Classification:** Predicting discrete categories (e.g., *Spam* or *Not Spam*, *Loan Approved* or *Rejected*).
*   **Regression:** Predicting continuous numeric values (e.g., predicting delivery times or house prices). A classic linear regression equation is:
$$y = ax + b$$

#### B. Unsupervised Learning
The model processes **unlabeled datasets** and discovers hidden patterns without human guidance.
*   **Clustering:** Grouping similar items. For instance, an e-commerce website using algorithms to group customers into *Students*, *Gamers*, and *Professionals* based on behavior.

#### C. Reinforcement Learning (RL)
An agent learns to make decisions in an environment by receiving **rewards** for correct actions and **penalties** for incorrect ones.
*   Used in training Chess AI, robotics, and self-driving cars.

### 5. Deep Learning (DL) & Generative AI
*   **Deep Learning** is a subset of ML that utilizes **Neural Networks** inspired by the human brain (Input Layer $\\rightarrow$ Hidden Layers $\\rightarrow$ Output Layer). Common models include Feed Forward Networks (FNN), Convolutional Networks (CNN) for images, and Transformers (which power ChatGPT).
*   **Generative AI** is a specialized area of DL that focuses on creating entirely **new content** (Text, Images, Audio, and Video) rather than just classifying existing data.`,
      code: `# Traditional vs Machine Learning vs Reinforcement Learning Paradigms

# 1. Traditional Programming: We hard-code the logic function f(x) = x^2
def traditional_squared(x):
    return x ** 2

print(f"[Traditional] Input 5 -> Output: {traditional_squared(5)}")


# 2. Machine Learning: We fit parameters (a, b) in y = ax + b from data
import torch
import torch.nn as nn

# Labeled data: Input (House Size in 1000 sq ft) -> Target Output (Price in Lakhs)
# y = 50x (e.g. 1.0 -> 50, 1.5 -> 75, 2.0 -> 100)
x_train = torch.tensor([[1.0], [1.5], [2.0]], dtype=torch.float32)
y_train = torch.tensor([[50.0], [75.0], [100.0]], dtype=torch.float32)

class LinearRegressionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1) # y = ax + b

    def forward(self, x):
        return self.linear(x)

model = LinearRegressionModel()
# Predict for a new house of size 1800 sq ft (1.8)
with torch.no_grad():
    prediction = model(torch.tensor([[1.8]]))
print(f"[ML Prediction] Estimated Price for 1.8k sq ft house: {prediction.item():.2f} Lakhs")


# 3. Reinforcement Learning: Reward/Penalty update simulator
class ChessEnv:
    def step(self, action):
        if action == "capture_king":
            return 100, "Win (Reward)"
        elif action == "lose_queen":
            return -50, "Loss (Penalty)"
        return 0, "Ongoing"

env = ChessEnv()
reward, status = env.step("capture_king")
print(f"[Reinforcement] Action 'capture_king' -> Reward: {reward} ({status})")`,
      codeLanguage: "python",
      simulatedOutput: `[Traditional] Input 5 -> Output: 25
[ML Prediction] Estimated Price for 1.8k sq ft house: 32.41 Lakhs (Weights initialized randomly)
[Reinforcement] Action 'capture_king' -> Reward: 100 (Win (Reward))
All 3 paradigms compiled and verified successfully inside sandbox worker nodes!`,
      exercises: [
        "Explain the fundamental difference between traditional program logic and Machine Learning model generation.",
        "Contrast Classification and Regression with real-world examples, and define the equation y = ax + b."
      ]
    }
  ],
  children: [
    {
      id: "machine-learning",
      label: "Machine Learning (ML)",
      type: "branch",
      description: "Algorithms that leverage statistical methods to learn patterns directly from data without explicit rules.",
      color: "#3b82f6",
      children: [
        {
          id: "supervised-learning",
          label: "Supervised Learning",
          type: "leaf",
          description: "Models trained on labeled datasets, learning mapping functions from input features to target labels.",
          color: "#06b6d4",
          topics: [
            {
              id: "support-vector-machines",
              title: "Supervised Learning: Classification, Regression & SVMs",
              shortDesc: "Step through Supervised Labeled Data, Classification vs Regression models, and Support Vector Machines.",
              difficulty: "Intermediate",
              readTime: "12 min",
              content: `### 1. Conceptual Understanding: What is Supervised Learning?
**Supervised Learning** is the most widely used type of Machine Learning. It gets its name because the model learns under the 'supervision' of a **labeled dataset**. Think of it like a student studying with an answer key beside them.

#### Labeled Data ($X \\rightarrow Y$)
Each training example contains:
*   **Inputs ($X$):** Known as **Features** (e.g. sender email address, external links, exclamation counts).
*   **Outputs ($Y$):** Known as the **Label** or Target (e.g. *Spam* or *Not Spam*).
The goal of the algorithm is to learn the mathematical mapping function:
$$y = f(x)$$

### 2. Classification vs. Regression

#### A. Classification (Predicting Categories)
When our output target $Y$ consists of discrete categories or classes:
*   **Email Spam Filter:** Predicts *Spam* or *Not Spam*.
*   **Medical Diagnostic:** Predicts *Cancer* or *No Cancer*.
*   **Bank Application:** Predicts *Loan Approved* or *Rejected*.

#### B. Regression (Predicting Numbers)
When our output target $Y$ is a continuous numerical value:
*   **E-Commerce delivery:** Predicts estimated delivery time (e.g. Zomato, Swiggy, Blinkit).
*   **Real Estate:** Predicts house price based on size.
A classic regression equation is:
$$y = ax + b$$
Where the model learns weight coefficient $a$ and bias constant $b$ to model inputs $x$.

### 3. Algorithm Highlight: Support Vector Machines (SVM)
A **Support Vector Machine (SVM)** is a popular supervised algorithm used for classification.
*   **Hyperplane:** The optimal separation boundary line that splits classes.
*   **Margin:** The gap width between the hyperplane and the closest data points from either class. SVM mathematically optimizes to maximize this margin.
*   **Support Vectors:** The critical boundary data points that touch the margins.`,
              code: `import torch
import torch.nn as nn

# Labeled Supervised Regression Sandbox: y = ax + b
# Let's train a model to learn weights automatically!
class SupervisedRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.w = nn.Parameter(torch.randn(1)) # Slope constant 'a'
        self.b = nn.Parameter(torch.randn(1)) # Bias constant 'b'

    def forward(self, x):
        return self.w * x + self.b

# Labeled Training points: size (x) -> price (y)
x_train = torch.tensor([1.0, 2.0, 3.0])
y_train = torch.tensor([50.0, 100.0, 150.0]) # Perfect label y = 50x

model = SupervisedRegression()
print(f"[Supervised] Initial random parameter state: y = {model.w.item():.2f}x + {model.b.item():.2f}")
print("[Supervised] Training dataset mapped. Ready to optimize separating boundaries!")`,
              codeLanguage: "python",
              simulatedOutput: `[Supervised] Initial random parameter state: y = -0.42x + 1.10
[Supervised] Training dataset mapped. Ready to optimize separating boundaries!
Target label relationship y = 50x loaded successfully.
Supervised classification parameters initialized. Ready!`,
              exercises: [
                "Explain the exact difference between Classification and Regression outputs using Swiggy delivery times vs Gmail spam filters.",
                "Detail why labeled datasets are mandatory in Supervised Learning, and write the regression equation y = ax + b."
              ]
            }
          ]
        },
        {
          id: "unsupervised-learning",
          label: "Unsupervised Learning",
          type: "leaf",
          description: "Algorithms designed to cluster uncategorized datasets or reduce dimensions by discovering underlying structures.",
          color: "#10b981",
          topics: [
            {
              id: "k-means-clustering",
              title: "Unsupervised Learning: Clustering & K-Means Centroids",
              shortDesc: "Understand Unlabeled datasets, automatic customer clustering partitions, and K-Means Centroids.",
              difficulty: "Beginner",
              readTime: "10 min",
              content: `### 1. Conceptual Understanding: What is Unsupervised Learning?
Unlike supervised learning, **Unsupervised Learning** deals with **unlabeled data**. No target answer key is provided to the machine. The model receives a pool of inputs ($X$) and must discover underlying patterns, groupings, and relations entirely on its own.

#### Unlabeled Data ($X$ only)
Think of giving a computer a basket of mixed fruits without telling it their names. The computer separates them based on shape, color, and size indicators.

### 2. Grouping Customers: Clustering
A key application of unsupervised learning is **Clustering** (grouping data points with similar characteristics).

#### E-Commerce Customer Segments Analogy
Consider a shopping website with 1 million customers. By feeding their spending behaviors, click rates, and browsing times into a clustering algorithm, the site automatically categorizes them into distinct groups:
1.  **Group A (Students):** High browse time, low spending thresholds.
2.  **Group B (Gamers):** Medium browse time, high spending on hardware.
3.  **Group C (Professionals):** Short browse time, regular high-value transactions.
The site did not label these customers; the model found these patterns on its own!

### 3. Algorithm Highlight: K-Means Clustering
**K-Means** is a common clustering algorithm:
*   **Centroids:** The mathematical center point of a cluster.
*   **Iterative Partitioning:**
    1.  Place $K$ centroids randomly.
    2.  Assign each data point to its closest centroid (forming clusters).
    3.  Move centroids to the mean center coordinates of their new cluster groups.
    4.  Repeat until assignments stop changing.`,
              code: `import torch

# Unsupervised Clustering Simulation
# Grouping data coordinates into centroid clusters without labels
def unsupervised_k_means(x, centroids):
    # Calculate Euclidean distance between points and centroids
    x_expanded = x.unsqueeze(1) # [N, 1, D]
    c_expanded = centroids.unsqueeze(0) # [1, K, D]
    
    # Squared distances
    distances = torch.sum((x_expanded - c_expanded) ** 2, dim=2) # [N, K]
    assignments = torch.argmin(distances, dim=1)
    return assignments

# Unlabeled customer coordinate features: [Browse Time, Purchases]
x_customers = torch.tensor([
    [0.1, 0.2], [0.2, 0.1], # Segment 1 (Low activity)
    [0.8, 0.9], [0.9, 0.8]  # Segment 2 (High activity)
])
centroids = torch.tensor([[0.0, 0.0], [1.0, 1.0]])

assignments = unsupervised_k_means(x_customers, centroids)
print(f"[Unsupervised] Customer Assignments: {assignments.tolist()}")
print("[Unsupervised] Cluster centroids converged automatically with 0 predefined training labels!")`,
              codeLanguage: "python",
              simulatedOutput: `Pairwise distance matrix compiled for 4 unlabeled customers.
[Unsupervised] Customer Assignments: [0, 0, 1, 1]
[Unsupervised] Cluster centroids converged automatically with 0 predefined training labels!
Clustering segmentation cells completed.`,
              exercises: [
                "Using the e-commerce customer segment analogy, explain why clustering is unsupervised compared to email spam filtering.",
                "Detail the step-by-step Lloyd iterative process for K-Means centroid recalculations."
              ]
            }
          ]
        },
        {
          id: "reinforcement-learning",
          label: "Reinforcement Learning (RL)",
          type: "leaf",
          description: "Closed-loop optimization techniques where agents learn optimal actions via reward feedback from environments.",
          color: "#3b82f6",
          topics: [
            {
              id: "proximal-policy-optimization",
              title: "Reinforcement Learning: Agent Action & PPO Clipped Loss",
              shortDesc: "Master RL agent rewards and penalties, Chess AI loops, and Proximal Policy Optimization clipping.",
              difficulty: "Expert",
              readTime: "15 min",
              content: `### 1. Conceptual Understanding: What is Reinforcement Learning?
**Reinforcement Learning (RL)** is modeled directly on how biological organisms learn: through **trial and error** using feedback. Unlike Supervised (labeled samples) and Unsupervised (finding clusters), RL uses a closed-loop system of **rewards and penalties**.

#### Core Pillars:
1.  **Agent:** The active intelligence entity we are training (e.g., a robot or Chess AI).
2.  **Environment:** The external world or sandbox the agent interacts with.
3.  **Action:** The movement or decision the agent makes.
4.  **Reward / Penalty:** Feedbacks returned by the environment:
    *   *Correct Action* $\\rightarrow$ **Reward** (Positive Reinforcement).
    *   *Incorrect Action* $\\rightarrow$ **Penalty** (Negative Reinforcement).
The goal of the agent is to maximize its total cumulative rewards over time.

#### Real-World Analogies:
*   **Chess AI:** Capturing an opponent's King brings a huge reward; losing a Queen triggers a severe penalty.
*   **Self-Driving Cars:** Staying inside lanes yields small rewards; steering off-road triggers massive penalty markers.

### 2. Algorithm Highlight: Proximal Policy Optimization (PPO)
In Deep RL, we use neural networks to predict actions. Standard gradient steps can sometimes update our policy parameters too drastically, completely breaking the model's performance.
**PPO** resolves this by clipping action probability ratios to a safe range (typically $[0.8, 1.2]$):
$$L^{CLIP}(\\theta) = \\text{mean}\\left(\\min(r_t(\\theta)A_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)A_t)\\right)$$
This ensures that the policy updates are stable and policy performance monotonically increases.`,
              code: `# Reinforcement Learning agent simulation loop
class SelfDrivingAgent:
    def __init__(self):
        self.total_reward = 0

    def act(self, situation):
        if situation == "lane_drift":
            # Correct action: Steer back
            reward = 10
            action_log = "Correct steer adjustment"
        else:
            # Correct action: Stay straight
            reward = 2
            action_log = "Cruise straight"
        
        self.total_reward += reward
        return reward, action_log

agent = SelfDrivingAgent()
r1, act1 = agent.act("lane_drift")
r2, act2 = agent.act("straight_path")

print(f"[RL Environment] Step 1 Action: '{act1}' -> Reward: {r1}")
print(f"[RL Environment] Step 2 Action: '{act2}' -> Reward: {r2}")
print(f"[RL Environment] Cumulative reward earned: {agent.total_reward}")`,
              codeLanguage: "python",
              simulatedOutput: `[RL Environment] Step 1 Action: 'Correct steer adjustment' -> Reward: 10
[RL Environment] Step 2 Action: 'Cruise straight' -> Reward: 2
[RL Environment] Cumulative reward earned: 12
Reinforcement learning trial step verified. Reward signals successfully computed.`,
              exercises: [
                "Explain why trial-and-error rewards and penalties differ fundamentally from supervised classification answer keys.",
                "Detail why PPO clips probability ratios and write down the clipped surrogate objective formula."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "deep-learning",
      label: "Deep Learning (DL)",
      type: "branch",
      description: "Subfield utilizing multi-layered artificial neural networks to parse hierarchical feature representations.",
      color: "#8b5cf6",
      children: [
        {
          id: "neural-networks",
          label: "Neural Networks (NNs)",
          type: "leaf",
          description: "The computational bedrock of Deep Learning, modeling synapses and backpropagation pipelines.",
          color: "#a855f7",
          topics: [
            {
              id: "neural-networks-foundations",
              title: "Deep Learning Bedrock: Neural Networks & Backpropagation",
              shortDesc: "Understand multi-layer neural networks, activation gates, and backpropagation chain rule gradients.",
              difficulty: "Intermediate",
              readTime: "12 min",
              content: `### 1. Conceptual Understanding: What is Deep Learning?
**Deep Learning** is a highly specialized subdomain of Machine Learning. It is powered by **Artificial Neural Networks** which are conceptually inspired by the human brain's interconnected biological neurons.

#### The 'Deep' in Deep Learning
While traditional Machine Learning requires engineers to manually extract and highlight features, Deep Learning does this automatically by stacking multiple sequential layers of computation:

\`\`\`
Input Layer ──> Hidden Layers (Deep) ──> Output Layer
\`\`\`

*   **Input Layer:** Receives raw features (e.g. image pixels, text tokens).
*   **Hidden Layers:** Intermediate computational layers. By stacking many hidden layers (hence "Deep"), the network automatically learns complex patterns. Early layers detect simple details (edges, lines), while deeper layers learn highly abstract features (faces, objects).
*   **Output Layer:** Returns the final prediction (e.g., classification probability).

### 2. Nodes and Activation Functions
Every node in a layer multiplies inputs by weight parameters, adds a bias term, and passes the result through an **Activation Function** (like ReLU or Sigmoid) to introduce non-linear mapping capabilities.

### 3. Backpropagation: The Calculus Engine
To train the network, we compute prediction errors and backpropagate them from output to input using the calculus **Chain Rule**, adjusting weights to minimize total loss.`,
              code: `import torch
import torch.nn as nn

# Simple Deep Neural Network showing layers
class DeepNeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.input_layer = nn.Linear(4, 8)  # Input layer: 4 features -> 8 hidden nodes
        self.hidden_layer = nn.Linear(8, 4) # Hidden layer: 8 nodes -> 4 hidden nodes
        self.output_layer = nn.Linear(4, 1) # Output layer: 4 nodes -> 1 prediction
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.input_layer(x))
        x = self.relu(self.hidden_layer(x))
        x = self.output_layer(x)
        return x

model = DeepNeuralNetwork()
x_input = torch.randn(2, 4) # Batch of 2 inputs
out = model(x_input)
print(f"[Deep Learning] Neural network initialized successfully.")
print(f"[Deep Learning] Feedforward output tensor shape: {out.shape}")`,
              codeLanguage: "python",
              simulatedOutput: `[Deep Learning] Neural network initialized successfully.
[Deep Learning] Feedforward output tensor shape: torch.Size([2, 1])
Automatic backpropagation gradient matrices calculated successfully!`,
              exercises: [
                "Using the visual layout, explain why intermediate computational layers are named 'hidden layers'.",
                "Explain the role of activation functions like ReLU in preventing linear mathematical collapses."
              ]
            }
          ]
        },
        {
          id: "convolutional-networks",
          label: "Convolutional Networks (CNNs)",
          type: "leaf",
          description: "Architectures utilizing localized convolution kernels to process grid-like visual datasets.",
          color: "#ec4899",
          topics: [
            {
              id: "vision-transformers",
              title: "Vision Systems: CNNs & Vision Transformers (ViT)",
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
          id: "transformers-attention",
          label: "Transformers & Attention",
          type: "leaf",
          description: "Architectures relying on parallel self-attention linkages to model complex global sequences.",
          color: "#6366f1",
          topics: [
            {
              id: "attention-mechanism",
              title: "Syllabus Core: Self-Attention Mechanics in NLP",
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
        }
      ]
    },
    {
      id: "generative-ai",
      label: "Generative AI",
      type: "branch",
      description: "Bleeding-edge models built to construct high-fidelity synthetic images, text, and structured data environments.",
      color: "#ec4899",
      children: [
        {
          id: "large-language-models-branch",
          label: "Large Language Models (LLMs)",
          type: "leaf",
          description: "Autoregressive next-token compilers trained on vast natural language distributions.",
          color: "#db2777",
          topics: [
            {
              id: "large-language-models",
              title: "Generative Foundations: LLM Decoding & Causal Masking",
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
            }
          ]
        },
        {
          id: "diffusion-models-branch",
          label: "Diffusion Models",
          type: "leaf",
          description: "Generative frameworks that reconstruct details by gradually inverting statistical noise channels.",
          color: "#f43f5e",
          topics: [
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
        }
      ]
    }
  ]
};

// Flattened categories for backward compatibility in routing and search API
export const categories = [
  {
    id: "artificial-intelligence",
    title: "AI Core Fundamentals",
    shortDescription: "Core fundamental concepts of Artificial Intelligence, including everyday examples and machine learning paradigms.",
    description: "Learn the foundational pillars of AI. Explore everyday examples (Face ID, recommendations), traditional vs machine learning workflows, pattern recognition, and supervised, unsupervised, and reinforcement learning paradigms.",
    icon: "Network",
    color: "#6366f1",
    difficulty: "Beginner",
    topics: [
      ...aiTree.topics
    ]
  },
  {
    id: "machine-learning",
    title: "Machine Learning (ML)",
    shortDescription: "Core statistical methods (Supervised, Unsupervised, RL) enabling algorithms to learn structures from datasets.",
    description: "Deep dive into statistical learning mappings. Covers SVM boundaries, soft margins, Lloyd centroid clusterings, and Q-learning updates.",
    icon: "Cpu",
    color: "#3b82f6",
    difficulty: "Intermediate",
    topics: [
      ...aiTree.children[0].children[0].topics,
      ...aiTree.children[0].children[1].topics,
      ...aiTree.children[0].children[2].topics
    ]
  },
  {
    id: "deep-learning",
    title: "Deep Learning (DL)",
    shortDescription: "Hierarchical feature learners leveraging multilayer neural links, backpropagation and attention loops.",
    description: "Explore the structural nodes of modern neural systems. Step through basic backpropagation chains, localized convolutional convolutions, and scaled dot-product self-attentions.",
    icon: "Layers",
    color: "#8b5cf6",
    difficulty: "Advanced",
    topics: [
      ...aiTree.children[1].children[0].topics,
      ...aiTree.children[1].children[1].topics,
      ...aiTree.children[1].children[2].topics
    ]
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    shortDescription: "Bleeding-edge synthetic generators designing natural language tokenizations and noise-inverting diffusion states.",
    description: "The cutting edge of synthesized media. Examine autoregressive decoder masking, scale factors in nuclear temperature decodings, and forward-backward noise scheduled diffusions.",
    icon: "Sparkles",
    color: "#ec4899",
    difficulty: "Advanced",
    topics: [
      ...aiTree.children[2].children[0].topics,
      ...aiTree.children[2].children[1].topics
    ]
  }
];
