'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartItemsCount = useCartStore((state) => state.items.length);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [isSearchOpen]);

  // Close mobile menu on route change / ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock body scroll when overlays are open
  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isSearchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 border-b ${
          isScrolled
            ? 'glass py-4 border-border'
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-primary/40 z-[60] origin-left"
          style={{ scaleX: scrollProgress }}
        />

        <div
          className={`container mx-auto px-6 flex justify-between items-center transition-colors duration-500 ${
            isScrolled ? 'text-foreground' : 'text-white mix-blend-difference'
          }`}
        >
          {/* Left: Logo + Nav links */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase">
              Luxe
            </Link>
            <div className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold hover-underline hover:opacity-60 transition-opacity uppercase tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              id="nav-search-btn"
              aria-label="Open search"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/auth/login" className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              id="nav-menu-btn"
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col px-8 pt-32 pb-16"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-end justify-between py-6 border-b border-border/40 text-5xl font-black uppercase tracking-tighter hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                    <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Explore</p>
              <div className="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-50">
                <a href="#" className="hover:opacity-100 transition-all">Instagram</a>
                <a href="#" className="hover:opacity-100 transition-all">TikTok</a>
                <a href="#" className="hover:opacity-100 transition-all">Pinterest</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-screen Search Overlay ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center px-8"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-2 opacity-40 hover:opacity-100 transition-all"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl"
            >
              <p className="text-[10px] uppercase tracking-[0.6em] opacity-30 font-bold mb-6">Search Collection</p>
              <div className="flex items-center gap-4 border-b-2 border-foreground/20 pb-4 focus-within:border-primary transition-colors duration-300">
                <Search className="w-6 h-6 opacity-30 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                      setIsSearchOpen(false);
                    }
                  }}
                  placeholder="Type to search..."
                  className="flex-1 bg-transparent text-3xl md:text-5xl font-black uppercase tracking-tighter outline-none placeholder:opacity-20"
                />
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-widest opacity-20 font-bold">
                Press Enter to search · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
