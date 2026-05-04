'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ text, className = "", delay = 0, stagger = 0.05 }) => {
  const characters = text.split('');

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + index * stagger,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
