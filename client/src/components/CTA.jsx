import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
        />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-yellow-300" />
            <span>Join 10,000+ users today</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Ready to shorten your <br />
            <span className="text-indigo-200">first link?</span>
          </h2>
          
          <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the power of lightning-fast redirects and deep analytics. 
            No credit card required.
          </p>
          
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center gap-3 mx-auto shadow-2xl"
          >
            Get Started Now
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;