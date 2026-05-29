import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import { Loader, Layers } from "lucide-react";

export default function Home({ navigate, onSearchClick }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
      {/* Landing Hero Area */}
      <Hero navigate={navigate} onSearchClick={onSearchClick} />

      {/* Main Grid Explorations */}
      <section
        id="explore-modules"
        style={{
          padding: "4rem 0 6rem 0",
          backgroundColor: "rgba(10, 11, 16, 0.3)",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              alignItems: "center",
            }}
            className="animate-slide-up"
          >
            <div
              className="badge"
              style={{
                background: "rgba(6, 182, 212, 0.08)",
                color: "var(--accent)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                padding: "0.25rem 0.75rem",
                width: "fit-content",
              }}
            >
              Curated Curriculum
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800" }}>Explore Computational Subfields</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", fontSize: "0.95rem" }}>
              Select a specialized intelligence framework below to step through training schedules, causal sequences, and advantage estimations.
            </p>
          </div>

          {/* Skeleton Loaders or Content Grid */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {[1, 2, 3, 4].map((loaderId) => (
                <div
                  key={loaderId}
                  className="glass-panel"
                  style={{
                    height: "260px",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        animation: "pulse 1.5s infinite alternate",
                      }}
                    />
                    <div
                      style={{
                        width: "60%",
                        height: "20px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        animation: "pulse 1.5s infinite alternate",
                      }}
                    />
                    <div
                      style={{
                        width: "90%",
                        height: "14px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        animation: "pulse 1.5s infinite alternate",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "var(--border-light)",
                    }}
                  />
                  <div
                    style={{
                      width: "30%",
                      height: "12px",
                      borderRadius: "4px",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      animation: "pulse 1.5s infinite alternate",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
              className="animate-slide-up"
            >
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
