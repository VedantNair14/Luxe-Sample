'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground p-6">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h1 className="text-[15rem] md:text-[25rem] font-black uppercase tracking-tighter opacity-5 leading-none select-none">
          404
        </h1>
        <div className="relative -mt-32 md:-mt-60">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Lost in the Void
          </h2>
          <p className="opacity-50 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The silhouette you're searching for has vanished into the archives.
          </p>
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-16 py-8 text-xs uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 font-black overflow-hidden shadow-2xl"
          >
            <span className="relative z-10">Back to Collection</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </motion.div>
      
      <div className="absolute bottom-12 left-12 opacity-20 text-[10px] uppercase tracking-[0.5em] font-bold">
        Luxe / Error Module 001
      </div>
    </main>
  );
}
