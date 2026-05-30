import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Routes, Route } from 'react-router-dom'

// Import page views
import Home from "./pages/Home";
import Category from "./pages/Category";
import Topic from "./pages/Topic";
import About from "./pages/About";
import Systems from "./pages/Systems";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentParams, setCurrentParams] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global routing coordinator
  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setCurrentParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard shortcut listener for fuzzy finder search toggling (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  // Custom Page Switch router mapping
  // const renderCurrentPage = () => {
  //   switch (currentPage) {
  //     case "home":
  //       return <Home navigate={navigate} onSearchClick={() => setIsSearchOpen(true)} />;
  //     case "category":
  //       return <Category params={currentParams} navigate={navigate} />;
  //     case "topic":
  //       return <Topic params={currentParams} navigate={navigate} />;
  //     case "about":
  //       return <About navigate={navigate} />;
  //     default:
  //       return <Home navigate={navigate} onSearchClick={() => setIsSearchOpen(true)} />;
  //   }
  // };

  return (
    <>
      {/* Dynamic Animated Grid background canvas */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.04) 0%, transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.003) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.003) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Primary Shell Container */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative", zIndex: 2 }}>

        {/* Floating Navbar */}
        <Navbar
          currentPage={currentPage}
          navigate={navigate}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        {/* Dynamic Route Content Wrapper */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onSearchClick={() => setIsSearchOpen(true)}
                />
              }
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/systems"
              element={<Systems />}
            />

            <Route
              path="/category/:id"
              element={<Category />}
            />

            <Route
              path="/topic/:id"
              element={<Topic />}
            />
          </Routes>
        </main>
        {/* Global Modal Search Overlay */}
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          navigate={navigate}
        />

        {/* Multi-column Footer */}
        <Footer navigate={navigate} />
      </div>
    </>
  );
}
