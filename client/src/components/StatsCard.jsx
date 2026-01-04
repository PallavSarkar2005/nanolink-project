import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const StatsCard = ({ icon: Icon, label, value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (latest) => 
    latest.toFixed(numericValue % 1 === 0 ? 0 : 1) + suffix
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(numericValue);
    }
  }, [isInView, numericValue, springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 } 
      }}
      className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm group hover:border-indigo-500/50 transition-all cursor-default shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="flex items-center gap-4">
        <motion.div 
          animate={isInView ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0] 
          } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-indigo-600/10 p-3 rounded-2xl text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
        >
          <Icon size={24} />
        </motion.div>

        <div className="text-left">
          <p className="text-slate-500 text-sm font-medium mb-0.5 group-hover:text-slate-400 transition-colors">
            {label}
          </p>
          <motion.h3 className="text-2xl font-bold text-white tracking-tight">
            {isNaN(numericValue) ? value : <motion.span>{displayValue}</motion.span>}
          </motion.h3>
        </div>
      </div>
      <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 opacity-30"
        />
      </div>
    </motion.div>
  );
};

export default StatsCard;