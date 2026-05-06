'use client';

import React, { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import { useCartStore, useFavoritesStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowLeft, Star, Shield, Truck, RefreshCw, Minus, Plus, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import ProductGrid from '@/components/ProductGrid';
import { fetchProduct } from '@/lib/api';
import { MappedProduct } from '@/lib/types';
import { AddToCartButton } from '@/components/AddToCartButton';

// Deterministic review helpers
const fakeRating = (id: number) => (3.8 + (id % 12) * 0.1).toFixed(1);
const fakeReviews = (id: number) => 40 + (id * 17) % 260;
const fakeStock = (id: number) => 3 + (id * 7) % 8;

const TRUST_ITEMS = [
  { icon: Truck, label: 'Free shipping over $150' },
  { icon: Shield, label: 'Authenticity guaranteed' },
  { icon: RefreshCw, label: '30-day free returns' },
];

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [product, setProduct] = useState<MappedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomMode, setZoomMode] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(parseInt(id)));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { theme } = useTheme();

  const { scrollY } = useScroll();
  const stickyBarOpacity = useTransform(scrollY, [400, 600], [0, 1]);
  const stickyBarY = useTransform(scrollY, [400, 600], [20, 0]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProduct(parseInt(id));
        const mappedProduct: MappedProduct = {
          ...data,
          image: data.image_url,
          isNew: data.is_featured,
          images: data.images && data.images.length > 0 ? data.images : [data.image_url],
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        };
        setProduct(mappedProduct);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Loading Silhouette</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-32">
        <Navbar />
        <div className="container mx-auto px-6 text-center py-20">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Not Found</h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const rating = fakeRating(product.id);
  const reviews = fakeReviews(product.id);
  const stock = fakeStock(product.id);
  const isLowStock = stock <= 5;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
        size: selectedSize,
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-24 transition-colors duration-500">
      <Navbar />

      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 mb-12 text-[9px] uppercase tracking-[0.35em] font-bold opacity-30">
          <Link href="/" className="hover:opacity-100 transition-all">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:opacity-100 transition-all">Shop</Link>
          <span>/</span>
          <span className="opacity-60">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          {/* ── Image Gallery ───────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] bg-accent/5 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <motion.img
                    layoutId={`product-image-${product.id}`}
                    src={product.images[activeImage]}
                    alt={product.name}
                    className={`object-cover w-full h-full transition-transform duration-[2s] ${
                      zoomMode ? 'scale-[1.8] cursor-zoom-out' : 'cursor-zoom-in group-hover:scale-[1.04]'
                    }`}
                    onClick={() => setZoomMode(!zoomMode)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <Badge className="bg-primary text-primary-foreground rounded-none uppercase text-[8px] tracking-widest px-4 py-1.5 border-none font-black">
                  {theme === 'luxury' ? 'Premium' : theme === 'streetwear' ? 'Drop 01' : 'Handmade'}
                </Badge>
                {isLowStock && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 pulse-dot" />
                    <span className="text-[8px] uppercase tracking-[0.15em] font-black">
                      Only {stock} left
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Zoom icon */}
              <button
                onClick={() => setZoomMode(!zoomMode)}
                className="absolute bottom-5 right-5 bg-background/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-background z-10"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === idx
                      ? 'border-primary opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ─────────────────────────────────────────────── */}
          <div className="flex flex-col py-2">
            {/* Category + name */}
            <span className="text-[9px] uppercase tracking-[0.5em] opacity-35 mb-3 font-black">
              {product.category}
            </span>
            <h1
              className={`text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-[0.9] ${
                theme === 'boutique' ? 'font-serif normal-case' : ''
              }`}
            >
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= Math.round(parseFloat(rating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-foreground/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold opacity-40">
                {rating} · {reviews} reviews
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-black tracking-tighter mb-8 tabular-nums">
              ${product.price.toFixed(2)}
              <span className="ml-3 text-sm font-medium opacity-30 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <span className="ml-2 text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5">
                20% OFF
              </span>
            </p>

            <div className="h-px w-full bg-border/30 mb-10" />

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-[9px] uppercase tracking-[0.3em] font-black mb-4 opacity-35">
                The Narrative
              </h3>
              <p className="opacity-60 leading-loose max-w-lg text-sm font-light">{product.description}</p>
            </div>

            {/* Size selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[9px] uppercase tracking-[0.3em] font-black opacity-35">
                  Select Size
                </h3>
                <button className="text-[8px] uppercase tracking-[0.3em] font-black border-b border-foreground/20 pb-0.5 opacity-35 hover:opacity-100 transition-all">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-[10px] font-black transition-all duration-250 border-2 ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border/60 opacity-50 hover:border-foreground hover:opacity-100'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mb-10">
              <h3 className="text-[9px] uppercase tracking-[0.3em] font-black mb-5 opacity-35">Quantity</h3>
              <div className="flex items-center gap-1 w-fit border border-border/50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-all hover:bg-accent/10"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-black tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  className="w-12 h-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-all hover:bg-accent/10"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Urgency */}
            {isLowStock && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-orange-50 dark:bg-orange-900/10 border border-orange-200/50 dark:border-orange-800/30 px-5 py-3.5 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 pulse-dot flex-shrink-0" />
                <p className="text-[9px] uppercase tracking-[0.2em] font-black text-orange-600 dark:text-orange-400">
                  Only {stock} items remaining — order now to secure yours
                </p>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-10">
              <AddToCartButton onClick={handleAddToCart} className="flex-1" />
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleFavorite(parseInt(id))}
                className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${
                  isFavorite
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border/60 hover:border-primary text-foreground/60 hover:text-primary'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-primary' : ''}`} />
              </motion.button>
            </div>

            {/* Trust grid */}
            <div className="grid grid-cols-3 gap-px bg-border/20 mb-10">
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center p-4 gap-2 bg-background">
                  <item.icon className="w-4 h-4 opacity-30" strokeWidth={1.5} />
                  <p className="text-[7px] uppercase tracking-[0.15em] font-black opacity-35 leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Material tags */}
            <div className="flex flex-wrap gap-2">
              {['100% Organic Cotton', 'Carbon-Neutral', 'Artisan Made'].map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] uppercase tracking-[0.2em] font-black opacity-30 border border-border/40 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ────────────────────────────────────────────── */}
      <div className="mt-32 border-t border-border pt-24">
        <div className="container mx-auto px-6 mb-10 text-center">
          <h2 className="text-[9px] uppercase tracking-[0.8em] font-black opacity-30 mb-3">Curated For You</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            You May Also{' '}
            <span className="text-primary/50 italic font-serif lowercase tracking-normal font-normal">
              Love
            </span>
          </h3>
        </div>
        <ProductGrid title="" />
      </div>

      {/* ── Sticky Purchase Bar (desktop) ─────────────────────────────── */}
      <motion.div
        style={{ opacity: stickyBarOpacity, y: stickyBarY }}
        className="fixed bottom-0 left-0 w-full z-40 bg-background/90 backdrop-blur-xl border-t border-border py-4 px-6 md:px-12 md:flex hidden justify-between items-center"
      >
        <div className="flex items-center gap-5">
          <div className="relative w-12 h-16 bg-accent/5 overflow-hidden flex-shrink-0">
            <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">{product.name}</h4>
            <p className="text-xs font-bold opacity-50 tabular-nums">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-9 h-9 flex items-center justify-center text-[9px] font-black border transition-all ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border opacity-40 hover:border-foreground hover:opacity-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <AddToCartButton onClick={handleAddToCart} className="shadow-xl" />
        </div>
      </motion.div>
    </main>
  );
};

export default ProductDetailPage;
