import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import AuthModal from "./components/AuthModal";
import { shortenUrl } from "./api/urlApi";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("nanolink_history");
      if (!saved || saved === "undefined") return [];
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("nanolink_history", JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usageCount >= 5) {
      setShowAuthModal(true);
      return;
    }
    if (!url) return toast.error("Please paste a link first!");

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!urlPattern.test(url)) return toast.error("Please enter a valid URL");
    setLoading(true);
    try {
      const data = await shortenUrl(url);
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.longUrl !== url);
        return [data, ...filtered].slice(0, 5);
      });
      setUsageCount((prev) => prev + 1);
      toast.success("Link shortened successfully!");
      setUrl("");
    } catch (err) {
      toast.error(err.message || "Server is offline.");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("Clear your link history?")) {
      setHistory([]);
      localStorage.removeItem("nanolink_history");
      toast.success("History cleared");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Toast Notification Config */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
            borderRadius: "16px",
          },
        }}
      />

      <Navbar onAuthClick={() => setShowAuthModal(true)} />
      <MainContent
        url={url}
        setUrl={setUrl}
        loading={loading}
        handleSubmit={handleSubmit}
        history={history}
        clearHistory={clearHistory}
      />

      <Footer />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default App;
