'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from './ProductCard';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';

const ProductCarousel = () => {
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // A subtle parallax effect on the background
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(undefined, true);
        const mappedData: MappedProduct[] = data.map((p: Product) => ({
          ...p,
          image: p.image_url,
          isNew: p.is_featured,
          sizes: ["S", "M", "L", "XL"],
          images: p.images && p.images.length > 0 ? p.images : [p.image_url]
        }));
        setProducts(mappedData.slice(0, 6)); // limit to 6 for carousel
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-foreground text-background relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Subtle background typographic texture */}
        <h1 className="text-[20rem] font-black leading-none whitespace-nowrap uppercase italic tracking-tighter">
          LUXE ESSENTIALS LUXE ESSENTIALS
        </h1>
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-60 mb-3 block font-bold">New Season</span>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight">The Essentials</h2>
          </div>
          <a href="/shop" className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-background pb-1 hover:opacity-50 transition-all">
            Discover All
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-background/20 border-t-background rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="min-w-[85vw] md:min-w-[400px] snap-center flex-shrink-0"
              >
                <div className="bg-background text-foreground p-4 h-full">
                  <ProductCard {...product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCarousel;
