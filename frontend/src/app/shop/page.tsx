'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search, LayoutGrid, LayoutList, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { fetchProducts } from '@/lib/api';
import { MappedProduct, Product } from '@/lib/types';
import { ProductSkeleton } from '@/components/FabricSkeleton';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

const CATEGORIES = ['All', 'Men', 'Women', 'Accessories', 'Shoes'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest First' },
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOpen, setSortOpen] = useState(false);
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
          sizes: ['S', 'M', 'L', 'XL'],
          images: p.images && p.images.length > 0 ? p.images : [p.image_url],
        }));
        setProducts(mappedData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadProducts();
  }, [activeCategory]);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return 0; // featured — keep original
    });

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Featured';

  return (
    <main className="min-h-screen bg-background text-foreground pt-44 pb-32 transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="container mx-auto px-6 max-w-[1800px]">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <RevealOnScroll direction="left" distance={40}>
            <div>
              <span className="text-[9px] uppercase tracking-[0.6em] opacity-35 mb-4 block font-bold">
                Luxe Spectrum
              </span>
              <SplitText
                className={`text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] ${
                  theme === 'boutique' ? 'font-serif normal-case' : ''
                }`}
              >
                Shop
              </SplitText>
              <SplitText
                className={`text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] opacity-15 ${
                  theme === 'boutique' ? 'font-serif normal-case' : ''
                }`}
              >
                Catalogue
              </SplitText>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" distance={40} delay={0.2}>
            <div className="w-full md:w-[480px]">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20 group-focus-within:opacity-80 transition-all duration-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH COLLECTION..."
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary py-5 pl-14 pr-4 text-[10px] font-bold uppercase tracking-[0.3em] outline-none transition-colors duration-300 placeholder:opacity-25"
                />
              </div>
            </div>
          </RevealOnScroll>
        </header>

        <div className="grid lg:grid-cols-[200px_1fr] gap-16 items-start">
          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="lg:sticky top-32 space-y-14">
            <RevealOnScroll direction="up" distance={20} delay={0.3}>
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.45em] font-black mb-8 opacity-25 border-b border-border pb-3">
                  Categories
                </h3>
                <div className="flex flex-col space-y-5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[10px] text-left uppercase tracking-[0.25em] font-black transition-all duration-400 group flex items-center gap-3 ${
                        activeCategory === cat
                          ? 'text-foreground translate-x-3'
                          : 'opacity-30 hover:opacity-80 hover:translate-x-1.5'
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-1 h-1 rounded-full bg-primary transition-all duration-400 ${
                          activeCategory === cat ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Sort & View */}
            <RevealOnScroll direction="up" distance={20} delay={0.45}>
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.45em] font-black mb-8 opacity-25 border-b border-border pb-3">
                  Sort By
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="w-full flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-black opacity-60 hover:opacity-100 transition-all pb-2 border-b border-border"
                  >
                    {currentSortLabel}
                    <motion.span
                      animate={{ rotate: sortOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-2"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                            className={`block w-full text-left text-[10px] uppercase tracking-[0.2em] font-bold py-2.5 transition-all ${
                              sortBy === opt.value ? 'text-primary' : 'opacity-40 hover:opacity-80'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" distance={20} delay={0.55}>
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.45em] font-black mb-6 opacity-25 border-b border-border pb-3">
                  Display
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 border transition-all ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground border-primary' : 'border-border opacity-40 hover:opacity-80'
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 border transition-all ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground border-primary' : 'border-border opacity-40 hover:opacity-80'
                    }`}
                    aria-label="List view"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────────────── */}
          <div className="min-h-[60vh]">
            {/* Results bar */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between mb-12"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3" />
                  {filteredProducts.length} Results
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 transition-all border-b border-foreground/20 pb-0.5"
                  >
                    Clear Filter
                  </button>
                )}
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid gap-x-12 gap-y-24 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}
                >
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </motion.div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  key="grid"
                  layout
                  className={`grid gap-x-12 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-24'
                      : 'grid-cols-1 sm:grid-cols-2 gap-y-16'
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 30 }}
                      transition={{
                        duration: 0.55,
                        delay: Math.min(index * 0.07, 0.4),
                        ease: [0.16, 1, 0.3, 1],
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
                  className="py-48 text-center border border-dashed border-border/40 flex flex-col items-center gap-6"
                >
                  <p className="opacity-15 uppercase tracking-[0.8em] text-xs font-black">
                    No silhouettes found
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="text-[9px] uppercase tracking-[0.3em] font-black border-b border-foreground/20 pb-0.5 opacity-40 hover:opacity-100 transition-all"
                  >
                    Reset Filters
                  </button>
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
