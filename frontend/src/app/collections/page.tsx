'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: "Urban Essentials",
    tag: "Spring 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    link: "/shop?category=Men"
  },
  {
    title: "Silk & Stone",
    tag: "High Summer",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
    link: "/shop?category=Women"
  },
  {
    title: "Architectural Footwear",
    tag: "Core Line",
    image: "https://images.unsplash.com/photo-1635397174444-123456789abc?q=80&w=1000",
    link: "/shop?category=Shoes"
  }
];

const CollectionsPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
      <Navbar />
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-3 block font-bold">The Archives</span>
          <h1 className={`text-6xl md:text-8xl font-bold uppercase tracking-tighter ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
            Our Collections
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={col.link}>
                <div className="relative aspect-[4/5] overflow-hidden bg-accent/5 mb-6 shadow-xl">
                  <img 
                    src={col.image} 
                    alt={col.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2 block">{col.tag}</span>
                    <h3 className={`text-2xl font-bold uppercase tracking-tighter ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
                      {col.title}
                    </h3>
                  </div>
                  <div className="p-4 rounded-full border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
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
