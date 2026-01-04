import React from "react";
import { X, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-indigo-500/10 mb-2">
              <Lock className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Unlock Unlimited Links
              </h2>
              <p className="text-slate-400">
                You've reached the free limit. Sign in to create unlimited short
                links and track detailed analytics.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                Continue with Google <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-transparent hover:bg-slate-800 text-slate-300 rounded-xl font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
