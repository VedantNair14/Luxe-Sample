'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

  const current = content[theme];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <motion.div 
        key={theme}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          key={theme + "-text"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground/70 uppercase tracking-[0.3em] text-sm mb-6 block font-bold"
          >
            {current.tag}
          </motion.span>
          <h1 className={`text-6xl md:text-9xl font-bold text-foreground mb-8 tracking-tighter leading-none uppercase ${theme === 'boutique' ? 'font-serif lowercase' : ''}`}>
            {current.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            {current.desc}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90 rounded-none px-12 py-8 text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-12 py-8 text-sm uppercase tracking-widest transition-all">
              <Link href="/collections">Explore All</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/50 text-xs uppercase tracking-widest animate-bounce"
      >
        Scroll to discover
      </motion.div>
    </section>
  );
};

export default Hero;
