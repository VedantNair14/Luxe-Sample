'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  children?: string;
  text?: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const SplitText = ({ children, text, className, delay = 0, stagger = 0.05 }: SplitTextProps) => {
  const content = text || children || "";
  const words = content.split(" ");

  return (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.2em] py-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: delay + (i * stagger), 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default SplitText;
