'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      <Hero />
      <ProductGrid title="Featured Collection" />
      
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-4 block font-bold">Our Story</span>
            <h2 className={`text-4xl md:text-5xl font-bold uppercase mb-8 leading-tight tracking-tighter ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
              Crafting Excellence <br /> for the Modern Soul
            </h2>
            <p className="opacity-70 mb-10 max-w-md leading-relaxed text-lg font-light">
              Founded in 2026, Luxe was born from a desire to create garments that transcend trends. We believe in the power of minimalism and the integrity of premium materials.
            </p>
            <button className="px-10 py-5 border border-foreground uppercase text-xs tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-all duration-300">
              Discover More
            </button>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] bg-neutral-200 overflow-hidden shadow-2xl relative">
            <Image 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000" 
              alt="Brand Story" 
              fill
              className={`object-cover transition-all duration-1000 ${theme === 'luxury' ? 'grayscale hover:grayscale-0' : ''}`}
            />
          </div>
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
