'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ProductCarousel from '@/components/ProductCarousel';
import EditorialMarquee from '@/components/EditorialMarquee';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Shield, RefreshCw, Truck, Star, Camera, ArrowUpRight } from 'lucide-react';

// ── Trending Now Section ──────────────────────────────────────────────────────
const TRENDING = [
  {
    label: 'Trending',
    title: 'Minimal Overshirt',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200',
    tag: '#1 This Week',
  },
  {
    label: 'New Arrival',
    title: 'Linen Wide Trousers',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
    tag: 'Just Dropped',
  },
  {
    label: 'Best Seller',
    title: 'Silk Knit Cardigan',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200',
    tag: 'Almost Gone',
  },
];

// ── Trust Badges ─────────────────────────────────────────────────────────────
const TRUST = [
  { icon: Truck, title: 'Free Global Shipping', desc: 'On all orders over $150' },
  { icon: Shield, title: 'Authenticity Guarantee', desc: 'Every piece is certified genuine' },
  { icon: RefreshCw, title: '30-Day Returns', desc: 'Hassle-free. No questions asked.' },
];

// ── Featured Review ───────────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Amara J.', handle: '@amarastyle', text: 'The quality is unreal. This is what luxury actually feels like — not just a logo.', rating: 5, location: 'New York, USA' },
  { name: 'Kenji T.', handle: '@kenjitakahashi', text: 'Bought the linen trousers. Best purchase of my year. Worth every cent.', rating: 5, location: 'Tokyo, Japan' },
  { name: 'Sofía R.', handle: '@sofiarinaldi', text: 'The packaging alone made me feel like I was unboxing art. Outstanding brand.', rating: 5, location: 'Milan, Italy' },
];

export default function Home() {
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* ── Trending Now ──────────────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll delay={0.1}>
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-[9px] uppercase tracking-[0.6em] opacity-35 mb-3 block font-bold">
                  Right Now
                </span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  Trending{' '}
                  <span className="font-serif italic font-normal tracking-normal normal-case text-primary/60">
                    Now
                  </span>
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold border-b border-foreground pb-1 hover:opacity-50 transition-all hover-underline"
              >
                See All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {TRENDING.map((item, i) => (
              <RevealOnScroll key={item.title} delay={0.1 + i * 0.12}>
                <div className="group relative overflow-hidden bg-background">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Tag */}
                    <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 pulse-dot" />
                      <span className="text-[8px] uppercase tracking-[0.2em] font-black">{item.tag}</span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-bold mb-1">{item.label}</p>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{item.title}</h3>
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-[9px] uppercase tracking-[0.25em] font-black opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                      >
                        Shop Now <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Carousel ─────────────────────────────────────────────── */}
      <RevealOnScroll delay={0.15}>
        <ProductCarousel />
      </RevealOnScroll>

      {/* ── Featured Collection ───────────────────────────────────────────── */}
      <RevealOnScroll delay={0.2}>
        <ProductGrid title="Featured Collection" />
      </RevealOnScroll>

      {/* ── Editorial Marquee ─────────────────────────────────────────────── */}
      <EditorialMarquee text="LUXE COLLECTION 2026 • ESSENTIAL SILHOUETTES • TIMELESS LUXURY • " />

      {/* ── Trust Badges ──────────────────────────────────────────────────── */}
      <RevealOnScroll delay={0.1}>
        <section className="py-20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="trust-grid">
              {TRUST.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center p-10 gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-border/50 mb-2">
                    <item.icon className="w-5 h-5 opacity-60" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[10px] opacity-40 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Brand Storytelling ────────────────────────────────────────────── */}
      <section ref={storyRef} className="py-40 bg-background overflow-hidden relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 md:gap-28 items-center">
          <RevealOnScroll direction="left" distance={50}>
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <span className="text-[9px] uppercase tracking-[0.6em] opacity-40 mb-8 block font-black">
                The Philosophy
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-10 leading-[0.85] tracking-tighter">
                Crafting{' '}
                <span className="text-primary/50 italic font-serif lowercase tracking-normal">
                  Excellence
                </span>
              </h2>
              <p className="opacity-60 mb-12 max-w-md leading-loose text-sm font-medium tracking-wide">
                Founded in 2026, Luxe was born from a desire to create garments that transcend
                trends. We believe in the power of minimalism and the integrity of premium
                materials. Each piece is a testament to the art of subtraction.
              </p>
              <Link
                href="/about"
                className="group relative w-fit px-10 py-5 border border-foreground/20 uppercase text-[9px] tracking-[0.4em] font-black overflow-hidden transition-all hover:border-foreground flex items-center gap-3"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
                  Read Our Story
                </span>
                <span className="relative z-10 transition-all duration-500 group-hover:text-background group-hover:translate-x-1">
                  →
                </span>
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" distance={50} delay={0.2}>
            <div className="order-1 md:order-2 h-[70vh] w-full bg-accent/5 overflow-hidden relative group">
              <motion.div style={{ y: parallaxY, height: '120%' }} className="absolute -top-[10%] left-0 right-0">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500"
                  alt="Brand Story"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2s] group-hover:scale-[1.04]"
                  quality={90}
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              {/* Overlay badge */}
              <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-sm px-5 py-3">
                <p className="text-[8px] uppercase tracking-[0.3em] font-black opacity-50">Est. 2026</p>
                <p className="text-sm font-black uppercase tracking-tight">Milan, Italy</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Customer Reviews ─────────────────────────────────────────────── */}
      <section className="py-32 bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-6">
          <RevealOnScroll delay={0.1}>
            <div className="text-center mb-20">
              <span className="text-[9px] uppercase tracking-[0.6em] opacity-40 mb-4 block font-bold">
                Social Proof
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">
                What They{' '}
                <span className="italic font-serif normal-case font-normal tracking-normal opacity-60">
                  Say
                </span>
              </h2>
              <div className="flex items-center justify-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-[10px] font-black opacity-50 uppercase tracking-widest">
                  4.9 · 2,400+ Reviews
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-px bg-background/10">
            {REVIEWS.map((review, i) => (
              <RevealOnScroll key={review.name} delay={0.1 + i * 0.12}>
                <div className="bg-foreground p-10 flex flex-col gap-6 h-full">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed opacity-70 font-light italic flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-background/10">
                    <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center text-[10px] font-black">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tight">{review.name}</p>
                      <p className="text-[9px] opacity-30 font-medium">{review.location}</p>
                    </div>
                    <div className="ml-auto">
                      <Camera className="w-4 h-4 opacity-20" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Banner ────────────────────────────────────────────── */}
      <RevealOnScroll delay={0.1}>
        <section className="py-28 bg-background border-b border-border">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <span className="text-[9px] uppercase tracking-[0.6em] opacity-30 mb-6 block font-bold">
              Exclusive Access
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
              Join the{' '}
              <span className="italic font-serif normal-case font-normal tracking-normal opacity-50">
                Inner Circle
              </span>
            </h2>
            <p className="text-sm opacity-40 mb-10 font-medium leading-relaxed max-w-sm mx-auto">
              Early access to drops, members-only pricing, and curated editorial content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 bg-accent/5 border border-border px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary text-primary-foreground px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-background py-24 border-t border-border">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Luxe</h3>
            <p className="opacity-40 text-sm leading-loose max-w-xs font-medium">
              A global collective dedicated to the art of premium apparel and timeless expression.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-2">
              {['Instagram', 'TikTok', 'Pinterest', 'X'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-[8px] uppercase tracking-[0.3em] font-black opacity-30 hover:opacity-100 transition-all hover-underline"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Shop</h4>
            <ul className="space-y-4 text-[11px] font-medium">
              {['New Arrivals', 'Best Sellers', 'Collections', 'Archives', 'Sale'].map((item) => (
                <li key={item}>
                  <a href="#" className="opacity-50 hover:opacity-100 transition-all hover-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Support</h4>
            <ul className="space-y-4 text-[11px] font-medium">
              {['Shipping & Returns', 'Size Guide', 'Contact Us', 'FAQ', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a href="#" className="opacity-50 hover:opacity-100 transition-all hover-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Company</h4>
            <ul className="space-y-4 text-[11px] font-medium">
              {['About Luxe', 'Careers', 'Press', 'Partnerships', 'Privacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="opacity-50 hover:opacity-100 transition-all hover-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] opacity-25 uppercase tracking-[0.35em] font-bold">
            © 2026 Luxe Clothing. Built for the 0.01%.
          </p>
          <div className="flex gap-8 text-[9px] opacity-25 uppercase tracking-[0.3em] font-bold">
            <a href="#" className="hover:opacity-100 transition-all">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-all">Terms</a>
            <a href="#" className="hover:opacity-100 transition-all">Sustainability</a>
            <a href="#" className="hover:opacity-100 transition-all">Accessibility</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
