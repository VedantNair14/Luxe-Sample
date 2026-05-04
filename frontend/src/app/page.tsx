'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ProductCarousel from '@/components/ProductCarousel';
import EditorialMarquee from '@/components/EditorialMarquee';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealOnScroll, ParallaxSection } from '@/components/RevealOnScroll';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      <Hero />
      
      <RevealOnScroll delay={0.2}>
        <ProductCarousel />
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <ProductGrid title="Featured Collection" />
      </RevealOnScroll>
      
      <EditorialMarquee text="LUXE COLLECTION 2026 • ESSENTIAL SILHOUETTES • TIMLESS LUXURY • " />

      <section ref={containerRef} className="py-40 bg-background overflow-hidden relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 md:gap-32 items-center">
          <RevealOnScroll direction="left" distance={50}>
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-50 mb-8 block font-black">The Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-10 leading-[0.85] tracking-tighter">
                Crafting <br /> <span className="text-primary/50 italic font-serif lowercase tracking-normal">Excellence</span>
              </h2>
              <p className="opacity-70 mb-14 max-w-md leading-relaxed text-sm md:text-base font-medium tracking-wide">
                Founded in 2026, Luxe was born from a desire to create garments that transcend trends. We believe in the power of minimalism and the integrity of premium materials. Each piece is a testament to the art of subtraction.
              </p>
              <button className="group relative w-fit px-10 py-5 border border-foreground/20 uppercase text-[10px] tracking-[0.4em] font-bold overflow-hidden transition-all hover:border-foreground">
                <span className="relative z-10">Read Our Story</span>
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500">Read Our Story</span>
              </button>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll direction="right" distance={50} delay={0.2}>
            <div className="order-1 md:order-2 h-[70vh] w-full bg-accent/5 overflow-hidden relative group">
              <motion.div style={{ y, height: "120%" }} className="absolute -top-[10%] -bottom-[10%] left-0 right-0">
                <Image 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500" 
                  alt="Brand Story" 
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  quality={90}
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <footer className="bg-background py-32 border-t border-border">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-8">Luxe</h3>
            <p className="opacity-50 text-sm leading-relaxed max-w-xs">
              A global collective dedicated to the art of premium apparel and timeless expression.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-40">Shop</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:opacity-50 transition-all">New Arrivals</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">Best Sellers</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">Collections</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">Archives</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-40">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:opacity-50 transition-all">Shipping & Returns</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">Size Guide</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-50 transition-all">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-40">Newsletter</h4>
            <p className="text-sm opacity-60 mb-6">Join our elite circle for exclusive drops and early access.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-accent/10 border-none px-6 py-4 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary outline-none"
              />
              <button className="bg-primary text-primary-foreground px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold">© 2026 Luxe Clothing. Built for the 0.01%.</p>
          <div className="flex gap-10 text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold">
            <a href="#" className="hover:opacity-100 transition-all">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-all">Terms</a>
            <a href="#" className="hover:opacity-100 transition-all">Sustainability</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
