import React, { useState } from "react";
import { aiTree } from "../data/categories";
import { useNavigate } from "react-router-dom";
import { Network, Cpu, Layers, Sparkles, Zap, BookOpen, ArrowRight, Info, HelpCircle } from "lucide-react";

export default function Systems() {
  const navigate = useNavigate();

  // Track selected node for detailed specs card on the right
  const [selectedNode, setSelectedNode] = useState({
    id: "artificial-intelligence",
    label: "Artificial Intelligence",
    type: "root",
    description: "The overarching science of simulating intelligent behavior in computational systems.",
    color: "#6366f1",
    branchColor: "#6366f1",
    topics: aiTree.topics
  });

  // Mathematically defined coordinates for parent-child node graph
  const nodes = [
    // Level 1: Root
    { id: "artificial-intelligence", label: "AI Core", type: "root", x: 400, y: 50, color: "#6366f1", icon: <Network size={20} />, ref: aiTree },
    
    // Level 2: Branches
    { id: "machine-learning", label: "Machine Learning", type: "branch", x: 160, y: 180, color: "#3b82f6", icon: <Cpu size={18} />, ref: aiTree.children[0] },
    { id: "deep-learning", label: "Deep Learning", type: "branch", x: 400, y: 180, color: "#8b5cf6", icon: <Layers size={18} />, ref: aiTree.children[1] },
    { id: "generative-ai", label: "Generative AI", type: "branch", x: 640, y: 180, color: "#ec4899", icon: <Sparkles size={18} />, ref: aiTree.children[2] },
    
    // Level 3: Leaves (Machine Learning)
    { id: "supervised-learning", label: "Supervised", type: "leaf", x: 60, y: 320, color: "#3b82f6", icon: <Zap size={14} />, ref: aiTree.children[0].children[0] },
    { id: "unsupervised-learning", label: "Unsupervised", type: "leaf", x: 160, y: 320, color: "#3b82f6", icon: <Zap size={14} />, ref: aiTree.children[0].children[1] },
    { id: "reinforcement-learning", label: "Reinforcement", type: "leaf", x: 260, y: 320, color: "#3b82f6", icon: <Zap size={14} />, ref: aiTree.children[0].children[2] },
    
    // Level 3: Leaves (Deep Learning)
    { id: "neural-networks", label: "Neural Net", type: "leaf", x: 320, y: 320, color: "#8b5cf6", icon: <Zap size={14} />, ref: aiTree.children[1].children[0] },
    { id: "convolutional-networks", label: "CNNs", type: "leaf", x: 400, y: 320, color: "#8b5cf6", icon: <Zap size={14} />, ref: aiTree.children[1].children[1] },
    { id: "transformers-attention", label: "Transformers", type: "leaf", x: 480, y: 320, color: "#8b5cf6", icon: <Zap size={14} />, ref: aiTree.children[1].children[2] },
    
    // Level 3: Leaves (Generative AI)
    { id: "large-language-models-branch", label: "LLMs", type: "leaf", x: 590, y: 320, color: "#ec4899", icon: <Zap size={14} />, ref: aiTree.children[2].children[0] },
    { id: "diffusion-models-branch", label: "Diffusion", type: "leaf", x: 690, y: 320, color: "#ec4899", icon: <Zap size={14} />, ref: aiTree.children[2].children[1] }
  ];

  // Defined links connecting parent-child coordinates
  const links = [
    { from: "artificial-intelligence", to: "machine-learning", color: "#3b82f6" },
    { from: "artificial-intelligence", to: "deep-learning", color: "#8b5cf6" },
    { from: "artificial-intelligence", to: "generative-ai", color: "#ec4899" },
    
    { from: "machine-learning", to: "supervised-learning", color: "#3b82f6" },
    { from: "machine-learning", to: "unsupervised-learning", color: "#3b82f6" },
    { from: "machine-learning", to: "reinforcement-learning", color: "#3b82f6" },
    
    { from: "deep-learning", to: "neural-networks", color: "#8b5cf6" },
    { from: "deep-learning", to: "convolutional-networks", color: "#8b5cf6" },
    { from: "deep-learning", to: "transformers-attention", color: "#8b5cf6" },
    
    { from: "generative-ai", to: "large-language-models-branch", color: "#ec4899" },
    { from: "generative-ai", to: "diffusion-models-branch", color: "#ec4899" }
  ];

  const handleSelectNode = (node) => {
    setSelectedNode({
      id: node.id,
      label: node.ref.label || node.ref.title,
      type: node.type,
      description: node.ref.description,
      color: node.color,
      branchColor: node.color,
      topics: node.ref.topics
    });
  };

  const renderMathBlock = (content) => {
    if (!content) return null;
    const formulas = [];
    const regex = /\$\$(.*?)\$\$/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      formulas.push(match[1]);
    }
    
    if (formulas.length === 0) return null;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-dark)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Core Equation
        </span>
        {formulas.slice(0, 1).map((f, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              padding: "1rem",
              fontFamily: "monospace",
              fontSize: "0.95rem",
              backgroundColor: "rgba(22, 25, 38, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.04)",
              color: "var(--accent)",
              textAlign: "center",
              overflowX: "auto"
            }}
          >
            {f}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ padding: "3rem 0 6rem 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        
        {/* Header Summary */}
        <div style={{ textAlign: "left", marginBottom: "3rem" }}>
          <div
            className="badge"
            style={{
              background: "rgba(99, 102, 241, 0.08)",
              color: "var(--primary)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              padding: "0.25rem 0.75rem",
              marginBottom: "0.75rem"
            }}
          >
            System Taxonomy Diagram
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", lineHeight: "1.2" }}>
            Visual Taxonomy Node Graph
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            A true visual hierarchical relation layout mapping AI, Machine Learning, Deep Learning, and Generative pipelines. Click on any circular node to view its specifications and lessons syllabus.
          </p>
        </div>

        {/* Double-Column Node Map Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "3rem",
            alignItems: "stretch"
          }}
          className="node-map-split"
        >
          {/* Left Column: True Node-Link Diagram Canvas */}
          <div
            className="glass-panel"
            style={{
              border: "1px solid var(--border-light)",
              backgroundColor: "rgba(10, 11, 16, 0.7)",
              position: "relative",
              overflowX: "auto",
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              minHeight: "450px"
            }}
          >
            {/* Scroll viewport for smaller screens */}
            <div style={{ position: "relative", width: "760px", height: "400px", flexShrink: 0 }}>
              
              {/* SVG connection lines overlay */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                  pointerEvents: "none"
                }}
              >
                <defs>
                  <filter id="glow-lines" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Draw diagonal parent-child lines */}
                {links.map((link, idx) => {
                  const fromNode = nodes.find(n => n.id === link.from);
                  const toNode = nodes.find(n => n.id === link.to);
                  if (!fromNode || !toNode) return null;

                  const isPathSelected = selectedNode.id === toNode.id || selectedNode.id === fromNode.id;
                  
                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={link.color}
                      strokeWidth={isPathSelected ? 3 : 1.5}
                      strokeOpacity={isPathSelected ? 0.9 : 0.25}
                      filter={isPathSelected ? "url(#glow-lines)" : "none"}
                      style={{ transition: "all 0.3s ease" }}
                      className={isPathSelected ? "glowing-path-active" : ""}
                    />
                  );
                })}
              </svg>

              {/* Render circular interactive node points */}
              {nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                
                // Root node size, branch node size, leaf node size
                const size = node.type === "root" ? 64 : node.type === "branch" ? 54 : 44;
                
                return (
                  <div
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    style={{
                      position: "absolute",
                      left: node.x - size / 2,
                      top: node.y - size / 2,
                      width: size,
                      height: size,
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      backgroundColor: "rgba(15, 17, 26, 0.9)",
                      border: isSelected ? `3px solid ${node.color}` : "2px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: isSelected ? `0 0 25px ${node.color}45` : "none",
                      color: isSelected ? "#ffffff" : "var(--text-muted)",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    }}
                    title={node.label}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = node.color;
                        e.currentTarget.style.boxShadow = `0 0 15px ${node.color}25`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {node.icon}
                    
                    {/* Node Text Label displayed below it */}
                    <span
                      style={{
                        position: "absolute",
                        top: size + 6,
                        fontFamily: "var(--font-heading)",
                        fontSize: node.type === "root" ? "0.75rem" : "0.7rem",
                        fontWeight: isSelected ? "700" : "500",
                        whiteSpace: "nowrap",
                        color: isSelected ? "#ffffff" : "var(--text-muted)",
                        background: "rgba(8, 9, 13, 0.65)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "4px",
                        border: "1px solid rgba(255,255,255,0.02)",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {node.label}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right Column: Dynamic node preview specifications card */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="glass-panel"
              style={{
                padding: "2.5rem",
                border: `1px solid ${selectedNode.color || "var(--border-light)"}25`,
                boxShadow: `0 20px 40px -15px ${selectedNode.color || "rgba(0,0,0,0)"}12`,
                background: "linear-gradient(180deg, rgba(15,17,26,0.9) 0%, rgba(9,10,15,0.95) 100%)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                position: "sticky",
                top: "120px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${selectedNode.color}15`,
                    color: selectedNode.color,
                    border: `1px solid ${selectedNode.color}35`,
                    fontSize: "0.7rem",
                    padding: "0.25rem 0.6rem"
                  }}
                >
                  {selectedNode.type ? selectedNode.type.toUpperCase() : "TAXONOMY ELEMENT"}
                </span>

                {selectedNode.topics && (
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.7rem"
                    }}
                  >
                    {selectedNode.topics.length} Syllabus Modules
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff" }}>
                {selectedNode.label}
              </h2>

              {/* Description */}
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedNode.description}
              </p>

              {/* Topics links displayed for leaf categories */}
              {selectedNode.topics && selectedNode.topics.length > 0 && (
                <div
                  style={{
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: "1.5rem",
                    marginTop: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-dark)",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    Syllabus Topics
                  </span>

                  {selectedNode.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => navigate(`/topic/${topic.id}`)}
                      className="glass-panel"
                      style={{
                        padding: "1rem 1.25rem",
                        cursor: "pointer",
                        transition: "var(--transition-smooth)",
                        border: "1px solid var(--border-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        background: "rgba(255, 255, 255, 0.01)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = selectedNode.color;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-light)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#ffffff" }}>
                          {topic.title}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {topic.readTime} read time
                        </span>
                      </div>
                      <ArrowRight size={14} color={selectedNode.color} />
                    </div>
                  ))}

                  {/* Math preview of first syllabus topic formula if exists */}
                  {selectedNode.topics[0]?.content && renderMathBlock(selectedNode.topics[0].content)}

                </div>
              )}

              {/* Navigation button to jump to full branch dashboard */}
              {selectedNode.type === "branch" && (
                <button
                  onClick={() => navigate(`/category/${selectedNode.id}`)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "100%",
                    marginTop: "1rem"
                  }}
                >
                  <Info size={14} /> View Module Dashboard
                </button>
              )}

              {/* Root default instruction card */}
              {selectedNode.id === "artificial-intelligence" && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "8px",
                    padding: "1rem",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: "1.5"
                  }}
                >
                  💡 <strong>Taxonomy Map Tip:</strong> Hover and click on any parent/child circle node in the visualizer graph to slide open its deep syllabus modules and view core formula equations!
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

      <style>{`
        .glowing-path-active {
          stroke-dasharray: 4;
          animation: pathPulse 1.5s infinite linear;
        }
        @keyframes pathPulse {
          to { stroke-dashoffset: -20; }
        }
        @media (max-width: 900px) {
          .node-map-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
