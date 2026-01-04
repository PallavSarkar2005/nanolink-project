import React, { useState } from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: <Zap className="text-slate-400" />,
      price: "0",
      desc: "Perfect for side projects",
      features: ["5 links / month", "Basic Analytics", "7-day history", "Standard support"],
      button: "Start for free",
      featured: false
    },
    {
      name: "Pro",
      icon: <Shield className="text-indigo-400" />,
      price: isYearly ? "12" : "15",
      desc: "For serious creators",
      features: ["Unlimited links", "Advanced Analytics", "Lifetime history", "Priority support", "Custom aliases"],
      button: "Get Started",
      featured: true
    },
    {
      name: "Enterprise",
      icon: <Crown className="text-amber-400" />,
      price: "49",
      desc: "Scale your business",
      features: ["Team collaboration", "API Access", "Custom domains", "Dedicated manager", "White-label links"],
      button: "Contact Sales",
      featured: false
    }
  ];

  return (
    <section id="pricing" className="w-full max-w-7xl mx-auto px-6 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
        <p className="text-slate-400 mb-8">Choose the plan that's right for you.</p>
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 bg-slate-800 rounded-full relative p-1 transition-colors hover:bg-slate-700"
          >
            <motion.div 
              animate={{ x: isYearly ? 28 : 0 }}
              className="w-5 h-5 bg-indigo-500 rounded-full"
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-white' : 'text-slate-500'}`}>
            Yearly <span className="text-indigo-400 text-xs font-bold ml-1">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-3xl border ${
              plan.featured 
                ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' 
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-800 rounded-lg">{plan.icon}</div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            </div>
            
            <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
            
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">${plan.price}</span>
              <span className="text-slate-500 ml-2">/ month</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-indigo-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.featured 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}>
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;