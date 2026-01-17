import React from 'react';
import { ShieldCheck, Zap, Activity, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-yellow-400" />,
      title: "Lightning Fast",
      desc: "Our globally distributed edge network ensures redirects happen in under 50ms."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Secure & Private",
      desc: "Every link is scanned for malware. We never sell your click data to third parties."
    },
    {
      icon: <Activity className="text-blue-400" />,
      title: "99.9% Uptime",
      desc: "Built on redundant infrastructure to ensure your links never go dark."
    },
    {
      icon: <Lock className="text-rose-400" />,
      title: "Encrypted Links",
      desc: "Industry-standard SSL encryption for every shortened URL generated."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-slate-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-xs bg-indigo-950/30 border border-indigo-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Why NanoLink?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mt-6 tracking-tight">
              Reliability you can <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                count on.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mt-6 max-w-lg">
              In the world of link management, speed and trust are everything. 
              NanoLink is built with a developer-first mindset, focusing on high-availability 
              architecture and real-time security scanning.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                className="space-y-3 group p-5 rounded-2xl border border-transparent hover:border-slate-800 transition-all duration-300"
              >
                <div className="bg-slate-900/80 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-800 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all">
                  {React.cloneElement(f.icon, { size: 20 })}
                </div>
                <h4 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative lg:h-full flex items-center"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] opacity-20 blur-2xl animate-pulse"></div>
          
          <div className="relative w-full aspect-square lg:aspect-[4/5] bg-slate-950 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
            
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              src="https://as1.ftcdn.net/jpg/06/28/73/58/1000_F_628735834_wAJZ7QAxK0q4Jpuz9LhncarmTkDUwUYq.jpg" 
              alt="Analytics Dashboard Preview"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-8 right-8 bg-slate-950/80 border border-slate-700/50 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-sm opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative h-3 w-3 bg-green-400 rounded-full border border-green-200"></div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-2xl tracking-tight">10M+</p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Links Securely Routed</p>
                  </div>
                </div>
                <Activity className="text-slate-600 w-8 h-8 opacity-50" />
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;