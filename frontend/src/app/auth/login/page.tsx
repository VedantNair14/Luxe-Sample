'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-background text-foreground flex transition-colors duration-500 overflow-hidden">
      {/* Left side - High-res image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block lg:w-1/2 relative bg-black"
      >
        <Image 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2500" 
          alt="Luxury Fashion" 
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">The<br/>Collection</h2>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 max-w-xs leading-relaxed">Unlock access to exclusive silhouettes and limited drops.</p>
        </div>
      </motion.div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col pt-12 lg:pt-0 relative">
        <div className="absolute top-8 left-8 z-50">
          <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="uppercase tracking-[0.2em] text-[10px] opacity-50 font-bold">
                {isLogin ? 'Sign in to access your luxury account' : 'Join the elite luxe community'}
              </p>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    key="register-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Full Name</label>
                    <Input 
                      placeholder="JOHN DOE" 
                      className="rounded-none bg-accent/5 border-none py-6 text-xs uppercase tracking-widest focus:ring-1 focus:ring-primary shadow-inner"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="NAME@COMPANY.COM" 
                  className="rounded-none bg-accent/5 border-none py-6 text-xs uppercase tracking-widest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Password</label>
                  {isLogin && (
                    <button type="button" className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 hover:text-primary transition-colors">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="rounded-none bg-accent/5 border-none py-6 text-xs tracking-widest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
              
              <Button className="w-full bg-primary text-primary-foreground py-8 rounded-none uppercase tracking-[0.3em] mt-8 font-black transition-all hover:opacity-90 active:scale-95 shadow-xl text-[10px]">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
            
            <div className="mt-12 flex flex-col gap-8">
              <div className="relative w-full text-center">
                <Separator className="absolute top-1/2 left-0 -translate-y-1/2 opacity-30" />
                <span className="relative z-10 bg-background px-6 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">Or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="rounded-none border-border/50 py-6 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-accent/5">Google</Button>
                <Button variant="outline" className="rounded-none border-border/50 py-6 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-accent/5">Apple</Button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary opacity-100 ml-2 hover:opacity-70 transition-all border-b border-primary/30 pb-1"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
