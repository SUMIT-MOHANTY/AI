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
  const [lessonTab, setLessonTab] = useState("theory"); // "theory" or "sandbox"

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getTopicById(id);
        setTopic(data);
        setActiveTab("code");
        setExecutionResult("");
        setLessonTab("theory");
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

  // Convert markdown-style content to styled HTML elements safely and dynamically
  const renderContent = (content) => {
    if (!content) return null;
    
    const lines = content.split("\n");
    const elements = [];
    
    let currentList = [];
    let currentBlockquote = [];
    let inBlockquote = false;
    let blockquoteType = "note"; // "note", "tip", "important", "warning", "caution"
    
    const parseInline = (text) => {
      if (!text) return "";
      let processed = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // LaTeX symbol replacements
        .replace(/\\rightarrow/g, "→")
        .replace(/\\times/g, "×")
        .replace(/\\epsilon/g, "ε")
        .replace(/\\theta/g, "θ")
        .replace(/\\mu/g, "μ")
        .replace(/\\Sigma/g, "Σ")
        .replace(/\\alpha/g, "α")
        .replace(/\\beta/g, "β")
        .replace(/\\mathbb\{R\}/g, "ℝ")
        .replace(/\\mathcal\{N\}/g, "𝒩")
        .replace(/\\text\{(.*?)\}/g, "$1");

      return processed
        // Bold text: **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff; font-weight: 700;">$1</strong>')
        // Inline code: `code`
        .replace(/`(.*?)`/g, '<code style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.05rem 0.2rem; border-radius: 4px; color: var(--secondary); font-family: monospace; font-size: 0.85em; display: inline-block; line-height: 1.2;">$1</code>')
        // Inline math: $math$
        .replace(/\$(.*?)\$/g, '<code style="background-color: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.18); padding: 0.05rem 0.2rem; border-radius: 4px; color: var(--accent); font-family: monospace; font-size: 0.9em; display: inline-block; line-height: 1.2;">$1</code>');
    };
    
    const flushList = (key) => {
      if (currentList.length > 0) {
        elements.push(
          <ul
            key={`list-${key}`}
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "1.25rem",
              color: "var(--text-muted)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              listStyleType: "disc"
            }}
          >
            {currentList.map((item, idx) => (
              <li key={idx} style={{ fontSize: "0.94rem", lineHeight: "1.6" }} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };
    
    const flushBlockquote = (key) => {
      if (currentBlockquote.length > 0) {
        const typeColors = {
          note: { border: "var(--primary)", bg: "rgba(99, 102, 241, 0.03)", title: "NOTE", color: "var(--primary)" },
          tip: { border: "#10b981", bg: "rgba(16, 185, 129, 0.03)", title: "TIP", color: "#10b981" },
          important: { border: "var(--accent)", bg: "rgba(6, 182, 212, 0.03)", title: "IMPORTANT", color: "var(--accent)" },
          warning: { border: "#f59e0b", bg: "rgba(245, 158, 11, 0.03)", title: "WARNING", color: "#f59e0b" },
          caution: { border: "#ef4444", bg: "rgba(239, 68, 68, 0.03)", title: "CAUTION", color: "#ef4444" }
        };
        
        const config = typeColors[blockquoteType] || typeColors.note;
        
        elements.push(
          <div
            key={`bq-${key}`}
            className="glass-panel"
            style={{
              borderLeft: `4px solid ${config.border}`,
              padding: "1.25rem 1.5rem",
              margin: "1.5rem 0",
              background: config.bg,
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: config.color, fontWeight: "800", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              <span>⚡ {config.title}</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
              {currentBlockquote.map((p, idx) => (
                <p key={idx} style={{ marginBottom: idx === currentBlockquote.length - 1 ? 0 : "0.75rem" }} dangerouslySetInnerHTML={{ __html: parseInline(p) }} />
              ))}
            </div>
          </div>
        );
        currentBlockquote = [];
        inBlockquote = false;
      }
    };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Handle empty line
      if (!line) {
        flushList(i);
        continue;
      }
      
      // Handle blockquotes/alerts (e.g. > [!NOTE])
      if (line.startsWith(">")) {
        flushList(i);
        inBlockquote = true;
        
        let bqText = line.substring(1).trim();
        if (bqText.startsWith("[!")) {
          const match = bqText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
          if (match) {
            blockquoteType = match[1].toLowerCase();
            bqText = bqText.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i, "").trim();
          }
        }
        
        if (bqText) {
          currentBlockquote.push(bqText);
        }
        continue;
      } else if (inBlockquote) {
        flushBlockquote(i);
      }
      
      // Handle Headers
      if (line.startsWith("### ")) {
        flushList(i);
        elements.push(
          <h3
            key={i}
            style={{
              fontSize: "1.3rem",
              fontWeight: "800",
              marginTop: "2rem",
              marginBottom: "1rem",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              borderLeft: `4px solid ${topic.categoryColor || "var(--primary)"}`,
              paddingLeft: "0.75rem",
            }}
          >
            {line.replace("### ", "")}
          </h3>
        );
        continue;
      }
      
      if (line.startsWith("#### ")) {
        flushList(i);
        elements.push(
          <h4
            key={i}
            style={{
              fontSize: "1.05rem",
              fontWeight: "700",
              marginTop: "1.5rem",
              marginBottom: "0.6rem",
              color: "var(--text-main)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {line.replace("#### ", "")}
          </h4>
        );
        continue;
      }
      
      // Handle Block Math Formulas
      if (line.startsWith("$$") && line.endsWith("$$")) {
        flushList(i);
        const formula = line.replaceAll("$$", "").trim();
        elements.push(
          <div
            key={i}
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
        continue;
      }
      
      // Handle Unordered Lists
      if (line.startsWith("* ") || line.startsWith("- ")) {
        currentList.push(line.substring(2));
        continue;
      } else {
        flushList(i);
      }
      
      // Regular Paragraph
      elements.push(
        <p
          key={i}
          style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: "1.7",
            marginBottom: "1.2rem",
          }}
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      );
    }
    
    // Flush any remaining lists or blockquotes
    flushList(lines.length);
    flushBlockquote(lines.length);
    
    return elements;
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

        {/* Lesson Tab Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
            borderBottom: "1px solid var(--border-light)",
            paddingBottom: "1rem",
          }}
        >
          <button
            onClick={() => setLessonTab("theory")}
            style={{
              background: lessonTab === "theory" ? `${topic.categoryColor}12` : "transparent",
              border: lessonTab === "theory" ? `1px solid ${topic.categoryColor}50` : "1px solid transparent",
              color: lessonTab === "theory" ? "#ffffff" : "var(--text-muted)",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              fontFamily: "var(--font-heading)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (lessonTab !== "theory") e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (lessonTab !== "theory") e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <BookOpen size={16} color={lessonTab === "theory" ? topic.categoryColor : "var(--text-dark)"} />
            Theory & Concepts
          </button>

          <button
            onClick={() => setLessonTab("sandbox")}
            style={{
              background: lessonTab === "sandbox" ? `${topic.categoryColor}12` : "transparent",
              border: lessonTab === "sandbox" ? `1px solid ${topic.categoryColor}50` : "1px solid transparent",
              color: lessonTab === "sandbox" ? "#ffffff" : "var(--text-muted)",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              fontFamily: "var(--font-heading)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (lessonTab !== "sandbox") e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (lessonTab !== "sandbox") e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <Terminal size={16} color={lessonTab === "sandbox" ? topic.categoryColor : "var(--text-dark)"} />
            Interactive Sandbox
          </button>
        </div>

        {/* Tab Content Display */}
        {lessonTab === "theory" ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
            className="animate-fade-in"
          >
            {/* Header & Badges */}
            <div>
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
                  fontSize: "2rem",
                  fontWeight: "800",
                  marginBottom: "1.5rem",
                  lineHeight: "1.25",
                  color: "#ffffff",
                  letterSpacing: "-0.02em"
                }}
              >
                {topic.title}
              </h1>
            </div>

            {/* Rendered HTML Text contents */}
            <div style={{ fontSize: "0.98rem", lineHeight: "1.8" }}>
              {renderContent(topic.content)}
            </div>

            {/* Interactive Visual Graph Math widgets */}
            {renderTopicVisualizer(topic.id)}

            {/* Exercises Collapsible Section */}
            {topic.exercises && topic.exercises.length > 0 && (
              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "rgba(15, 17, 26, 0.4)",
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

            {/* Prompt to Sandbox */}
            <div
              className="glass-panel"
              style={{
                padding: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem",
                border: `1px dashed ${topic.categoryColor}40`,
                background: `linear-gradient(180deg, rgba(15,17,26,0.7) 0%, rgba(9,10,15,0.9) 100%)`,
                borderRadius: "12px",
                marginTop: "1.5rem"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxWidth: "550px" }}>
                <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                  Ready to test your understanding?
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  Apply the theory inside a live interactive coding sandbox! Run real-time PyTorch simulations, trace tensor graphs, and inspect parameters in a dual-pane GPU terminal workspace.
                </span>
              </div>
              <button
                onClick={() => {
                  setLessonTab("sandbox");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-accent"
                style={{
                  padding: "0.75rem 1.5rem",
                  fontWeight: "700",
                  gap: "0.5rem",
                  borderRadius: "8px"
                }}
              >
                Open Sandbox <ChevronRight size={16} />
              </button>
            </div>

          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
            className="animate-fade-in"
          >
            {/* Header info */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${topic.categoryColor}15`,
                    color: topic.categoryColor,
                    fontSize: "0.65rem",
                    alignSelf: "flex-start"
                  }}
                >
                  Interactive Workspace
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
                  {topic.title} Sandbox
                </h2>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                  <Cpu size={14} color={topic.categoryColor} />
                  <span>CUDA Device: VIRTUAL_ONLINE</span>
                </div>
              </div>
            </div>

            {/* Premium Dual-Pane side-by-side IDE Workspace */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: "1.5rem",
                minHeight: "580px",
                alignItems: "stretch"
              }}
              className="sandbox-ide-split"
            >
              {/* Left Pane: Code Editor */}
              <div
                className="glass-panel"
                style={{
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#06070a",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                }}
              >
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    borderBottom: "1px solid var(--border-light)",
                    backgroundColor: "rgba(10, 11, 16, 0.8)",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)", fontWeight: "600" }}>
                    training_sandbox.py
                  </span>
                  <div style={{ display: "flex", gap: "0.35rem", marginLeft: "auto" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#eab308" }} />
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                  </div>
                </div>
                
                <div style={{ flex: 1, overflow: "auto" }}>
                  <pre
                    style={{
                      padding: "1.5rem",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.5",
                      margin: 0
                    }}
                  >
                    <code dangerouslySetInnerHTML={{
                      __html: topic.code
                        .replace(/(import|class|def|return|assert|super|from|print|dtype)/g, '<span style="color: var(--secondary);">$1</span>')
                        .replace(/(torch|nn|F|np)/g, '<span style="color: var(--accent);">$1</span>')
                        .replace(/(self)/g, '<span style="color: #f43f5e;">$1</span>')
                        .replace(/# (.*)/g, '<span style="color: var(--text-dark); italic font-style"># $1</span>')
                        .replace(/"""([\s\S]*?)"""/g, '<span style="color: var(--text-dark);">"""$1"""</span>')
                    }} />
                  </pre>
                </div>
              </div>

              {/* Right Pane: Live Console terminal output logs */}
              <div
                className="glass-panel"
                style={{
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#030406",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  position: "relative"
                }}
              >
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    borderBottom: "1px solid var(--border-light)",
                    backgroundColor: "rgba(10, 11, 16, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Terminal size={12} color="#22c55e" />
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#22c55e", fontWeight: "700" }}>
                    terminal_logs.sh
                  </span>
                </div>

                <div style={{ flex: 1, overflow: "auto" }}>
                  <pre
                    style={{
                      padding: "1.5rem",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      color: executing ? "var(--accent)" : "#22c55e",
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                      margin: 0
                    }}
                  >
                    {executionResult || "CUDA Engine Ready.\nClick 'Run Live Sandbox' at the bottom to execute PyTorch simulation traces..."}
                  </pre>
                </div>

                {/* Virtualization spinner overlay */}
                {executing && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: "rgba(3, 4, 6, 0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      fontFamily: "monospace",
                      fontSize: "0.82rem",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "3px solid rgba(6, 182, 212, 0.1)",
                        borderTopColor: "var(--accent)",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <span>CUDA Kernel Optimization active...</span>
                  </div>
                )}

                {/* Run button directly inside terminal console */}
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    borderTop: "1px solid var(--border-light)",
                    backgroundColor: "rgba(10, 11, 16, 0.85)",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-dark)" }}>
                    GPU_status: ONLINE
                  </span>
                  
                  <button
                    onClick={handleExecute}
                    disabled={executing}
                    className="btn btn-accent"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.85rem",
                      borderRadius: "6px",
                      marginLeft: "auto",
                      gap: "0.35rem"
                    }}
                  >
                    <Play size={12} fill="#ffffff" /> Run Live Sandbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
          .visualizer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ----------------------------------------------------
// INTERACTIVE MATHEMATICAL GRAPH VISUALIZERS
// ----------------------------------------------------

function renderTopicVisualizer(topicId, color) {
  switch (topicId) {
    case "support-vector-machines":
      return <SVMVisualizer color="#06b6d4" />;
    case "k-means-clustering":
      return <KMeansVisualizer color="#10b981" />;
    case "attention-mechanism":
      return <AttentionVisualizer color="#6366f1" />;
    case "ai-core-fundamentals":
      return <PatternVisualizer color="#6366f1" />;
    default:
      return null;
  }
}

// 1. SVM & Regression Visualizer (y = ax + b)
function SVMVisualizer({ color }) {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [showMargin, setShowMargin] = useState(true);

  // Labeled points: Class A (Spam - Cyan) and Class B (Not Spam - Magenta)
  const classA = [{ x: 60, y: 200 }, { x: 100, y: 170 }, { x: 130, y: 220 }];
  const classB = [{ x: 220, y: 80 }, { x: 260, y: 110 }, { x: 290, y: 60 }];

  // Hyperplane formula: y_graph = slope * (x_graph - 175) + 140 - intercept
  const getLineY = (xVal) => {
    return slope * (xVal - 175) + 140 - intercept;
  };

  return (
    <div className="glass-panel" style={{ padding: "1.75rem", border: `1px solid ${color}35`, background: "rgba(15,17,26,0.6)", borderRadius: "12px", marginTop: "2rem", marginBottom: "2rem" }}>
      <h4 style={{ color: "#ffffff", marginBottom: "0.5rem", fontSize: "1.05rem", fontFamily: "var(--font-heading)" }}>
        📊 Interactive Math Graph: SVM & Regression Hyperplane ($y = ax + b$)
      </h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Drag the weight (slope $a$) and bias (intercept $b$) parameters below to visually adjust the separating hyperplane/regression line in real-time.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem", alignItems: "center" }} className="visualizer-grid">
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#06070a", borderRadius: "8px", border: "1px solid var(--border-light)", padding: "1.25rem", display: "flex", justifyContent: "center" }}>
          <svg width="320" height="280" style={{ overflow: "visible" }}>
            {/* Grid Axes */}
            <line x1="30" y1="250" x2="310" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="30" y1="30" x2="30" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            
            {/* Axis labels */}
            <text x="300" y="270" fill="var(--text-dark)" fontSize="10" fontFamily="monospace">X (Size)</text>
            <text x="5" y="25" fill="var(--text-dark)" fontSize="10" fontFamily="monospace">Y (Price)</text>

            {/* Class A: Cyan (Spam) */}
            {classA.map((p, i) => (
              <circle key={`a-${i}`} cx={p.x} cy={p.y} r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px #06b6d440)" }} />
            ))}

            {/* Class B: Magenta (Not Spam) */}
            {classB.map((p, i) => (
              <rect key={`b-${i}`} x={p.x - 6} y={p.y - 6} width="12" height="12" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px #ec489940)" }} />
            ))}

            {/* Margins */}
            {showMargin && (
              <>
                <line x1="30" y1={getLineY(30) - 25} x2="310" y2={getLineY(310) - 25} stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="4" />
                <line x1="30" y1={getLineY(30) + 25} x2="310" y2={getLineY(310) + 25} stroke="rgba(236, 72, 153, 0.25)" strokeWidth="1" strokeDasharray="4" />
              </>
            )}

            {/* Main Separating Hyperplane */}
            <line x1="30" y1={getLineY(30)} x2="310" y2={getLineY(310)} stroke={color} strokeWidth="3" style={{ filter: `drop-shadow(0 0 8px ${color}50)` }} />
          </svg>
        </div>

        {/* Sliders Control Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: "600" }}>Weight Parameter ($a$ - Slope)</span>
              <span style={{ fontSize: "0.85rem", color: color, fontFamily: "monospace", fontWeight: "700" }}>{slope.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="2.0"
              step="0.05"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: color, cursor: "pointer" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: "600" }}>Bias Parameter ($b$ - Intercept)</span>
              <span style={{ fontSize: "0.85rem", color: color, fontFamily: "monospace", fontWeight: "700" }}>{intercept.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min="-60"
              max="60"
              step="1"
              value={intercept}
              onChange={(e) => setIntercept(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: color, cursor: "pointer" }}
            />
          </div>

          <div
            onClick={() => setShowMargin(!showMargin)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid var(--border-light)",
              backgroundColor: showMargin ? `${color}10` : "transparent",
              color: showMargin ? "#ffffff" : "var(--text-muted)",
              fontSize: "0.8rem",
              fontWeight: "600",
              alignSelf: "flex-start",
              transition: "all 0.2s ease"
            }}
          >
            <div style={{ width: "14px", height: "14px", borderRadius: "3px", border: `1px solid ${color}`, backgroundColor: showMargin ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {showMargin && <Check size={10} color="#ffffff" />}
            </div>
            Toggle SVM Soft Margin Bounds
          </div>

          <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.02)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
            🤖 <strong>Equation state:</strong> Current separating hyperplane models the function: <code style={{ color: "var(--accent)" }}>y = {slope.toFixed(2)}x + {intercept > 0 ? "+" : ""}{intercept}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. K-Means Centroid Visualizer
function KMeansVisualizer({ color }) {
  const [step, setStep] = useState(0); // 0: unassigned, 1: assigned, 2: centered
  const [c1, setC1] = useState({ x: 80, y: 140 });
  const [c2, setC2] = useState({ x: 260, y: 140 });

  // 6 Unlabeled Customer points
  const points = [
    { id: 1, x: 70, y: 80 }, { id: 2, x: 110, y: 60 }, { id: 3, x: 60, y: 110 },
    { id: 4, x: 240, y: 200 }, { id: 5, x: 280, y: 220 }, { id: 6, x: 220, y: 180 }
  ];

  // Helper to calculate closest centroid
  const getPointColor = (p) => {
    if (step === 0) return "var(--text-dark)";
    const d1 = Math.pow(p.x - c1.x, 2) + Math.pow(p.y - c1.y, 2);
    const d2 = Math.pow(p.x - c2.x, 2) + Math.pow(p.y - c2.y, 2);
    return d1 < d2 ? "#06b6d4" : "#ec4899"; // Cyan or Magenta
  };

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const groupA = points.filter(p => {
        const d1 = Math.pow(p.x - c1.x, 2) + Math.pow(p.y - c1.y, 2);
        const d2 = Math.pow(p.x - c2.x, 2) + Math.pow(p.y - c2.y, 2);
        return d1 < d2;
      });

      const groupB = points.filter(p => {
        const d1 = Math.pow(p.x - c1.x, 2) + Math.pow(p.y - c1.y, 2);
        const d2 = Math.pow(p.x - c2.x, 2) + Math.pow(p.y - c2.y, 2);
        return d1 >= d2;
      });

      if (groupA.length > 0) {
        const mX = groupA.reduce((sum, p) => sum + p.x, 0) / groupA.length;
        const mY = groupA.reduce((sum, p) => sum + p.y, 0) / groupA.length;
        setC1({ x: mX, y: mY });
      }

      if (groupB.length > 0) {
        const mX = groupB.reduce((sum, p) => sum + p.x, 0) / groupB.length;
        const mY = groupB.reduce((sum, p) => sum + p.y, 0) / groupB.length;
        setC2({ x: mX, y: mY });
      }
      setStep(2);
    } else {
      setC1({ x: 80, y: 140 });
      setC2({ x: 260, y: 140 });
      setStep(0);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "1.75rem", border: `1px solid ${color}35`, background: "rgba(15,17,26,0.6)", borderRadius: "12px", marginTop: "2rem", marginBottom: "2rem" }}>
      <h4 style={{ color: "#ffffff", marginBottom: "0.5rem", fontSize: "1.05rem", fontFamily: "var(--font-heading)" }}>
        📊 Interactive Math Graph: K-Means Clustering Centroids
      </h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Discover cluster assignments in unlabeled customer segments. Click the iteration trigger to perform standard Lloyd's partition assignment and centroid shifts!
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem", alignItems: "center" }} className="visualizer-grid">
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#06070a", borderRadius: "8px", border: "1px solid var(--border-light)", padding: "1.25rem", display: "flex", justifyContent: "center" }}>
          <svg width="320" height="260" style={{ overflow: "visible" }}>
            {/* Grid lines */}
            <line x1="30" y1="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="30" y1="30" x2="30" y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            
            {/* Data points */}
            {points.map((p) => {
              const pCol = getPointColor(p);
              return (
                <g key={p.id}>
                  {step === 1 && (
                    <line
                      x1={p.x}
                      y1={p.y}
                      x2={pCol === "#06b6d4" ? c1.x : c2.x}
                      y2={pCol === "#06b6d4" ? c1.y : c2.y}
                      stroke={pCol}
                      strokeWidth="1"
                      strokeDasharray="2"
                      strokeOpacity="0.4"
                    />
                  )}
                  <circle cx={p.x} cy={p.y} r="6" fill={pCol} stroke="#ffffff" strokeWidth="1" />
                </g>
              );
            })}

            {/* Centroid 1 */}
            <circle cx={c1.x} cy={c1.y} r="11" fill="#06b6d4" stroke="#ffffff" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 8px #06b6d480)", transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)" }} />
            <text x={c1.x - 4} y={c1.y + 4} fill="#ffffff" fontSize="9" fontWeight="900" style={{ transition: "all 0.6s ease", fontFamily: "monospace" }}>C1</text>

            {/* Centroid 2 */}
            <circle cx={c2.x} cy={c2.y} r="11" fill="#ec4899" stroke="#ffffff" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 8px #ec489980)", transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)" }} />
            <text x={c2.x - 4} y={c2.y + 4} fill="#ffffff" fontSize="9" fontWeight="900" style={{ transition: "all 0.6s ease", fontFamily: "monospace" }}>C2</text>
          </svg>
        </div>

        {/* Steps description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-dark)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Current Step State
            </span>
            <h5 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
              {step === 0 && "Step 1: Unlabeled Init"}
              {step === 1 && "Step 2: Partition Assignment"}
              {step === 2 && "Step 3: Centroid Relocation"}
            </h5>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.4" }}>
              {step === 0 && "Centroids placed randomly. Points behave as unlabeled statistics ($X$)."}
              {step === 1 && "Each customer point connects with the closest centroid by Euclidean distance equations."}
              {step === 2 && "Centroids relocate to the mean geometric coordinates of their cluster groups. Perfect convergence!"}
            </p>
          </div>

          <button
            onClick={handleNextStep}
            className="btn btn-secondary"
            style={{
              padding: "0.6rem 1rem",
              fontSize: "0.82rem",
              fontWeight: "700",
              alignSelf: "flex-start",
              width: "100%",
              justifyContent: "center"
            }}
          >
            {step === 0 && "Assign Partition Points"}
            {step === 1 && "Move Centroids (Recalculate Mean)"}
            {step === 2 && "Reset Centroid Coordinates"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Interactive Self-Attention Matrix Heatmap
function AttentionVisualizer({ color }) {
  const [hoveredToken, setHoveredToken] = useState(null);

  const tokens = ["AI", "is", "cool"];
  const attentionWeights = {
    AI: [0.78, 0.17, 0.05],
    is: [0.17, 0.78, 0.05],
    cool: [0.05, 0.05, 0.90]
  };

  return (
    <div className="glass-panel" style={{ padding: "1.75rem", border: `1px solid ${color}35`, background: "rgba(15,17,26,0.6)", borderRadius: "12px", marginTop: "2rem", marginBottom: "2rem" }}>
      <h4 style={{ color: "#ffffff", marginBottom: "0.5rem", fontSize: "1.05rem", fontFamily: "var(--font-heading)" }}>
        📊 Interactive Math Graph: Scaled Dot-Product Self-Attention Map
      </h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Self-attention permits context-aware vector linkages. **Hover over any token** to visually trace how much mathematical attention weights ($QK^T / \sqrt{d_k}$) it projects to itself and other tokens!
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2rem", alignItems: "center" }} className="visualizer-grid">
        {/* Connection visualization */}
        <div style={{ backgroundColor: "#06070a", borderRadius: "8px", border: "1px solid var(--border-light)", padding: "1.75rem 1.25rem", minHeight: "220px", display: "flex", flexDirection: "column", justifySelf: "stretch", justifyContent: "space-between", position: "relative" }}>
          
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", zIndex: 1 }}>
            {tokens.map((tok, idx) => (
              <div
                key={tok}
                onMouseEnter={() => setHoveredToken(tok)}
                onMouseLeave={() => setHoveredToken(null)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  border: hoveredToken === tok ? `1.5px solid ${color}` : "1px solid var(--border-light)",
                  backgroundColor: hoveredToken === tok ? `${color}15` : "rgba(22, 25, 38, 0.8)",
                  color: hoveredToken === tok ? "#ffffff" : "var(--text-muted)",
                  fontFamily: "monospace",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  cursor: "crosshair",
                  transition: "all 0.2s ease"
                }}
              >
                {tok}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, position: "relative", minHeight: "100px", zIndex: 0 }}>
            {hoveredToken && (
              <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                {tokens.map((tok, idx) => {
                  const weight = attentionWeights[hoveredToken][idx];
                  const fromX = hoveredToken === "AI" ? 50 : hoveredToken === "is" ? 135 : 220;
                  const toX = idx === 0 ? 50 : idx === 1 ? 135 : 220;
                  
                  return (
                    <g key={tok}>
                      <path
                        d={`M ${fromX}, 0 Q ${(fromX + toX) / 2}, 40 ${toX}, 80`}
                        stroke={color}
                        strokeWidth={weight * 6}
                        strokeOpacity={weight}
                        fill="none"
                      />
                      <text x={(fromX + toX) / 2 - 10} y="40" fill="var(--text-main)" fontSize="9" fontWeight="900">
                        {(weight * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", zIndex: 1 }}>
            {tokens.map((tok) => (
              <div
                key={`dest-${tok}`}
                style={{
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  backgroundColor: "rgba(10,11,16,0.6)",
                  border: "1px dashed rgba(255,255,255,0.05)",
                  color: "var(--text-dark)",
                  fontFamily: "monospace",
                  fontSize: "0.75rem"
                }}
              >
                Context
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-dark)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Attention Matrix Heatmap
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.35rem", width: "180px" }}>
            <div />
            {tokens.map(t => <div key={t} style={{ textAlign: "center", fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{t}</div>)}

            {tokens.map((rowTok, rowIdx) => (
              <React.Fragment key={rowTok}>
                <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>{rowTok}</div>
                {tokens.map((colTok, colIdx) => {
                  const val = attentionWeights[rowTok][colIdx];
                  const isHovered = hoveredToken === rowTok;
                  return (
                    <div
                      key={colTok}
                      style={{
                        height: "36px",
                        backgroundColor: `${color}`,
                        opacity: isHovered ? val : val * 0.5 + 0.1,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        color: val > 0.5 ? "#ffffff" : "var(--text-main)",
                        fontWeight: "700",
                        fontFamily: "monospace",
                        border: isHovered ? "1px solid #ffffff" : "1px solid transparent",
                        transition: "all 0.2s ease"
                      }}
                      title={`${rowTok} pays ${(val * 100).toFixed(0)}% attention to ${colTok}`}
                    >
                      {val.toFixed(2)}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Pattern Recognition Curve (y = x^2)
function PatternVisualizer({ color }) {
  const [val, setVal] = useState(5);
  return (
    <div className="glass-panel" style={{ padding: "1.75rem", border: `1px solid ${color}35`, background: "rgba(15,17,26,0.6)", borderRadius: "12px", marginTop: "2rem", marginBottom: "2rem" }}>
      <h4 style={{ color: "#ffffff", marginBottom: "0.5rem", fontSize: "1.05rem", fontFamily: "var(--font-heading)" }}>
        📊 Interactive Math Graph: Pattern Recognition fitting ($y = x^2$)
      </h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Machines learn target functions by identifying correlations. Drag the input parameter $x$ below to see how our model fits points along the quadratic curve in real-time.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem", alignItems: "center" }} className="visualizer-grid">
        <div style={{ backgroundColor: "#06070a", borderRadius: "8px", border: "1px solid var(--border-light)", padding: "1rem", display: "flex", justifyContent: "center" }}>
          <svg width="320" height="230" style={{ overflow: "visible" }}>
            <path
              d="M 50, 200 Q 140, 200 270, 30"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <path
              d={`M 50, 200 Q 140, 200 ${50 + val * 24}, ${200 - (val * val) * 2.2}`}
              fill="none"
              stroke={color}
              strokeWidth="3.5"
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />

            {[1, 2, 3, 4].map(x => (
              <circle key={x} cx={50 + x * 24} cy={200 - (x * x) * 2.2} r="4" fill="rgba(255,255,255,0.3)" stroke="#ffffff" />
            ))}

            <circle cx={50 + val * 24} cy={200 - (val * val) * 2.2} r="7" fill="#ffffff" stroke={color} strokeWidth="3.5" style={{ filter: `drop-shadow(0 0 10px ${color})`, transition: "all 0.1s ease" }} />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: "600" }}>Input Parameter ($x$)</span>
              <span style={{ fontSize: "0.85rem", color: color, fontFamily: "monospace", fontWeight: "700" }}>{val.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.1"
              value={val}
              onChange={(e) => setVal(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: color, cursor: "pointer" }}
            />
          </div>

          <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.02)", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
            🎯 <strong>Quadratic pattern match:</strong> When the input parameter is <code style={{ color: "#ffffff" }}>{val.toFixed(1)}</code>, our fitted model estimates the target output output to be: <code style={{ color: "var(--accent)", fontWeight: "700" }}>{(val * val).toFixed(2)}</code>.
          </div>
        </div>
      </div>
    </div>
  );
}

