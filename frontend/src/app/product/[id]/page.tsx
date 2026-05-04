'use client';

import React, { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import { useCartStore, useFavoritesStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import ProductGrid from '@/components/ProductGrid';

import { fetchProduct } from '@/lib/api';
import { MappedProduct } from '@/lib/types';

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [product, setProduct] = useState<MappedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(parseInt(id)));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const showStickyBar = useTransform(scrollY, [0, 800], [0, 1]);
  const stickyBarY = useTransform(showStickyBar, [0, 1], [100, 0]);
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProduct(parseInt(id));
        // Map backend fields to frontend props
        // Backend returns: id, name, description, price, image_url, category, images (list of urls)
        const mappedProduct: MappedProduct = {
          ...data,
          image: data.image_url,
          isNew: data.is_featured,
          images: data.images && data.images.length > 0 ? data.images : [data.image_url],
          sizes: ["S", "M", "L", "XL"] // Default sizes since backend doesn't provide them
        };
        setProduct(mappedProduct);
      } catch (error) {
        console.error("Failed to load product:", error);
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
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-32">
        <Navbar />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold uppercase">Product Not Found</h1>
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors mt-8"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      size: selectedSize
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
      <Navbar />
      <div className="container mx-auto px-6">
        <Link href="/shop" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 mb-12 transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Spectrum
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              key={theme + activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-accent/5 overflow-hidden relative shadow-2xl"
            >
              <motion.img 
                layoutId={`product-image-${product.id}`}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="object-cover absolute inset-0 w-full h-full"
              />
              <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground rounded-none uppercase text-[10px] tracking-widest px-4 py-2 border-none">
                {theme === 'luxury' ? 'Premium' : theme === 'streetwear' ? 'Drop 01' : 'Handmade'}
              </Badge>
            </motion.div>
            <div className="grid grid-cols-4 gap-6">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square bg-accent/5 overflow-hidden border-2 transition-all duration-300 relative ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} ${idx}`} 
                    fill 
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col py-4">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4 font-bold">{product.category}</span>
            <h1 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-none ${theme === 'boutique' ? 'font-serif normal-case' : ''}`}>
              {product.name}
            </h1>
            <p className="text-3xl font-bold mb-10 tracking-tight opacity-90">${product.price.toFixed(2)}</p>
            
            <Separator className="mb-10 opacity-10" />
            
            <div className="space-y-12 mb-16">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 opacity-40">The Narrative</h3>
                <p className="opacity-70 leading-relaxed max-w-lg text-lg font-light">{product.description}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Select Proportions</h3>
                  <button className="text-[8px] uppercase tracking-[0.3em] font-bold border-b border-foreground/20 pb-1 opacity-40 hover:opacity-100 transition-all">Dimension Guide</button>
                </div>
                <div className="flex gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                        selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'border-border opacity-60 hover:border-foreground hover:opacity-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-auto">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-10 rounded-none uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4 transition-all hover:opacity-90 active:scale-95 shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Order
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toggleFavorite(parseInt(id))}
                className={`w-20 h-20 rounded-none border-2 transition-all ${isFavorite ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary'}`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-primary' : ''}`} />
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-12 py-10 border-t border-border/50">
              <div>
                <h4 className="text-[8px] font-bold uppercase tracking-[0.3em] mb-3 opacity-40">Logistics</h4>
                <p className="text-[10px] opacity-60 leading-relaxed uppercase tracking-widest">Global express shipping. Carbon neutral transit.</p>
              </div>
              <div>
                <h4 className="text-[8px] font-bold uppercase tracking-[0.3em] mb-3 opacity-40">Resolution</h4>
                <p className="text-[10px] opacity-60 leading-relaxed uppercase tracking-widest">30-day architectural return policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artificial Intelligence Curated Selection */}
      <div className="mt-40 border-t border-border pt-32">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.8em] font-black opacity-40 mb-4">Curated For You</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Related <span className="text-primary/50 italic font-serif lowercase tracking-normal">Silhouettes</span></h3>
        </div>
        <ProductGrid title="More Selections" />
      </div>

      {/* Sticky Purchase Bar */}
      <motion.div 
        style={{ opacity: showStickyBar, y: stickyBarY }}
        className="fixed bottom-0 left-0 w-full z-40 bg-background/80 backdrop-blur-xl border-t border-border py-4 px-6 md:px-12 flex justify-between items-center hidden md:flex"
      >
        <div className="flex items-center gap-6">
          <div className="relative w-12 h-16 bg-accent/5">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-tight">{product.name}</h4>
            <p className="text-xs font-bold opacity-60">${product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 flex items-center justify-center text-[10px] font-bold transition-all duration-300 border ${
                  selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'border-border opacity-60 hover:border-foreground hover:opacity-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground px-10 py-6 rounded-none uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl"
          >
            <ShoppingBag className="w-4 h-4" /> Add
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default ProductDetailPage;
