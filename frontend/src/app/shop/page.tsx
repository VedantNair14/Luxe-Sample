'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIES = ["All", "Men", "Women", "Accessories", "Shoes"];

// 8K-Style Ultra-High Resolution Curated Assets
const LUXE_COLLECTION = [
  {
    id: 1,
    name: "Couture Cashmere Overcoat",
    price: 1299.00,
    category: "Men",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=2560",
    isNew: true,
    tag: "Limited"
  },
  {
    id: 2,
    name: "Structured Silk Gala Gown",
    price: 2450.00,
    category: "Women",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2560",
    isNew: true,
    tag: "Exclusive"
  },
  {
    id: 3,
    name: "Architectural Chelsea Boots",
    price: 890.00,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=2560",
    tag: "Handcrafted"
  },
  {
    id: 4,
    name: "Obsidian Chronograph",
    price: 3200.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2560",
    tag: "Precision"
  },
  {
    id: 5,
    name: "Minimalist Wool Blazer",
    price: 750.00,
    category: "Men",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2560"
  },
  {
    id: 6,
    name: "Satin Slip Silhouette",
    price: 580.00,
    category: "Women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2560"
  }
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  
  const filteredProducts = LUXE_COLLECTION.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground pt-44 pb-32 transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 max-w-[1800px]">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-4 block font-bold">Luxe Spectrum</span>
            <h1 className={`text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
              Shop <br /> <span className="opacity-20">Catalogue</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full md:w-[500px]"
          >
            <div className="relative group">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH COLLECTION..." 
                className="bg-accent/5 border-border border-b border-t-0 border-x-0 rounded-none py-10 pl-16 text-xs font-bold uppercase tracking-[0.3em] focus:ring-0 focus:border-primary transition-all placeholder:opacity-30"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-20 group-focus-within:opacity-100 transition-all duration-500" />
            </div>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-6 gap-24 items-start">
          {/* Sidebar - Precision Aligned */}
          <aside className="lg:col-span-1 sticky top-32 space-y-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-10 opacity-30 border-b border-border pb-4">Categories</h3>
              <div className="flex flex-col space-y-6">
                {CATEGORIES.map((cat, idx) => (
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-10 opacity-30 border-b border-border pb-4">Display</h3>
              <div className="flex gap-4">
                <button className="p-3 bg-primary text-primary-foreground"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-3 bg-accent/10 opacity-50 hover:opacity-100"><List className="w-4 h-4" /></button>
              </div>
            </motion.div>
          </aside>

          {/* Product Grid - Cinematic Stagger */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
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
