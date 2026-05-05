'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  className?: string;
  label?: string;
}

export const AddToCartButton = ({ onClick, className, label = 'Add to Cart' }: AddToCartButtonProps) => {
  const [state, setState] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleClick = (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (state !== 'idle') return;

    setState('adding');
    onClick(e);

    setTimeout(() => setState('added'), 300);
    setTimeout(() => setState('idle'), 2200);
  };

  return (
    <motion.button
      onClick={(e) => handleClick(e)}
      disabled={state === 'adding'}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative h-14 overflow-hidden flex items-center justify-center gap-2.5 px-6 font-black uppercase tracking-[0.18em] text-[9px] transition-colors duration-300',
        state === 'idle'
          ? 'bg-primary text-primary-foreground hover:opacity-90'
          : state === 'added'
          ? 'bg-green-600 text-white'
          : 'bg-primary text-primary-foreground',
        className
      )}
    >
      {/* Ripple on success */}
      <AnimatePresence>
        {state === 'added' && (
          <motion.span
            key="ripple"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-white/30 rounded-full"
          />
        )}
      </AnimatePresence>

      {/* Icon + text with smooth swap */}
      <AnimatePresence mode="wait" initial={false}>
        {state === 'idle' ? (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            {label}
          </motion.span>
        ) : state === 'adding' ? (
          <motion.span
            key="adding"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full flex-shrink-0"
            />
            Adding…
          </motion.span>
        ) : (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <Check className="w-3.5 h-3.5 flex-shrink-0" />
            Added to Bag
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
