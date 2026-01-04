import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`border-b border-slate-800 transition-colors ${isOpen ? 'bg-slate-900/30' : ''} rounded-xl px-4`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-indigo-400' : 'text-white group-hover:text-indigo-300'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full bg-slate-800 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : 'text-slate-500'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed pl-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Is NanoLink free to use?", answer: "Yes! Our core link shortening service is 100% free for everyone. No hidden subscriptions for basic shortening." },
    { question: "Do my links ever expire?", answer: "Never. Once you create a link with NanoLink, it stays active forever in our database unless you manually delete it." },
    { question: "Can I track how many people clicked my link?", answer: "Absolutely. Every link comes with a real-time click counter. You can view your recent links' performance right in the dashboard." },
    { question: "Is there a limit to how many links I can create?", answer: "For individual users, there are no strict limits. We encourage fair usage to keep the platform fast for everyone." }
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
          <HelpCircle size={16} />
          <span>Support Center</span>
        </div>
        <h2 className="text-4xl font-bold text-white">Common Questions</h2>
        <p className="text-slate-500 mt-4">Everything you need to know about the platform.</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} index={i} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;