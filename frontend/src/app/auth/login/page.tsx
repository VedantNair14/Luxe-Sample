'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-24">
      <Navbar />
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1441984966672-9653199659f8?q=80&w=2070" 
          alt="Background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 px-6"
      >
        <Card className="rounded-none border-none shadow-2xl bg-white overflow-hidden">
          <CardHeader className="pt-12 text-center">
            <CardTitle className="text-3xl font-bold uppercase tracking-tighter mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="uppercase tracking-[0.2em] text-[10px]">
              {isLogin ? 'Sign in to access your luxury account' : 'Join the elite luxe community'}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className="rounded-none bg-neutral-50 border-none py-6 text-sm"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="rounded-none bg-neutral-50 border-none py-6 text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
                  {isLogin && (
                    <button type="button" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="rounded-none bg-neutral-50 border-none py-6 text-sm"
                />
              </div>
              <Button className="w-full bg-black text-white py-8 rounded-none uppercase tracking-widest mt-4">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pb-12 pt-0 flex flex-col gap-6">
            <div className="relative w-full text-center">
              <Separator className="absolute top-1/2 left-0 -translate-y-1/2" />
              <span className="relative z-10 bg-white px-4 text-[10px] uppercase tracking-widest text-neutral-400">Or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full px-8">
              <Button variant="outline" className="rounded-none border-neutral-200 py-6 uppercase tracking-widest text-[10px]">Google</Button>
              <Button variant="outline" className="rounded-none border-neutral-200 py-6 uppercase tracking-widest text-[10px]">Apple</Button>
            </div>
            <p className="text-xs text-neutral-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-black font-bold uppercase tracking-widest border-b border-black pb-0.5"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
};

export default AuthPage;
