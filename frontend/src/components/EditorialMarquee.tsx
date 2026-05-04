'use client';

import React from 'react';

const EditorialMarquee = ({ text }: { text: string }) => {
  return (
    <div className="py-20 border-y border-foreground/10 overflow-hidden bg-background">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-8xl md:text-[12rem] font-bold uppercase tracking-tighter mx-10 opacity-5 outline-text"
            style={{ WebkitTextStroke: '1px var(--foreground)' }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EditorialMarquee;
