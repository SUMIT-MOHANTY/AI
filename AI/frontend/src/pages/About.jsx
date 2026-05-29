import React from "react";
import { Terminal, Shield, Cpu, Code, Users, Award, ExternalLink } from "lucide-react";

export default function About({ navigate }) {
  return (
    <div className="animate-fade-in" style={{ padding: "3rem 0 6rem 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            className="badge"
            style={{
              background: "rgba(168, 85, 247, 0.08)",
              color: "var(--secondary)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              padding: "0.25rem 0.75rem",
              marginBottom: "1rem",
            }}
          >
            System Diagnostics
          </div>
          <h1 style={{ fontSize: "2.6rem", fontWeight: "800", marginBottom: "1rem" }}>
            Platform Specifications
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "1rem" }}>
            Unveiling the client-side sandboxed execution architecture and design tokens driving NeuraLearn.
          </p>
        </div>

        {/* System parameters grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              icon: <Cpu size={24} color="var(--accent)" />,
              title: "Sandboxed Virtualization",
              desc: "Every code snippet runs within custom client-side web workers. Visual states are captured instantly with 0ms backend database dependencies.",
            },
            {
              icon: <Shield size={24} color="var(--primary)" />,
              title: "Academic Grade Rigor",
              desc: "Core visual formulas conform directly to published deep learning source manuals (e.g. *Attention Is All You Need*, DDPM papers).",
            },
            {
              icon: <Code size={24} color="var(--secondary)" />,
              title: "React 19 Core Engine",
              desc: "Utilizes optimized context routers and concurrent fiber scheduling to perform seamless mathematical compilation transitions.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                border: "1px solid var(--border-light)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-light)",
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff" }}>{item.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical flow visualizer section */}
        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            border: "1px solid var(--border-light)",
            background: "rgba(15, 17, 26, 0.4)",
            marginBottom: "5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="about-visual-grid"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <span className="badge" style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "var(--accent)", width: "fit-content" }}>
                Execution Pipeline
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#ffffff" }}>
                Isolated Virtual Compilers
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                When you click "Run Sandbox" inside topics, a simulated multi-stage virtual worker pipeline starts. Memory layers are mapped dynamically, model weights are formatted, and tensors are run through linear projections to output high-fidelity console telemetry.
              </p>
            </div>

            {/* Interactive Vector Flow Nodes */}
            <div
              style={{
                backgroundColor: "rgba(6, 7, 10, 0.6)",
                border: "1px solid var(--border-light)",
                borderRadius: "16px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                { label: "1. Tokenize Input Sequences", color: "var(--primary)" },
                { label: "2. Load Causal Mask Projections", color: "var(--secondary)" },
                { label: "3. Run Matrix Multiplication Tensor", color: "var(--accent)" },
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderLeft: `3px solid ${step.color}`,
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ color: step.color, fontWeight: "bold" }}>0{i+1}</span>
                  <span style={{ color: "var(--text-main)" }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA exploration block */}
        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>
            Ready to explore?
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", fontSize: "0.95rem" }}>
            Step back to the main academy and select a mathematical framework module to begin.
          </p>
          <button
            onClick={() => navigate("home")}
            className="btn btn-primary"
            style={{ padding: "0.8rem 2.2rem" }}
          >
            Return to Core Hub
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-visual-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
