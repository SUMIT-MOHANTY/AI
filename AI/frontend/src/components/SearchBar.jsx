import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader, CornerDownLeft, Sparkles, BookOpen, Eye, Cpu } from "lucide-react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search logic with API delay simulation
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const data = await api.searchTopics(query);
        setResults(data);
        setSelectedIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item) => {
    onClose();
    navigate(`/topic/${item.topicId}`);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles size={16} />;
      case "BookOpen": return <BookOpen size={16} />;
      case "Eye": return <Eye size={16} />;
      case "Cpu": return <Cpu size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  if (!isOpen) return null;

  const quickChips = ["Transformers", "Diffusion", "Attention", "PPO", "U-Net", "Decoder"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(6, 7, 11, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        zIndex: 1000,
      }}
      className="animate-fade-in"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: "90%",
          maxWidth: "650px",
          maxHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          boxShadow: "0 25px 60px -15px rgba(99, 102, 241, 0.25)",
        }}
      >
        {/* Search Input Area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border-light)",
            gap: "1rem",
            position: "relative",
          }}
        >
          {loading ? (
            <Loader
              size={20}
              className="glow-text"
              style={{
                color: "var(--accent)",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <Search size={20} color="var(--text-muted)" />
          )}

          <input
            ref={inputRef}
            type="text"
            placeholder="Type neural concepts, algorithms, frameworks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-main)",
              fontSize: "1.1rem",
              fontFamily: "var(--font-body)",
              flex: 1,
              outline: "none",
            }}
          />

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "var(--transition-smooth)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-main)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Chips & Info */}
        {!query && (
          <div style={{ padding: "1.5rem" }} className="animate-slide-up">
            <h5
              style={{
                color: "var(--text-dark)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
              }}
            >
              Popular Explorations
            </h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="glass-input"
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    border: "1px solid var(--border-light)",
                    transition: "var(--transition-smooth)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
                >
                  #{chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Area */}
        {query && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}>
            {results.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span
                  style={{
                    color: "var(--text-dark)",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Search Results ({results.length})
                </span>

                {results.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={`${item.categoryId}-${item.topicId}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        backgroundColor: isSelected ? "rgba(99, 102, 241, 0.12)" : "transparent",
                        border: isSelected ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontWeight: "600",
                              fontSize: "0.95rem",
                              color: isSelected ? "var(--text-main)" : "rgba(255,255,255,0.9)",
                            }}
                          >
                            {item.topicTitle}
                          </span>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: `${item.categoryColor}15`,
                              color: item.categoryColor,
                              border: `1px solid ${item.categoryColor}30`,
                              fontSize: "0.65rem",
                              padding: "0.1rem 0.5rem",
                            }}
                          >
                            {item.categoryTitle}
                          </span>
                        </div>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.8rem",
                            lineHeight: "1.4",
                            maxWidth: "480px",
                          }}
                        >
                          {item.topicShortDesc}
                        </p>
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            color: "var(--primary)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          <span>Open</span>
                          <CornerDownLeft size={12} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              !loading && (
                <div
                  style={{
                    padding: "3rem 1.5rem",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <Search size={32} style={{ opacity: 0.3 }} />
                  <span>No computational nodes found matching query. Try another term.</span>
                </div>
              )
            )}
          </div>
        )}

        {/* Modal Footer Hotkey Help */}
        <div
          style={{
            padding: "0.65rem 1.25rem",
            backgroundColor: "rgba(25, 27, 38, 0.4)",
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "var(--text-dark)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <span><kbd>↑↓</kbd> Navigation</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <span>Indexing 10+ core AI systems</span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
