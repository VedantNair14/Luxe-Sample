'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Plus, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  tag?: string;
}

const ProductCard = ({ id, name, price, image, category, isNew, tag }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, quantity: 1, image });
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Card className="border-none bg-transparent overflow-hidden shadow-none rounded-none">
        {/* Cinematic Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 cursor-none">
          {/* Status Badges */}
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground rounded-none uppercase text-[9px] px-3 py-1.5 tracking-[0.2em] border-none font-black shadow-2xl">
                New Arrival
              </Badge>
            )}
            {tag && (
              <Badge className="bg-background/80 backdrop-blur-md text-foreground rounded-none uppercase text-[9px] px-3 py-1.5 tracking-[0.2em] border-none font-black">
                {tag}
              </Badge>
            )}
          </div>

          <Link href={`/product/${id}`} className="block w-full h-full">
            <motion.img
              src={image}
              alt={name}
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Luxury Interaction Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-all duration-700 flex flex-col items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto"
          >
            <div className="flex gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
              <Button
                onClick={handleAddToCart}
                className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground rounded-none px-6 py-6 border-none shadow-2xl flex items-center gap-3 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to Cart</span>
              </Button>
              <Link href={`/product/${id}`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/40 border-none backdrop-blur-md hover:bg-background text-foreground rounded-none w-14 h-14"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Like Action */}
          <button className="absolute top-6 right-6 z-20 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-90">
            <Heart className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
        </div>

        {/* Professional Typography Layer */}
        <CardContent className="pt-8 px-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-black block">
                {category}
              </span>
              <h3 className={`text-sm md:text-base font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-primary ${theme === 'boutique' ? 'font-serif normal-case italic' : ''}`}>
                <Link href={`/product/${id}`}>{name}</Link>
              </h3>
            </div>
            <div className="md:text-right">
              <p className="text-sm font-black tracking-tighter opacity-80">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          {/* Subtle Progress Bar (Design Element) */}
          <div className="mt-6 h-[1px] w-full bg-border/20 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "0%" : "-100%" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-full w-full bg-primary"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
