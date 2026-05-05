'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none">LUXE</h2>
          </div>

          <div className="relative z-10 w-full max-w-sm px-10">
            <div className="flex justify-between items-end mb-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40"
              >
                Curating Elegance
              </motion.span>
              <span className="text-4xl font-black tabular-nums tracking-tighter">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-[2px] w-full bg-accent/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="mt-8 overflow-hidden h-6">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: progress > 30 ? (progress > 70 ? "-200%" : "-100%") : "0%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11px] uppercase tracking-[0.3em] font-black text-center"
              >
                Initialising Silhouettes
                <br />
                Weaving Textile Physics
                <br />
                Spectrum Discovered
              </motion.p>
            </div>
          </div>

          {/* Reveal Background */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full bg-accent/5 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
