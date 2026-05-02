'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette, Zap, Sparkles, Diamond } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-2 outline-none">
        <Palette className="w-5 h-5" />
        <span className="text-[10px] uppercase tracking-widest hidden lg:inline font-bold">Identity</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 rounded-none border-border bg-background shadow-2xl">
        <DropdownMenuItem 
          onClick={() => setTheme('luxury')}
          className={`flex items-center gap-3 p-3 rounded-none cursor-pointer ${theme === 'luxury' ? 'bg-primary text-primary-foreground' : 'hover:bg-neutral-100'}`}
        >
          <Diamond className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold">Minimal Luxury</span>
            <span className="text-[8px] opacity-70">The Zara Vibe</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('streetwear')}
          className={`flex items-center gap-3 p-3 rounded-none cursor-pointer ${theme === 'streetwear' ? 'bg-primary text-primary-foreground' : 'hover:bg-neutral-100'}`}
        >
          <Zap className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold">Streetwear</span>
            <span className="text-[8px] opacity-70">Bold & Edgy</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('boutique')}
          className={`flex items-center gap-3 p-3 rounded-none cursor-pointer ${theme === 'boutique' ? 'bg-primary text-primary-foreground' : 'hover:bg-neutral-100'}`}
        >
          <Sparkles className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold">Boutique</span>
            <span className="text-[8px] opacity-70">Soft & Elegant</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
