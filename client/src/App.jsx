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

  // 1. Get the Token from Context
  const { user, token } = useContext(AuthContext);

  // 2. Fetch Links (Auto-Authenticates via Headers usually, or we add it)
  useEffect(() => {
    const fetchLinks = async () => {
      if (user && token) {
        try {
          // Note: If your axios is not globally configured, we need headers here too usually.
          // But for now, let's assume getMyLinks works because it's a GET request
          // likely handled by global headers or simple cookie logic if you used cookies.
          // If GET works, we leave it. If GET fails, we add headers here too.
          const res = await axios.get("http://localhost:5000/api/urls/my-links", {
            headers: { Authorization: `Bearer ${token}` } // <--- Added Header just in case
          });
          setHistory(res.data);
        } catch (err) {
          console.error("Failed to fetch links");
        }
      } else {
        setHistory([]);
      }
    };

    fetchLinks();
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return toast.error("Please paste a link first!");

    // Basic Validation
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
      // 3. Create Link (Needs Header if protected, or public if not)
      // We will add the header just to be safe if the user is logged in
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const res = await axios.post('http://localhost:5000/api/urls/shorten', { 
        longUrl: formattedUrl,
        customAlias: customAlias 
      }, config);
      
      setHistory((prev) => [res.data, ...prev]);
      setUrl("");
      setCustomAlias("");
      toast.success("Link shortened successfully!");
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Server is offline.");
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE LINK (The Fix)
  const handleDelete = async (id) => {
    if(!id) return;
    if(!confirm("Are you sure you want to delete this link?")) return;

    // --- DEBUGGING ---
    console.log("Deleting ID:", id);
    console.log("Using Token:", token); 
    // If token is null in console, you need to Login again!

    try {
      // THE FIX: We explicitly send the token here 👇
      await axios.delete(`http://localhost:5000/api/urls/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      });

      // Remove from UI
      setHistory((prev) => prev.filter((link) => link._id !== id));
      toast.success("Link deleted!");

    } catch (err) {
      console.error("Delete Error:", err);
      // Show the exact reason from the server
      toast.error(err.response?.data?.message || "Failed to delete link");
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