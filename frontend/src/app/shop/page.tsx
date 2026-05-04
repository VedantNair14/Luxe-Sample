'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, List, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';
import { ProductSkeleton } from '@/components/FabricSkeleton';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const CATEGORIES = ["All", "Men", "Women", "Accessories", "Shoes"];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(activeCategory);
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
        setTimeout(() => setLoading(false), 1000); // Subtle delay for premium feel
      }
    };
    loadProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground pt-44 pb-32 transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 max-w-[1800px]">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <RevealOnScroll direction="left" distance={40}>
            <div>
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-4 block font-bold">Luxe Spectrum</span>
              <h1 className={`text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
                Shop <br /> <span className="opacity-20">Catalogue</span>
              </h1>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" distance={40} delay={0.2}>
            <div className="w-full md:w-[500px]">
              <div className="relative group">
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH COLLECTION..." 
                  className="bg-accent/5 border-border border-b border-t-0 border-x-0 rounded-none py-10 pl-16 text-xs font-bold uppercase tracking-[0.3em] focus:ring-0 focus:border-primary transition-all placeholder:opacity-30"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-20 group-focus-within:opacity-100 transition-all duration-500" />
              </div>
            </div>
          </RevealOnScroll>
        </header>

        <div className="grid lg:grid-cols-6 gap-24 items-start">
          {/* Sidebar - Precision Aligned */}
          <aside className="lg:col-span-1 sticky top-32 space-y-20">
            <RevealOnScroll direction="up" distance={20} delay={0.4}>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-10 opacity-30 border-b border-border pb-4">Categories</h3>
              <div className="flex flex-col space-y-6">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs text-left uppercase tracking-[0.25em] font-bold transition-all duration-500 group flex items-center gap-3 ${activeCategory === cat ? 'text-primary translate-x-4' : 'opacity-40 hover:opacity-100 hover:translate-x-2'}`}
                  >
                    <span className={`w-1 h-1 rounded-full bg-primary transition-all duration-500 ${activeCategory === cat ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                    {cat}
                  </button>
                ))}
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="up" distance={20} delay={0.6}>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-10 opacity-30 border-b border-border pb-4">Display</h3>
              <div className="flex gap-4">
                <button className="p-3 bg-primary text-primary-foreground"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-3 bg-accent/10 opacity-50 hover:opacity-100"><List className="w-4 h-4" /></button>
              </div>
            </RevealOnScroll>
          </aside>

          {/* Product Grid - Cinematic Stagger */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-32"
                >
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </motion.div>
              ) : filteredProducts.length > 0 ? (
                <motion.div 
                  key="grid"
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-32"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 40 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-48 text-center border border-dashed border-border/50"
                >
                  <p className="opacity-20 uppercase tracking-[0.8em] text-xs font-black">No silhouettes discovered in this spectrum.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
