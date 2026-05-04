'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-32 text-foreground transition-colors duration-500">
        <Navbar />
        <div className="container mx-auto px-6 h-[70vh] flex flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-4">Your Bag</h1>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 tracking-tighter">Is <span className="text-primary/50 italic font-serif lowercase tracking-normal">Empty</span></h2>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-12 py-6 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Discover Collection
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
      <Navbar />
      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="mb-16 flex items-center justify-between border-b border-border pb-8">
          <h1 className="text-[10px] uppercase tracking-[0.5em] font-black opacity-50">Review Selection</h1>
          <span className="text-sm font-bold uppercase tracking-widest">{items.length} {items.length === 1 ? 'Silhouette' : 'Silhouettes'}</span>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-8 group"
                >
                  <div className="w-40 h-52 bg-accent/5 overflow-hidden relative shadow-lg">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">{item.name}</h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Size: {item.size || 'M'}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-3 bg-accent/5 hover:bg-accent/10 opacity-50 hover:opacity-100 hover:text-red-500 transition-all rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-border/50">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-accent/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-accent/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-2xl font-black tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-accent/5 p-10 sticky top-32 border border-border shadow-2xl">
              <h2 className="text-[10px] font-black uppercase mb-10 tracking-[0.4em] opacity-50">Summary</h2>
              <div className="space-y-6 mb-10 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase tracking-widest text-[10px]">Logistics</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-primary">Complimentary</span>
                </div>
                <Separator className="bg-border/50 my-6" />
                <div className="flex justify-between items-center text-xl">
                  <span className="font-black uppercase tracking-widest text-[12px]">Total</span>
                  <span className="font-black text-3xl">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full bg-primary text-primary-foreground py-8 rounded-none uppercase tracking-[0.3em] text-[10px] font-black flex items-center justify-center gap-4 group transition-all hover:opacity-90 active:scale-95 shadow-xl mb-6">
                Secure Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 mb-8">
                <LockKeyhole className="w-3 h-3" /> Encrypted Transaction
              </div>
              
              <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-[10px] font-black tracking-widest">VISA</span>
                <span className="text-[10px] font-black tracking-widest">AMEX</span>
                <span className="text-[10px] font-black tracking-widest">PAYPAL</span>
                <span className="text-[10px] font-black tracking-widest">APPLE PAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
