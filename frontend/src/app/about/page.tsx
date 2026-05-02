'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
      <Navbar />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6 block font-bold">The Manifesto</span>
          <h1 className={`text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
            Beyond the <br /> Threads
          </h1>
          <div className="aspect-video bg-accent/5 overflow-hidden mb-16 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
              alt="About Luxe" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-16 text-left">
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">Our Philosophy</h2>
              <p className="opacity-70 leading-relaxed text-lg">
                We don&apos;t just sell clothing; we curate identities. At Luxe, every stitch is a statement of intent. We believe that what you wear is the most immediate form of communication.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">The Craft</h2>
              <p className="opacity-70 leading-relaxed text-lg">
                Working with artisans globally, we source the finest natural fibers and utilize ethical manufacturing processes. Quality is our only metric for success.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;
