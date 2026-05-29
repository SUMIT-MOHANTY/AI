import React from "react";
import { Terminal, Shield, Zap, Compass, ChevronRight } from "lucide-react";

export default function Hero({ navigate, onSearchClick }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "5rem 0 4rem 0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background ambient glowing spheres */}
      <div
        className="glow-blob glow-animation"
        style={{
          width: "400px",
          height: "400px",
          top: "-50px",
          left: "15%",
          background: "var(--primary-glow)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="glow-blob glow-animation"
        style={{
          width: "350px",
          height: "350px",
          bottom: "0px",
          right: "10%",
          background: "var(--secondary-glow)",
          filter: "blur(120px)",
          animationDelay: "-3s",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            alignItems: "center",
            gap: "4rem",
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              textAlign: "left",
            }}
            className="animate-slide-up"
          >
            {/* Tagline Badge */}
            <div
              className="badge"
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                color: "var(--primary)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                padding: "0.4rem 1rem",
                fontSize: "0.75rem",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Zap size={12} />
              <span>Computational Academy v1.0.5</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                lineHeight: "1.1",
                fontWeight: "800",
                background: "linear-gradient(135deg, #ffffff 40%, var(--text-muted) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Decipher the math behind <br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Neural Intelligence
              </span>
            </h1>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "520px",
              }}
            >
              An interactive visualization platform designed for deep learning researchers. Step through forward schedules, causal masks, convolutional channels, and policy gradients in real time.
            </p>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <button
                onClick={() => {
                  const el = document.getElementById("explore-modules");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary"
                style={{ padding: "0.9rem 2rem", fontSize: "1rem" }}
              >
                <Compass size={18} />
                Explore Modules
              </button>
              <button
                onClick={onSearchClick}
                className="btn btn-secondary"
                style={{ padding: "0.9rem 1.75rem", fontSize: "1rem" }}
              >
                Database Search (⌘K)
              </button>
            </div>

            {/* Platform Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                marginTop: "2rem",
                borderTop: "1px solid var(--border-light)",
                paddingTop: "2rem",
              }}
            >
              {[
                { val: "4", label: "Core Fields" },
                { val: "100%", label: "PyTorch Sandboxed" },
                { val: "0ms", label: "Latency Node" },
              ].map((stat, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: "700",
                      background: "linear-gradient(135deg, var(--accent), var(--primary))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.val}
                  </span>
                  <span style={{ color: "var(--text-dark)", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Visual Graphic */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="animate-slide-up"
          >
            {/* Outer spinning background circle glow */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
                animation: "pulseGlow 5s infinite alternate",
              }}
            />

            {/* Premium Interactive Mock Visual Box */}
            <div
              className="glass-panel"
              style={{
                width: "100%",
                maxWidth: "420px",
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                background: "rgba(10, 11, 16, 0.85)",
              }}
            >
              {/* Box Top Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#eab308" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-dark)" }}>
                  neural_core.py
                </span>
              </div>

              {/* Box Visual Vector Nodes */}
              <div
                style={{
                  height: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* SVG Synapse Map */}
                <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Connection Lines */}
                  <g stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5">
                    <line x1="20" y1="30" x2="80" y2="60" />
                    <line x1="20" y1="90" x2="80" y2="60" />
                    <line x1="80" y1="60" x2="140" y2="30" />
                    <line x1="80" y1="60" x2="140" y2="90" />
                    
                    <line x1="140" y1="30" x2="180" y2="60" />
                    <line x1="140" y1="90" x2="180" y2="60" />
                  </g>
                  
                  {/* Dynamic Glowing Pulses */}
                  <circle cx="80" cy="60" r="14" fill="url(#core-grad)" filter="url(#glow)" style={{ animation: "pulseGlow 2s infinite alternate" }} />
                  
                  <circle cx="20" cy="30" r="6" fill="#a855f7" />
                  <circle cx="20" cy="90" r="6" fill="#a855f7" />
                  
                  <circle cx="140" cy="30" r="6" fill="#06b6d4" />
                  <circle cx="140" cy="90" r="6" fill="#06b6d4" />
                  
                  <circle cx="180" cy="60" r="8" fill="#6366f1" />
                </svg>
              </div>

              {/* Box Bottom Execution Info */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-main)", fontWeight: "500" }}>System Core Active</span>
                  <span className="badge" style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: "0.65rem" }}>Stable</span>
                </div>
                <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
                  Loss Converged: 0.0024 | Epochs: 400
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 3rem !important;
          }
          .hero-grid div {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
