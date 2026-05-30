import React, { useState } from "react";
import Hero from "../components/Hero";
import { aiTree, categories } from "../data/categories";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Eye, Cpu, Layers, Network, HelpCircle, ArrowRight, Zap, Info, Play } from "lucide-react";

export default function Home({ onSearchClick }) {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("machine-learning");
  const [selectedLeaf, setSelectedLeaf] = useState("supervised-learning");

  // Find the active branch in our AI hierarchy database
  const activeBranch = selectedBranch === "artificial-intelligence"
    ? {
        id: "artificial-intelligence",
        label: "AI Core",
        type: "root",
        description: aiTree.description,
        color: "#6366f1",
        children: [
          {
            id: "ai-core-fundamentals",
            label: "Core Fundamentals",
            topics: aiTree.topics
          }
        ]
      }
    : aiTree.children.find((b) => b.id === selectedBranch);

  // Find the active leaf node inside the selected branch
  const activeLeaf = activeBranch?.children.find((l) => l.id === selectedLeaf) || activeBranch?.children[0];

  const getIcon = (id) => {
    switch (id) {
      case "machine-learning": return <Cpu size={20} />;
      case "deep-learning": return <Layers size={20} />;
      case "generative-ai": return <Sparkles size={20} />;
      default: return <Network size={20} />;
    }
  };

  return (
    <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
      {/* Landing Hero Area */}
      <Hero navigate={navigate} onSearchClick={onSearchClick} />

      {/* Futuristic Taxonomic Tree Explorer section */}
      <section
        id="explore-modules"
        style={{
          padding: "5rem 0 7rem 0",
          backgroundColor: "rgba(10, 11, 16, 0.4)",
          borderTop: "1px solid var(--border-light)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Glow ambient background elements */}
        <div
          className="glow-blob glow-animation"
          style={{
            width: "300px",
            height: "300px",
            top: "10%",
            right: "5%",
            background: "rgba(6, 182, 212, 0.08)",
            filter: "blur(110px)",
          }}
        />

        <div className="container">
          {/* Header Title Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "4rem",
              textAlign: "center",
              alignItems: "center",
            }}
            className="animate-slide-up"
          >
            <div
              className="badge"
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                color: "var(--primary)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                padding: "0.3rem 0.8rem",
              }}
            >
              Interactive Taxonomy Map
            </div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#ffffff" }}>
              Explore the Artificial Intelligence Tree
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", fontSize: "0.95rem" }}>
              Click on major branches and leaf categories to expand their theoretical frameworks, training dynamics, and deep syllabus codebases.
            </p>
          </div>

          {/* Interactive Tree Map Layout Split */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "3rem",
              alignItems: "stretch",
            }}
            className="tree-layout-grid"
          >
            {/* Left Box: SVG Connected Interactive Node Tree */}
            <div
              className="glass-panel"
              style={{
                padding: "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2.5rem",
                justifyContent: "center",
                border: "1px solid var(--border-light)",
                position: "relative",
                background: "rgba(10, 11, 16, 0.7)",
              }}
            >
              {/* Connector lines SVG behind nodes */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <defs>
                  <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Connector line from Root to branches */}
                <path d="M 325, 60 L 150, 150 M 325, 60 L 325, 150 M 325, 60 L 500, 150" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" className="tree-svg-path" />
              </svg>

              {/* LEVEL 1: Root Node */}
              <div
                style={{
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => {
                    setSelectedBranch("artificial-intelligence");
                    setSelectedLeaf("ai-core-fundamentals");
                  }}
                  className="glass-panel"
                  style={{
                    padding: "0.75rem 2rem",
                    cursor: "pointer",
                    border: selectedBranch === "artificial-intelligence"
                      ? "2px solid #6366f1"
                      : "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "12px",
                    fontWeight: "800",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    color: "#ffffff",
                    letterSpacing: "0.03em",
                    boxShadow: selectedBranch === "artificial-intelligence"
                      ? "0 0 25px rgba(99, 102, 241, 0.4)"
                      : "0 0 15px rgba(99, 102, 241, 0.15)",
                    background: selectedBranch === "artificial-intelligence"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "rgba(18, 20, 29, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedBranch !== "artificial-intelligence") {
                      e.currentTarget.style.borderColor = "#6366f1";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedBranch !== "artificial-intelligence") {
                      e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.15)";
                    }
                  }}
                >
                  <Network size={16} color="#6366f1" />
                  ARTIFICIAL INTELLIGENCE
                </button>
              </div>

              {/* LEVEL 2: Main Branches Nodes */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  gap: "1rem",
                  zIndex: 1,
                  flexWrap: "wrap",
                }}
              >
                {aiTree.children.map((branch) => {
                  const isActive = selectedBranch === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranch(branch.id);
                        setSelectedLeaf(branch.children[0].id); // Select first leaf by default
                      }}
                      className="glass-panel"
                      style={{
                        padding: "0.75rem 1.25rem",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        borderRadius: "10px",
                        border: isActive ? `2px solid ${branch.color}` : "1px solid var(--border-light)",
                        color: isActive ? "#ffffff" : "var(--text-muted)",
                        background: isActive ? `${branch.color}18` : "rgba(15, 17, 26, 0.8)",
                        boxShadow: isActive ? `0 0 20px ${branch.color}18` : "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = branch.color;
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = "var(--border-light)";
                      }}
                    >
                      {getIcon(branch.id)}
                      {branch.label}
                    </button>
                  );
                })}
              </div>

              {/* LEVEL 3: Leaf Nodes (Expands based on active level 2 branch selection) */}
              <div
                className="animate-slide-up"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.25rem",
                  width: "100%",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.08)",
                  paddingTop: "2rem",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    color: "var(--text-dark)",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Sub-Branches of {activeBranch?.label}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {activeBranch?.children.map((leaf) => {
                    const isActiveLeaf = selectedLeaf === leaf.id;
                    return (
                      <button
                        key={leaf.id}
                        onClick={() => setSelectedLeaf(leaf.id)}
                        className="glass-panel"
                        style={{
                          padding: "0.65rem 1.25rem",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.85rem",
                          borderRadius: "8px",
                          border: isActiveLeaf ? `2px solid ${activeBranch.color}` : "1px solid var(--border-light)",
                          color: isActiveLeaf ? "#ffffff" : "var(--text-muted)",
                          background: isActiveLeaf ? `${activeBranch.color}10` : "rgba(22, 25, 38, 0.4)",
                          transition: "var(--transition-smooth)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <Zap size={12} color={isActiveLeaf ? activeBranch.color : "var(--text-dark)"} />
                        {leaf.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Box: Detailed explanation card for active node */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
              className="animate-slide-up"
            >
              {activeLeaf && (
                <div
                  className="glass-panel"
                  style={{
                    padding: "2.5rem",
                    border: `1px solid ${activeBranch?.color}25`,
                    boxShadow: `0 15px 30px -10px ${activeBranch?.color}15`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    background: "linear-gradient(180deg, rgba(15,17,26,0.9) 0%, rgba(9,10,15,0.95) 100%)",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Header info */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: `${activeBranch?.color}15`,
                          color: activeBranch?.color,
                          border: `1px solid ${activeBranch?.color}35`,
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.6rem",
                        }}
                      >
                        {activeBranch?.label}
                      </span>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-light)",
                          fontSize: "0.7rem",
                        }}
                      >
                        {activeLeaf.topics[0]?.difficulty || "Intermediate"} Level
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff" }}>
                      {activeLeaf.label}
                    </h3>

                    {/* Description */}
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      {activeLeaf.description}
                    </p>

                    {/* Syllabus lessons catalog list */}
                    <div
                      style={{
                        borderTop: "1px solid var(--border-light)",
                        paddingTop: "1.5rem",
                        marginTop: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-dark)",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Syllabus Lessons
                      </span>

                      {activeLeaf.topics.map((topic) => (
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
                            background: "rgba(255, 255, 255, 0.01)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = activeBranch?.color;
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
                          <ArrowRight size={14} color={activeBranch?.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer link to jump to module dashboard */}
                  <button
                    onClick={() => navigate(`/category/${selectedBranch}`)}
                    className="btn btn-secondary"
                    style={{
                      justifyContent: "center",
                      gap: "0.5rem",
                      width: "100%",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Info size={14} />
                    View Module Hub Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CSS overrides for responsive tree split grid */}
      <style>{`
        .tree-svg-path {
          stroke-dasharray: 6;
          animation: flowDash 20s linear infinite;
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -200; }
        }
        @media (max-width: 900px) {
          .tree-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
