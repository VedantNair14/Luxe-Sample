'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
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
}

const ProductCard = ({ id, name, price, image, category, isNew }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { theme } = useTheme();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, quantity: 1, image });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group perspective-1000"
    >
      <Card className="border-none bg-transparent overflow-hidden shadow-none rounded-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-accent/5 skew-on-hover">
          {isNew && (
            <div className="absolute top-4 left-4 z-20">
               <span className="bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 shadow-xl">New Arrival</span>
            </div>
          )}
          <Link href={`/product/${id}`} className="relative block w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </Link>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] translate-y-20 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] z-20">
            <button
              onClick={handleAddToCart}
              className="w-full glass-dark text-white uppercase text-[10px] tracking-[0.3em] font-bold py-5 hover:bg-white hover:text-black transition-all"
            >
              Quick Add
            </button>
          </div>
        </div>
        <CardContent className="pt-8 px-0 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-30 mb-2 font-bold">{category}</p>
          <h3 className={`text-xs font-black uppercase tracking-widest group-hover:opacity-60 transition-opacity mb-2 ${theme === 'boutique' ? 'font-serif normal-case italic text-lg' : ''}`}>
            <Link href={`/product/${id}`}>{name}</Link>
          </h3>
          <p className="text-xs font-bold tracking-[0.2em] opacity-80">${price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
