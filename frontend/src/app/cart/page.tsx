'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-32">
        <Navbar />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold uppercase mb-8">Your Cart is Empty</h1>
          <p className="text-neutral-500 mb-12">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Button asChild className="bg-black text-white px-12 py-6 rounded-none uppercase tracking-widest">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Navbar />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold uppercase mb-12 tracking-tighter">Your Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-6 pb-8 border-b border-neutral-100"
              >
                <div className="w-32 h-40 bg-neutral-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight">{item.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">Size: {item.size || 'M'}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-neutral-200">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-neutral-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-neutral-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-8 sticky top-32">
              <h2 className="text-xl font-bold uppercase mb-8 tracking-tight">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="bg-neutral-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full bg-black text-white py-8 rounded-none uppercase tracking-widest flex items-center justify-center gap-2 group">
                Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="mt-8 flex items-center justify-center gap-4 opacity-50 grayscale">
                {/* Payment Icons Placeholder */}
                <span className="text-[10px] uppercase tracking-widest">Visa</span>
                <span className="text-[10px] uppercase tracking-widest">Mastercard</span>
                <span className="text-[10px] uppercase tracking-widest">Amex</span>
                <span className="text-[10px] uppercase tracking-widest">Paypal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
