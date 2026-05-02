'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled ? 'glass py-3 border-border shadow-sm' : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center text-foreground">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
            Luxe
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/shop" className="text-sm font-medium hover:opacity-50 transition-all uppercase tracking-widest">
              Shop
            </Link>
            <Link href="/collections" className="text-sm font-medium hover:opacity-50 transition-all uppercase tracking-widest">
              Collections
            </Link>
            <Link href="/about" className="text-sm font-medium hover:opacity-50 transition-all uppercase tracking-widest">
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <ThemeSwitcher />
          <button className="p-2 hover:bg-neutral-100/10 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/auth/login" className="p-2 hover:bg-neutral-100/10 rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="p-2 hover:bg-neutral-100/10 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 hover:bg-neutral-100/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-t border-border md:hidden p-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/shop" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="/collections" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link href="/about" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
