'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const AddToCartButton = ({ onClick, className }: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    onClick(e);
    
    // Reset after some time
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      animate={{
        width: isAdded ? 'auto' : '100%',
        backgroundColor: isAdded ? 'var(--primary)' : 'var(--background)',
        color: isAdded ? 'var(--primary-foreground)' : 'var(--foreground)',
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30, 
        mass: 1 
      }}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-4 rounded-none overflow-hidden h-14 min-w-[140px]",
        "border border-transparent transition-all",
        !isAdded && "hover:bg-primary hover:text-primary-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isAdded ? (
          <motion.div
            key="add"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to Cart</span>
          </motion.div>
        ) : (
          <motion.div
            key="added"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ 
              duration: 0.4,
              times: [0, 0.6, 1],
              ease: "easeOut"
            }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Added</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tactile micro-bounce element */}
      {isAdded && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white/20 rounded-full"
        />
      )}
    </motion.button>
  );
};
