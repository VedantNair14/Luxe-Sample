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
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="border-none bg-transparent overflow-hidden shadow-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {isNew && (
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground rounded-none uppercase text-[10px] px-2 py-1 tracking-widest border-none">
              New
            </Badge>
          )}
          <Link href={`/product/${id}`} className="relative block w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
          
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/20 backdrop-blur-md flex gap-2">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground uppercase text-xs tracking-tighter"
            >
              Add to Cart
            </Button>
            <Link 
              href={`/product/${id}`}
              className="flex items-center justify-center size-8 bg-background border-none hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <CardContent className="pt-4 px-0">
          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">{category}</p>
          <h3 className={`text-sm font-bold uppercase tracking-tight group-hover:opacity-70 transition-opacity ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
            <Link href={`/product/${id}`}>{name}</Link>
          </h3>
          <p className="text-sm font-bold mt-1 tracking-tight opacity-90">${price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
