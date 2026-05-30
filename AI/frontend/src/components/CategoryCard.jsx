import React from "react";
import { Sparkles, BookOpen, Eye, Cpu, ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles size={22} />;
      case "BookOpen":
        return <BookOpen size={22} />;
      case "Eye":
        return <Eye size={22} />;
      case "Cpu":
        return <Cpu size={22} />;
      default:
        return <BookOpen size={22} />;
    }
  };

  return (
    <div
      onClick={() => navigate(`/category/${category.id}`)}
      className="glass-panel glass-panel-hover"
      style={{
        padding: "2rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        justifyContent: "space-between",
        border: "1px solid var(--border-light)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = category.color;
        e.currentTarget.style.boxShadow = `0 12px 30px -10px ${category.color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-light)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Ambient background glow inside the card matching category color */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${category.color}20 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Category Icon & Difficulty Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${category.color}35`,
            }}
          >
            {getIcon(category.icon)}
          </div>
          <span
            className="badge"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-light)",
              padding: "0.2rem 0.6rem",
              fontSize: "0.7rem",
            }}
          >
            {category.difficulty}
          </span>
        </div>

        {/* Title and Short Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              fontFamily: "var(--font-heading)",
              color: "#ffffff",
            }}
          >
            {category.title}
          </h3>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {category.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer: Topics Count & Action Link */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border-light)",
          paddingTop: "1rem",
          marginTop: "1rem",
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "var(--text-dark)", fontWeight: "600" }}>
          {category.topics.length} {category.topics.length === 1 ? "TOPIC" : "TOPICS"}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            color: category.color,
            fontSize: "0.85rem",
            fontWeight: "600",
            fontFamily: "var(--font-heading)",
          }}
        >
          <span>Explore</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  );
}
