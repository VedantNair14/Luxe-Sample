'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: "Urban Essentials",
    tag: "Spring 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2560",
    link: "/shop?category=Men",
    desc: "A fusion of architectural precision and street-ready silhouettes."
  },
  {
    title: "Silk & Stone",
    tag: "High Summer",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2560",
    link: "/shop?category=Women",
    desc: "Fluid textures meeting raw mineral aesthetics."
  },
  {
    title: "Architectural Footwear",
    tag: "Core Line",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=2560",
    link: "/shop?category=Shoes",
    desc: "Engineered for movement, designed for the avant-garde."
  }
];

const CollectionsPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground pt-40 pb-32 transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.5, x: 0 }}
              className="text-[11px] uppercase tracking-[0.6em] mb-4 block font-bold"
            >
              The Archives / Vol. 01
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}
            >
              Curated <br /> Collections
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            className="text-xs uppercase tracking-[0.2em] font-medium max-w-xs text-right hidden md:block"
          >
            A definitive spectrum of luxury apparel, meticulously engineered for the discerning individual.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={col.link}>
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-8 shadow-2xl rounded-sm">
                  <Image 
                    src={col.image} 
                    alt={col.title} 
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="glass px-4 py-2 text-[9px] uppercase tracking-[0.3em] font-bold text-white shadow-xl backdrop-blur-md">
                      {col.tag}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-3xl font-bold uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500 ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
                      {col.title}
                    </h3>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 leading-relaxed max-w-xs group-hover:opacity-70 transition-opacity">
                    {col.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CollectionsPage;
