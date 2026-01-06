import React, { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import AuthModal from "./components/AuthModal";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [history, setHistory] = useState([]);
  
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalLinks: 0,
    topLinkAlias: "N/A",
    topLinkClicks: 0
  });

  const { user, token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user && token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          
          const linksRes = await axios.get("https://nanolink-api.onrender.com/api/urls/my-links", config);
          setHistory(linksRes.data);

          const statsRes = await axios.get("https://nanolink-api.onrender.com/api/urls/stats", config);
          setStats(statsRes.data);

        } catch (err) {
          if (err.response && err.response.status === 401) {
            if (logout) logout();
          }
          console.error("Failed to fetch data");
        }
      } else {
        setHistory([]);
        setStats({ totalClicks: 0, totalLinks: 0, topLinkAlias: "N/A", topLinkClicks: 0 });
      }
    };

    fetchData();
  }, [user, token, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return toast.error("Please paste a link first!");

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
       formattedUrl = 'https://' + formattedUrl;
    }
    try {
        new URL(formattedUrl);
    } catch (err) {
        return toast.error("Invalid URL. Please check spelling.");
    }

    setLoading(true);
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const res = await axios.post('https://nanolink-api.onrender.com/api/urls/shorten', { 
        longUrl: formattedUrl,
        customAlias: customAlias 
      }, config);
      
      setHistory((prev) => [res.data, ...prev]);
      
      setStats(prev => ({ ...prev, totalLinks: prev.totalLinks + 1 }));

      setUrl("");
      setCustomAlias("");
      toast.success("Link shortened successfully!");
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Please login again.");
        if (logout) logout();
      } else {
        toast.error(err.response?.data?.message || "Server is offline.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!id) return;
    if(!confirm("Are you sure you want to delete this link?")) return;

    try {
      await axios.delete(`https://nanolink-api.onrender.com/api/urls/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHistory((prev) => prev.filter((link) => link._id !== id));
      
      setStats(prev => ({ ...prev, totalLinks: prev.totalLinks - 1 }));
      
      toast.success("Link deleted!");

    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Session expired.");
        if (logout) logout();
      } else {
        console.error("Delete Error:", err);
        toast.error(err.response?.data?.message || "Failed to delete link");
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("History cleared locally");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Toaster
        position="bottom-center"
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
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
        loading={loading}
        handleSubmit={handleSubmit}
        history={history}
        handleDelete={handleDelete}
        clearHistory={clearHistory}
        stats={stats} 
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