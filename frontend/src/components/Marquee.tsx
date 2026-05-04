'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const text = "REDEFINING LUXURY • CURATED FOR THE ELITE • TIMELESS ELEGANCE • UNCOMPROMISING QUALITY • ";
  
  return (
    <section className="w-full bg-foreground text-background py-6 overflow-hidden flex whitespace-nowrap border-y border-neutral-800">
      <motion.div
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex"
      >
        <span className="text-2xl md:text-4xl font-serif italic tracking-widest px-8">
          {text}
        </span>
        <span className="text-2xl md:text-4xl font-serif italic tracking-widest px-8">
          {text}
        </span>
        <span className="text-2xl md:text-4xl font-serif italic tracking-widest px-8">
          {text}
        </span>
        <span className="text-2xl md:text-4xl font-serif italic tracking-widest px-8">
          {text}
        </span>
      </motion.div>
    </section>
  );
};

export default Marquee;
