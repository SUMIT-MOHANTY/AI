import React, { useState, useEffect } from "react";
import { Terminal, Search, Menu, X, Sparkles, BookOpen, Eye, Cpu, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onSearchClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentPage = location.pathname === "/" ? "home" : "";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/systems", label: "System Specs" },
  ];

  return (
    <nav
      className={`glass-panel`}
      style={{
        position: "sticky",
        top: 0,
        left: "0",
        right: "0",
        width: "100%",
        zIndex: 100,
        padding: "1rem 4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        borderRadius: "0px",
        borderBottom: "1px solid var(--border-light)",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        boxShadow: scrolled ? "0 10px 30px rgba(9, 10, 16, 0.8)" : "none",
      }}
    >
      {/* Brand Logo */}
      <div
        onClick={() => {
          navigate("/");
          setIsOpen(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px var(--primary-glow)",
          }}
        >
          <Terminal size={18} color="#ffffff" />
        </div>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #ffffff, var(--text-muted))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          NEURA<span style={{ color: "var(--accent)" }}>LEARN</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div
        style={{
          display: "none",
          alignItems: "center",
          gap: "1.5rem",
        }}
        className="desktop-menu"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                background: "none",
                border: "none",
                color: isActive ? "var(--text-main)" : "var(--text-muted)",
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: "0.95rem",
                fontWeight: "500",
                position: "relative",
                padding: "0.5rem 0.25rem",
                transition: "var(--transition-smooth)",
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    borderRadius: "9999px",
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Global Search Shortcut Toggle */}
        <button
          onClick={onSearchClick}
          className="glass-input"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            cursor: "pointer",
            width: "160px",
            border: "1px solid var(--border-light)",
            transition: "var(--transition-smooth)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
        >
          <Search size={14} />
          <span>Fuzzy Search</span>
          <kbd
            style={{
              marginLeft: "auto",
              fontSize: "0.7rem",
              background: "rgba(255,255,255,0.08)",
              padding: "0.1rem 0.4rem",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Hamburger Menu Toggle (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-main)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="mobile-toggle"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: "0",
            right: "0",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.id);
                setIsOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: currentPage === item.id ? "var(--accent)" : "var(--text-main)",
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                fontWeight: "500",
                textAlign: "left",
                padding: "0.5rem 0",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onSearchClick();
            }}
            className="btn btn-secondary"
            style={{
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Search size={16} />
            Search Database
          </button>
        </div>
      )}

      {/* CSS styling for Responsive Menu toggling */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
