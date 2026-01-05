import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, Trash2, Link as LinkIcon, MousePointer2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LinkHistory = ({ history, onClear, onDelete }) => {
  if (history.length === 0) return null;

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="w-full max-w-2xl"
    >
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="bg-indigo-500/20 p-1.5 rounded-lg">
            <LinkIcon size={18} className="text-indigo-400" />
          </div>
          Recent Links
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="text-slate-500 hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors font-medium bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800"
        >
          <Trash2 size={14} /> Clear History
        </motion.button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {history.map((item, index) => (
            <motion.div
              key={item._id || item.urlCode || index}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              whileHover={{ y: -3, borderColor: "rgba(99, 102, 241, 0.4)" }}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex items-center justify-between group transition-colors shadow-lg"
            >
              <div className="truncate pr-4 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-indigo-400 font-bold truncate tracking-tight">
                    {item.shortUrl}
                  </p>
                  <span className="hidden group-hover:flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full uppercase font-bold animate-pulse">
                    <MousePointer2 size={10} /> {item.clicks || 0} Clicks
                  </span>
                </div>
                <p className="text-slate-500 text-xs truncate font-medium">
                  {item.longUrl}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyLink(item.shortUrl)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-indigo-400 transition-all border border-slate-700/50"
                  title="Copy Link"
                >
                  <Copy size={18} />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 rounded-xl text-indigo-400 hover:text-indigo-300 transition-all border border-indigo-500/20 flex items-center justify-center"
                  title="Open Link"
                >
                  <ExternalLink size={18} />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all border border-red-500/20 cursor-pointer z-20"
                  title="Delete Link"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LinkHistory;