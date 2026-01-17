import React, { useContext } from "react";
import { Github, Link2, LogOut, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onAuthClick }) => {
  const { user, logout } = useContext(AuthContext);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const footer = document.getElementById("contact-footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div 
          onClick={scrollToTop} 
          className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer"
        >
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            NanoLink
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button 
              onClick={scrollToTop} 
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <a 
              href="#pricing" 
              className="hover:text-white transition-colors"
            >
              Pricing
            </a>
            <button 
              onClick={scrollToContact} 
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/PallavSarkar2005"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {user ? (
              <div className="flex items-center gap-4 pl-2">
                <div className="flex items-center gap-2 text-slate-200 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;