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
      icon: <ShieldCheck className="text-green-400" />,
      title: "Secure & Private",
      desc: "Every link is scanned for malware. We never sell your click data to third parties."
    },
    {
      icon: <Activity className="text-indigo-400" />,
      title: "99.9% Uptime",
      desc: "Built on redundant infrastructure to ensure your links never go dark."
    },
    {
      icon: <Lock className="text-red-400" />,
      title: "Encrypted Links",
      desc: "Industry-standard SSL encryption for every shortened URL generated."
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm bg-indigo-500/10 px-3 py-1 rounded-full">
              Why NanoLink?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-4">
              Reliability you can <br /> 
              <span className="text-indigo-500">count on.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mt-6">
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5 }} // Small hover interaction
                className="space-y-3 group p-4 rounded-2xl transition-colors hover:bg-slate-900/50"
              >
                <div className="bg-slate-900 w-fit p-3 rounded-xl border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                  {f.icon}
                </div>
                <h4 className="text-white font-bold group-hover:text-indigo-400 transition-colors">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full animate-pulse"></div>
          
          <div className="relative bg-slate-900 border border-slate-800 p-2 rounded-3xl overflow-hidden shadow-2xl group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1551288049-bb848a4f691f?q=80&w=2070&auto=format&fit=crop" 
              alt="Analytics Dashboard Preview"
              className="rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 bg-slate-950/90 border border-slate-700 backdrop-blur-md p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-ping"></div>
                <div>
                  <p className="text-indigo-400 font-bold text-2xl">10M+</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Links Processed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;