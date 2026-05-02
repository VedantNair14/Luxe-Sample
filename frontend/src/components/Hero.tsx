'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();

  const content = {
    luxury: {
      tag: "New Collection 2026",
      title: "Elevate Your Essentials",
      desc: "Discover a curated collection of premium garments designed for the modern individual. Quality meets timeless luxury.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
    },
    streetwear: {
      tag: "Limited Drop // V2",
      title: "REDEFINE THE STREETS",
      desc: "Bold patterns, oversized fits, and uncompromising attitude. The new standard for urban expression.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000"
    },
    boutique: {
      tag: "Artisanal Elegance",
      title: "The Poetry of Fabric",
      desc: "Soft textures, organic dyes, and silhouettes that tell a story. Experience fashion as art.",
      image: "https://images.unsplash.com/photo-1445205170230-053b830c6039?q=80&w=2070"
    }
  };

  const current = content[theme as keyof typeof content];

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Cinematic Parallax */}
      <motion.div 
        key={theme}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.7, scale: 1.05 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={current.image}
          alt={current.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          key={theme + "-text"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 0.6, letterSpacing: "0.4em" }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-foreground uppercase text-[10px] mb-8 block font-bold"
          >
            {current.tag}
          </motion.div>
          
          <h1 className={`text-7xl md:text-[10rem] font-bold text-foreground mb-10 tracking-[1.5rem] leading-none uppercase mix-blend-difference drop-shadow-2xl ${theme === 'boutique' ? 'font-serif lowercase tracking-normal' : ''}`}>
            {current.title}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-2xl text-foreground mb-16 font-light max-w-3xl mx-auto leading-relaxed tracking-wide"
          >
            {current.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10"
          >
            <Link 
              href="/shop" 
              className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-16 py-10 text-xs uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] font-black overflow-hidden"
            >
              <span className="relative z-10">Discover Collection</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link 
              href="/collections" 
              className="group inline-flex items-center justify-center border border-foreground/20 text-foreground hover:border-foreground px-16 py-10 text-xs uppercase tracking-[0.4em] transition-all font-bold backdrop-blur-sm"
            >
              The Archives
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] uppercase tracking-[0.5em]">Scroll Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-foreground to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
