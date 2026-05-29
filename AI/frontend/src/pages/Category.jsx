import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { ChevronLeft, Calendar, Clock, BarChart2, BookOpen, ArrowRight } from "lucide-react";

export default function Category({ params, navigate }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getCategoryById(params.id);
        setCategory(data);
      } catch (err) {
        console.error(err);
        setError("Category loading failed or index missing.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [params.id]);

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
          <span>Accessing computational node...</span>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h3>Error: {error || "Index not found."}</h3>
        <button onClick={() => navigate("home")} className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Return Home
        </button>
      </div>
    );
  }

  // Calculate sum reading times
  const totalReadMinutes = category.topics.reduce((acc, curr) => {
    const mins = parseInt(curr.readTime) || 0;
    return acc + mins;
  }, 0);

  return (
    <div className="animate-fade-in" style={{ padding: "2rem 0 5rem 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        {/* Breadcrumb Back Navigation */}
        <button
          onClick={() => navigate("home")}
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
          onMouseEnter={(e) => (e.currentTarget.style.color = category.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ChevronLeft size={16} />
          Back to Core Hub
        </button>

        {/* Category Header Profile */}
        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${category.color}25`,
            boxShadow: `0 20px 40px -15px ${category.color}15`,
            background: `linear-gradient(180deg, rgba(15,17,26,0.9) 0%, rgba(10,11,16,0.95) 100%)`,
            marginBottom: "3rem",
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${category.color}15 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                className="badge"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                  border: `1px solid ${category.color}35`,
                  fontSize: "0.7rem",
                  padding: "0.3rem 0.8rem",
                }}
              >
                Category Module
              </span>
              <span
                className="badge"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.7rem",
                  padding: "0.3rem 0.8rem",
                }}
              >
                {category.difficulty} Index
              </span>
            </div>

            <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff" }}>
              {category.title}
            </h1>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "800px",
              }}
            >
              {category.description}
            </p>
          </div>
        </div>

        {/* Dashboard Content split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr",
            gap: "3rem",
          }}
          className="category-split"
        >
          {/* Left Column: Topics list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontFamily: "var(--font-heading)",
                borderBottom: "1px solid var(--border-light)",
                paddingBottom: "0.75rem",
                color: "#ffffff",
              }}
            >
              Curated Syllabus Topics
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {category.topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => navigate("topic", { categoryId: category.id, topicId: topic.id })}
                  className="glass-panel"
                  style={{
                    padding: "1.75rem",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = category.color;
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.boxShadow = `0 5px 15px ${category.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-light)";
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#ffffff",
                      }}
                    >
                      {topic.title}
                    </h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-light)",
                          fontSize: "0.65rem",
                        }}
                      >
                        {topic.difficulty}
                      </span>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: `${category.color}10`,
                          color: category.color,
                          fontSize: "0.65rem",
                        }}
                      >
                        {topic.readTime}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {topic.shortDesc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: category.color,
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      alignSelf: "flex-end",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>Step Into Lesson</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Statistics Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              className="glass-panel"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                border: "1px solid var(--border-light)",
                background: "rgba(15, 17, 26, 0.4)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-heading)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <BarChart2 size={16} color={category.color} />
                Module Parameters
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Stat block 1 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Total Topics</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.9rem" }}>
                    {category.topics.length}
                  </span>
                </div>

                {/* Stat block 2 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Estimated Duration</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.9rem" }}>
                    {totalReadMinutes} minutes
                  </span>
                </div>

                {/* Stat block 3 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Math Overhead</span>
                  <span style={{ color: category.color, fontWeight: "700", fontSize: "0.9rem" }}>
                    {category.difficulty === "Expert" ? "High" : "Moderate"}
                  </span>
                </div>
              </div>

              {/* Box info */}
              <div
                style={{
                  backgroundColor: `${category.color}05`,
                  border: `1px solid ${category.color}15`,
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.4",
                }}
              >
                This module uses interactive math modules. PyTorch simulations will be compiled client-side in the sandbox execution panel inside lessons.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 820px) {
          .category-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
