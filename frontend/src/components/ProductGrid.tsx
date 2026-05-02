'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';

const ProductGrid = ({ title }: { title: string }) => {
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
        setProducts(mappedData);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-3 block font-bold">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">{title}</h2>
          </div>
          <a href="/shop" className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-foreground pb-1 hover:opacity-50 transition-all">
            View All
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
