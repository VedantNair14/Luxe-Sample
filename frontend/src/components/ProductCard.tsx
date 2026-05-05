'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Star } from 'lucide-react';
import { useCartStore, useFavoritesStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  tag?: string;
}

// Deterministic pseudo-random helpers (seeded on id so SSR/CSR match)
const fakeRating = (id: number) => (3.8 + (id % 12) * 0.1).toFixed(1);
const fakeReviews = (id: number) => 40 + (id * 17) % 260;
const fakeStock = (id: number) => 3 + (id * 7) % 8; // 3–10 items left

const ProductCard = ({ id, name, price, image, category, isNew, tag }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const rating = fakeRating(id);
  const reviews = fakeReviews(id);
  const stock = fakeStock(id);
  const isLowStock = stock <= 5;

  const handleAddToCart = () => {
    addItem({ id, name, price, quantity: 1, image });
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Image Container ── */}
      <div
        className={`relative aspect-[4/5] overflow-hidden bg-neutral-100 cursor-none fabric-ripple transition-shadow duration-700 ${
          isHovered ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]' : 'shadow-none'
        }`}
      >
        {/* Status Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground rounded-none uppercase text-[8px] px-3 py-1 tracking-[0.2em] border-none font-black shadow-lg">
              New Arrival
            </Badge>
          )}
          {tag && (
            <Badge className="bg-background/80 backdrop-blur-md text-foreground rounded-none uppercase text-[8px] px-3 py-1 tracking-[0.2em] border-none font-black">
              {tag}
            </Badge>
          )}
          {isLowStock && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 pulse-dot" />
                <span className="text-[8px] uppercase tracking-[0.15em] font-black text-foreground/70">
                  Only {stock} left
                </span>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Product Image */}
        <Link href={`/product/${id}`} className="block w-full h-full">
          <motion.img
            layoutId={`product-image-${id}`}
            src={image}
            alt={name}
            animate={{
              scale: isHovered ? 1.06 : 1,
              y: isHovered ? -8 : 0,
            }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Hover Action Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex flex-col items-center justify-end pb-6 px-5 pointer-events-none group-hover:pointer-events-auto"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col gap-2"
          >
            <AddToCartButton onClick={handleAddToCart} className="w-full shadow-2xl" />
            <Link href={`/product/${id}`} className="w-full">
              <button className="w-full bg-background/40 backdrop-blur-md text-foreground border border-white/20 h-12 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-background/70 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Wishlist button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(id);
          }}
          className={`absolute top-5 right-5 z-20 p-2.5 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 hover:scale-110 ${
            isFavorite ? '!opacity-100' : ''
          }`}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              isFavorite ? 'fill-primary text-primary' : 'text-foreground'
            }`}
          />
        </motion.button>
      </div>

      {/* ── Product Info ── */}
      <div className="pt-6 px-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1">
            <span className="text-[8px] uppercase tracking-[0.4em] opacity-35 font-black block mb-1.5">
              {category}
            </span>
            <h3
              className={`text-sm font-bold uppercase tracking-tight transition-colors duration-300 group-hover:opacity-60 leading-tight ${
                theme === 'boutique' ? 'font-serif normal-case italic' : ''
              }`}
            >
              <Link href={`/product/${id}`}>{name}</Link>
            </h3>
          </div>
          <p className="text-sm font-black tracking-tighter opacity-80 tabular-nums pt-5 flex-shrink-0">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-2.5 h-2.5 ${
                  star <= Math.round(parseFloat(rating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-foreground/20'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] font-bold opacity-40">
            {rating} ({reviews})
          </span>
        </div>

        {/* Hover progress bar */}
        <div className="mt-4 h-[1px] w-full bg-border/20 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '0%' : '-100%' }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            className="h-full w-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
