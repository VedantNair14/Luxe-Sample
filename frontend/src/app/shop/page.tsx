'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';

const CATEGORIES = ["All", "Men", "Women", "Accessories", "Shoes"];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(activeCategory);
        // Map backend fields to frontend props
        const mappedData: MappedProduct[] = data.map((p: Product) => ({
          ...p,
          image: p.image_url,
          isNew: p.is_featured,
          sizes: ["S", "M", "L", "XL"],
          images: p.images && p.images.length > 0 ? p.images : [p.image_url]
        }));
        setProducts(mappedData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [activeCategory]);

  const filteredProducts = products;

  return (
    <main className="min-h-screen bg-background text-foreground pt-40 pb-24 transition-colors duration-500">
      <Navbar />
      <div className="container mx-auto px-6">
        {/* Refined Header & Search Bar Alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 block font-bold">Curated Selection</span>
            <h1 className={`text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
              Shop All
            </h1>
          </div>
          <div className="w-full md:w-[450px]">
            <div className="relative group">
              <Input 
                placeholder="SEARCH COLLECTION..." 
                className="bg-accent/5 border-border border rounded-none py-8 pl-14 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-20">
          {/* Sidebar Filters - Perfectly Aligned */}
          <aside className="hidden lg:block space-y-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 opacity-30 border-b border-border pb-4">Categories</h3>
              <div className="flex flex-col space-y-6">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm text-left uppercase tracking-[0.2em] transition-all duration-300 hover:translate-x-3 ${activeCategory === cat ? 'text-primary font-bold translate-x-3' : 'opacity-40 hover:opacity-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 opacity-30 border-b border-border pb-4">Sort By</h3>
              <div className="relative cursor-pointer group">
                <button className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-colors">
                  Newest Arrivals <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            </div>

            <div className="pt-10">
              <div className="p-8 bg-primary/5 border border-primary/10">
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Luxe Concierge</h4>
                <p className="text-[10px] opacity-60 leading-relaxed uppercase tracking-widest">Need help with sizing or styling? Our elite stylists are available 24/7.</p>
                <Button variant="link" className="p-0 h-auto text-[10px] uppercase tracking-widest font-bold mt-4 text-primary">Chat Now</Button>
              </div>
            </div>
          </aside>

          {/* Product Grid - Perfectly Symmetrical */}
          <div className="lg:col-span-4">
            {loading ? (
              <div className="flex justify-center items-center py-40">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center">
                <p className="opacity-30 uppercase tracking-[0.4em] text-sm font-bold">No silhouettes discovered in this spectrum.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
