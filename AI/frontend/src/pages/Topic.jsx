import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { ChevronLeft, ChevronRight, Play, Terminal, BookOpen, Check, Award, Cpu } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function Topic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("code"); // "code" or "output"
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState("");
  const [completedExercises, setCompletedExercises] = useState({});

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getTopicById(id);
        setTopic(data);
        setActiveTab("code");
        setExecutionResult("");
      } catch (err) {
        console.error(err);
        setError("Topic index or math structures not found in this node.");
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  if (loading) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(255,255,255,0.05)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span>Re-compiling neural markdown compiler...</span>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h3>Error: {error || "Topic index missing."}</h3>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Return to Module
        </button>
      </div>
    );
  }

  const handleExecute = () => {
    setExecuting(true);
    setActiveTab("output");
    setExecutionResult("Initializing PyTorch sandbox container inside client web worker...");
    
    setTimeout(() => {
      setExecutionResult((prev) => prev + "\nAllocating memory nodes (Cuda 12.1 virtual device)...");
      
      setTimeout(() => {
        setExecuting(false);
        setExecutionResult(topic.simulatedOutput);
      }, 1000);
    }, 600);
  };

  const handleToggleExercise = (index) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Convert markdown-style content to styled HTML elements safely
  const renderContent = (content) => {
    if (!content) return null;
    
    return content.split("\n\n").map((block, idx) => {
      // Header 3
      if (block.startsWith("### ")) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: "1.35rem",
              fontWeight: "700",
              marginTop: "2rem",
              marginBottom: "1rem",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              borderLeft: `4px solid ${topic.categoryColor || "var(--primary)"}`,
              paddingLeft: "0.75rem",
            }}
          >
            {block.replace("### ", "")}
          </h3>
        );
      }
      
      // Header 4
      if (block.startsWith("#### ")) {
        return (
          <h4
            key={idx}
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              color: "var(--text-main)",
            }}
          >
            {block.replace("#### ", "")}
          </h4>
        );
      }

      // Math Formulas (Double dollar block)
      if (block.startsWith("$$") && block.endsWith("$$")) {
        const formula = block.replaceAll("$$", "").trim();
        return (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: "1.25rem",
              margin: "1.5rem 0",
              textAlign: "center",
              overflowX: "auto",
              fontFamily: "monospace",
              fontSize: "1.05rem",
              backgroundColor: "rgba(22, 25, 38, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.04)",
              color: "var(--accent)",
            }}
          >
            {formula}
          </div>
        );
      }

      // Bullet Lists
      if (block.startsWith("* ") || block.startsWith("- ")) {
        return (
          <ul
            key={idx}
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "1.25rem",
              color: "var(--text-muted)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {block.split("\n").map((li, lidx) => (
              <li key={lidx} style={{ fontSize: "0.95rem" }}>
                {li.replace(/^(\*\s|-\s)/, "")}
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraphs
      return (
        <p
          key={idx}
          style={{
            fontSize: "0.98rem",
            color: "var(--text-muted)",
            lineHeight: "1.7",
            marginBottom: "1.25rem",
          }}
          dangerouslySetInnerHTML={{
            __html: block
              // Bold text: **text**
              .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>')
              // Inline math / Code blocks: $math$ or `code`
              .replace(/\$(.*?)\$/g, '<code style="background-color: rgba(255,255,255,0.06); padding: 0.1rem 0.3rem; border-radius: 4px; color: var(--accent);">$1</code>')
              .replace(/`(.*?)`/g, '<code style="background-color: rgba(255,255,255,0.06); padding: 0.1rem 0.3rem; border-radius: 4px; color: var(--secondary);">$1</code>'),
          }}
        />
      );
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: "2rem 0 5rem 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        {/* Back Link */}
        <button
          onClick={() => navigate(`/category/${topic.categoryId}`)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.9rem",
            fontFamily: "var(--font-heading)",
            fontWeight: "500",
            marginBottom: "2rem",
            transition: "var(--transition-smooth)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = topic.categoryColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ChevronLeft size={16} />
          Back to {topic.categoryTitle}
        </button>

        {/* Master Double-Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "3rem",
            alignItems: "stretch",
          }}
          className="topic-split"
        >
          {/* Left Column: Conceptual Reading Markdown */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span
                className="badge"
                style={{
                  backgroundColor: `${topic.categoryColor}15`,
                  color: topic.categoryColor,
                  fontSize: "0.65rem",
                }}
              >
                {topic.categoryTitle}
              </span>
              <span style={{ color: "var(--text-dark)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <BookOpen size={12} /> {topic.readTime} reading time
              </span>
            </div>

            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                marginBottom: "2rem",
                lineHeight: "1.2",
              }}
            >
              {topic.title}
            </h1>

            {/* Rendered HTML contents */}
            <div style={{ marginBottom: "3rem" }}>{renderContent(topic.content)}</div>

            {/* Exercises Collapsible Section */}
            {topic.exercises && topic.exercises.length > 0 && (
              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "rgba(15, 17, 26, 0.4)",
                  marginTop: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#ffffff",
                  }}
                >
                  <Award size={18} color="var(--accent)" />
                  Concept Reviews & Exercises
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                  Verify your comprehension. Complete these questions mentally or in notes, then check off:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {topic.exercises.map((ex, index) => {
                    const isDone = completedExercises[index];
                    return (
                      <div
                        key={index}
                        onClick={() => handleToggleExercise(index)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "var(--transition-smooth)",
                          backgroundColor: isDone ? "rgba(34, 197, 94, 0.05)" : "rgba(255,255,255,0.01)",
                          border: isDone ? "1px solid rgba(34,197,94,0.2)" : "1px solid var(--border-light)",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: isDone ? "1px solid #22c55e" : "1px solid var(--text-dark)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "2px",
                            backgroundColor: isDone ? "#22c55e" : "transparent",
                            color: "#ffffff",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {isDone && <Check size={14} />}
                        </div>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: isDone ? "var(--text-muted)" : "var(--text-main)",
                            textDecoration: isDone ? "line-through" : "none",
                            lineHeight: "1.4",
                          }}
                        >
                          {ex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Code Execution Playground Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              className="glass-panel"
              style={{
                border: "1px solid var(--border-light)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: "100px",
                height: "600px",
              }}
            >
              {/* Tab Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(10, 11, 16, 0.8)",
                  borderBottom: "1px solid var(--border-light)",
                  padding: "0 1rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem", marginRight: "auto" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#eab308" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                </div>

                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => setActiveTab("code")}
                    style={{
                      background: "none",
                      border: "none",
                      color: activeTab === "code" ? "var(--text-main)" : "var(--text-dark)",
                      cursor: "pointer",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      padding: "1rem 1.25rem",
                      borderBottom: activeTab === "code" ? `2px solid ${topic.categoryColor}` : "2px solid transparent",
                      transition: "var(--transition-smooth)",
                    }}
                  >
                    Source Code
                  </button>
                  <button
                    onClick={() => setActiveTab("output")}
                    style={{
                      background: "none",
                      border: "none",
                      color: activeTab === "output" ? "var(--text-main)" : "var(--text-dark)",
                      cursor: "pointer",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      padding: "1rem 1.25rem",
                      borderBottom: activeTab === "output" ? `2px solid ${topic.categoryColor}` : "2px solid transparent",
                      transition: "var(--transition-smooth)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Terminal size={12} />
                    Output Logs
                  </button>
                </div>
              </div>

              {/* Tab Content Body */}
              <div style={{ flex: 1, backgroundColor: "#06070a", overflow: "auto", position: "relative" }}>
                {activeTab === "code" ? (
                  <pre
                    style={{
                      padding: "1.5rem",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.5",
                    }}
                  >
                    <code dangerouslySetInnerHTML={{
                      __html: topic.code
                        // Simple custom coloring logic for keywords
                        .replace(/(import|class|def|return|assert|super|from|print|dtype)/g, '<span style="color: var(--secondary);">$1</span>')
                        .replace(/(torch|nn|F|np)/g, '<span style="color: var(--accent);">$1</span>')
                        .replace(/(self)/g, '<span style="color: #f43f5e;">$1</span>')
                        .replace(/# (.*)/g, '<span style="color: var(--text-dark); italic font-style"># $1</span>')
                        .replace(/"""([\s\S]*?)"""/g, '<span style="color: var(--text-dark);">"""$1"""</span>')
                    }} />
                  </pre>
                ) : (
                  <pre
                    style={{
                      padding: "1.5rem",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      color: executing ? "var(--accent)" : "#22c55e",
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {executionResult || "Interactive compilation trace. Click 'Execute Code' to trigger tensor outputs."}
                  </pre>
                )}

                {/* Ambient Spinner in Execution overlay */}
                {executing && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: "rgba(6, 7, 10, 0.75)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "3px solid rgba(6, 182, 212, 0.1)",
                        borderTopColor: "var(--accent)",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <span>Virtualizing CUDA Node...</span>
                  </div>
                )}
              </div>

              {/* Action Compile Bar */}
              <div
                style={{
                  padding: "1rem 1.5rem",
                  backgroundColor: "rgba(10, 11, 16, 0.85)",
                  borderTop: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-dark)" }}>
                  <Cpu size={14} />
                  <span>CPU/GPU Runtime</span>
                </div>

                <button
                  onClick={handleExecute}
                  disabled={executing}
                  className="btn btn-accent"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    borderRadius: "6px",
                    gap: "0.35rem",
                  }}
                >
                  <Play size={12} fill="#ffffff" /> Run Sandbox
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .topic-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
