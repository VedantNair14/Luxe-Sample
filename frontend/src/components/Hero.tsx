'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SplitText from './ui/SplitText';

const slides = [
  {
    title: 'Redefine',
    subtitle: 'Your Style',
    desc: 'An exploration of minimalist luxury. Crafted for the top 0.01%.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3000',
    badge: 'SS \'26 Collection',
  },
  {
    title: 'Timeless',
    subtitle: 'Silhouettes',
    desc: 'Impeccable tailoring meets avant-garde design. A new era of elegance.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b830c6039?q=80&w=3000',
    badge: 'Limited Drop',
  },
  {
    title: 'Eternal',
    subtitle: 'Aesthetics',
    desc: 'Uncompromising quality. The intersection of art and high fashion.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=3000',
    badge: 'Trending Now',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 350]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black grain">
      {/* ── Cinematic Image Slider with Parallax ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{
            opacity: { duration: 1.4, ease: 'linear' },
            scale: { duration: 2, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/75" />
          {/* Left vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Hero Content ── */}
      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        {/* Slide badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
            <span className="text-[9px] uppercase tracking-[0.6em] text-white/70 font-black">
              {slide.badge}
            </span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="max-w-6xl mx-auto flex flex-col items-center"
          >
            <div className="overflow-hidden mb-0">
              <div className="text-[clamp(4rem,12vw,9rem)] font-black text-white leading-[0.82] tracking-tighter uppercase mix-blend-difference">
                <SplitText text={slide.title} delay={0.25} stagger={0.04} />
              </div>
            </div>
            <div className="overflow-hidden mb-10">
              <div className="text-[clamp(4rem,12vw,9rem)] font-serif italic text-white/90 leading-[0.82] tracking-tight mix-blend-difference ml-10 md:ml-28">
                <SplitText text={slide.subtitle} delay={0.45} stagger={0.04} />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-[10px] md:text-xs text-white uppercase tracking-[0.35em] font-medium max-w-sm text-center leading-relaxed mb-14"
            >
              {slide.desc}
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Primary CTA */}
              <Link
                href="/shop"
                id="hero-shop-cta"
                className="group relative overflow-hidden bg-white text-black px-10 py-5 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Shop Collection
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/collections"
                id="hero-collections-cta"
                className="group flex items-center gap-3 px-8 py-5 border border-white/30 text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-black hover:border-white/80 transition-all duration-300 hover:bg-white/5"
              >
                Explore Lookbook
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-16 text-white/40"
        >
          {[
            { value: '200+', label: 'Pieces' },
            { value: '4.9★', label: 'Rating' },
            { value: '30+', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-black text-white/80 tracking-tighter">{stat.value}</p>
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 mix-blend-difference text-white z-10"
      >
        <span className="text-[8px] uppercase tracking-[0.7em] font-bold">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-12 right-10 hidden md:flex flex-col gap-3 mix-blend-difference z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`block transition-all duration-500 rounded-full ${
              i === currentSlide
                ? 'w-[1px] h-10 bg-white mx-auto'
                : 'w-[1px] h-5 bg-white/30 mx-auto hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-14 left-10 hidden md:block mix-blend-difference z-20 text-white">
        <span className="text-3xl font-black tracking-tighter opacity-20">
          0{currentSlide + 1}
        </span>
        <span className="text-[9px] opacity-20"> / 0{slides.length}</span>
      </div>
    </section>
  );
};

export default Hero;
