import React, { useState } from "react";
import { Terminal, Github, Twitter, Cpu, CheckCircle } from "lucide-react";


import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-light)",
        backgroundColor: "var(--bg-secondary)",
        padding: "4rem 0 2rem 0",
        marginTop: "auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Logo & Vision Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
              }}
              onClick={() => navigate("/about")}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Terminal size={14} color="#ffffff" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "#ffffff",
                }}
              >
                NEURA<span style={{ color: "var(--accent)" }}>LEARN</span>
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              An interactive learning hub focused on clarifying complex machine learning, neural, and generative architectures.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--text-muted)",
                  transition: "var(--transition-smooth)",
                  display: "flex",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--text-muted)",
                  transition: "var(--transition-smooth)",
                  display: "flex",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Nav Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4 style={{ color: "#ffffff", fontFamily: "var(--font-heading)", fontSize: "1rem" }}>
              Modules
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              {[
                { id: "generative-ai", label: "Generative AI" },
                { id: "natural-language-processing", label: "Natural Language Processing" },
                { id: "computer-vision", label: "Computer Vision" },
                { id: "reinforcement-learning", label: "Reinforcement Learning" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => navigate("category", { id: m.id })}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "var(--transition-smooth)",
                    fontSize: "0.9rem",
                    padding: "0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-main)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4 style={{ color: "#ffffff", fontFamily: "var(--font-heading)", fontSize: "1rem" }}>
              NeuraLetters
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              Subscribe to get insights on modern neural architectures and deep learning explanations.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder="researcher@institute.edu"
                className="glass-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", borderRadius: "8px" }}
              >
                Join
              </button>
            </form>
            {subscribed && (
              <span
                style={{
                  color: "var(--accent)",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <CheckCircle size={12} /> Verification node joined! check your inbox soon.
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border-light)",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            mdDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "var(--text-dark)",
          }}
          className="bottom-footer"
        >
          <span>© {new Date().getFullYear()} NeuraLearn Platform. Built for scientific clarity.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }} >System Core Specs</span>
            <span>Security Nodes</span>
            <span>Academic Licensing</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bottom-footer {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
