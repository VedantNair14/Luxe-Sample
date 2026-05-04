'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SplitText from './ui/SplitText';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  const slides = [
    {
      title: "Redefine",
      subtitle: "Your Style",
      desc: "An exploration of minimalist luxury. Crafted for the top 0.01%.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500"
    },
    {
      title: "Timeless",
      subtitle: "Silhouettes",
      desc: "Impeccable tailoring meets avant-garde design. A new era of elegance.",
      image: "https://images.unsplash.com/photo-1445205170230-053b830c6039?q=80&w=2500"
    },
    {
      title: "Eternal",
      subtitle: "Aesthetics",
      desc: "Uncompromising quality. The intersection of art and high fashion.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Image Slider with Parallax */}
      <AnimatePresence mode="wait" custom={currentSlide}>
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 100, scale: 1.1 }}
          animate={{ opacity: 0.8, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ 
            opacity: { duration: 1.2, ease: "linear" },
            x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 2, ease: [0.16, 1, 0.3, 1] }
          }}
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          
          {/* Subtle Fabric Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center mt-20">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          <div className="overflow-hidden mb-2">
            <div className="text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase mix-blend-difference">
              <SplitText text={slides[currentSlide].title} delay={0.3} stagger={0.04} />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <div className="text-6xl md:text-[8rem] font-serif italic text-white/90 leading-[0.85] tracking-tight mix-blend-difference ml-12 md:ml-32">
              <SplitText text={slides[currentSlide].subtitle} delay={0.5} stagger={0.04} />
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-white font-light max-w-xl text-center leading-relaxed tracking-widest uppercase text-[10px] md:text-xs mb-16 mix-blend-difference"
          >
            {slides[currentSlide].desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link 
              href="/shop" 
              className="group relative overflow-hidden bg-white text-black px-12 py-5 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Collection
                <motion.span 
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >→</motion.span>
              </span>
              <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 mix-blend-difference text-white"
      >
        <span className="text-[9px] uppercase tracking-[0.6em] font-bold">Discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" 
        />
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 hidden md:flex gap-4 mix-blend-difference z-20">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`h-[1px] transition-all duration-500 ${i === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
