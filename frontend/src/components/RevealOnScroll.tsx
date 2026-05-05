'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
}

export const RevealOnScroll = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.85,
  className = '',
}: RevealOnScrollProps) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':    return { y: distance, opacity: 0 };
      case 'down':  return { y: -distance, opacity: 0 };
      case 'left':  return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      case 'none':  return { opacity: 0 };
      default:      return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Fixed ParallaxSection using proper useScroll ──────────────────────────────
export const ParallaxSection = ({
  children,
  speed = 0.2,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80 * speed, 80 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};
