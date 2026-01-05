import React from 'react';
import { motion } from 'framer-motion';
import { Link2, RefreshCw, MousePointerClick, Globe, BarChart3, Scissors } from 'lucide-react';
import StatsCard from './StatsCard';
import LinkHistory from './LinkHistory';
import Features from './Features';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const MainContent = ({ 
  url, 
  setUrl, 
  customAlias,
  setCustomAlias,
  loading, 
  handleSubmit, 
  history, 
  clearHistory,
  handleDelete 
}) => {
  return (
    <main className="flex-grow flex flex-col items-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/10 blur-[140px] rounded-full -z-10 pointer-events-none select-none"></div>
      <section className="w-full max-w-4xl px-6 pt-32 md:pt-48 text-center mb-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            System Online - v4.0
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Shorten. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Track.</span> Manage.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Professional link management with deep analytics and lightning speed. 
            Experience the power of a developer-first URL platform.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-3xl mx-auto mb-20"
        >
          <form onSubmit={handleSubmit} className="relative group flex flex-col md:flex-row gap-4">
            
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500 z-10">
                <Link2 size={22} />
              </div>
              <input
                type="url"
                placeholder="Paste your long link here..."
                className="w-full h-16 md:h-20 pl-16 pr-6 rounded-2xl bg-[#0f172a] border border-slate-800 text-white text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 z-10">
                <span className="font-bold text-sm">/</span>
              </div>
              <input
                type="text"
                placeholder="alias"
                className="w-full h-16 md:h-20 pl-8 pr-4 rounded-2xl bg-[#0f172a] border border-slate-800 text-white text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xl"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                maxLength={20}
              />
            </div>

            <button
              disabled={loading}
              className="h-16 md:h-20 bg-indigo-600 hover:bg-indigo-500 px-8 rounded-2xl text-white font-bold text-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg min-w-[140px]"
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={24} />
              ) : (
                <>
                  <span>Shorten</span>
                  <Scissors size={20} className="hidden md:block" />
                </>
              )}
            </button>
          </form>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <StatsCard 
            icon={MousePointerClick} 
            label="Total Clicks" 
            value={history.length > 0 ? "4.2k" : "0"} 
          />
          <StatsCard 
            icon={Globe} 
            label="Top Region" 
            value={history.length > 0 ? "US / EU" : "N/A"} 
          />
          <StatsCard 
            icon={BarChart3} 
            label="Avg. CTR" 
            value={history.length > 0 ? "18.4%" : "0%"} 
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="flex justify-center"
        >
          <LinkHistory 
            history={history} 
            onClear={clearHistory} 
            onDelete={handleDelete} 
          />
        </motion.div>
      </section>

      <section id="features" className="w-full bg-slate-950/50 border-y border-slate-900">
        <Features />
      </section>

      <section id="pricing" className="w-full">
        <Pricing />
      </section>

      <section id="faq" className="w-full">
        <FAQ />
      </section>

      <section className="w-full">
        <CTA />
      </section>

    </main>
  );
};

export default MainContent;