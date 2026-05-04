'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  className?: string;
}

export const RevealOnScroll = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.8,
  className = '',
}: RevealOnScrollProps) => {
  const getInitialProps = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({ 
  children, 
  speed = 0.1,
  className = '' 
}: { 
  children: React.ReactNode, 
  speed?: number,
  className?: string 
}) => {
  return (
    <motion.div
      style={{ y: 0 }}
      whileInView={{ y: [-20 * speed, 20 * speed] }}
      transition={{ ease: "linear" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
