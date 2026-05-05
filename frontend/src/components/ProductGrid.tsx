'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';
import { ProductSkeleton } from './FabricSkeleton';
import { ArrowUpRight } from 'lucide-react';

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
          sizes: ['S', 'M', 'L', 'XL'],
          images: p.images && p.images.length > 0 ? p.images : [p.image_url],
        }));
        setProducts(mappedData);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.5em] opacity-30 mb-2 block font-bold">
                Curated Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{title}</h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 transition-all hover-underline"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {products.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.08, 0.32), duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-80px' }}
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
