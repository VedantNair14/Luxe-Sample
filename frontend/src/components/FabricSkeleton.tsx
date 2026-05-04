'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FabricSkeletonProps {
  className?: string;
}

export const FabricSkeleton = ({ className }: FabricSkeletonProps) => {
  return (
    <div className={cn("relative overflow-hidden bg-neutral-100", className)}>
      <div className="absolute inset-0 shimmer-fabric" />
      {/* Subtle texture overlay to mimic fabric */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="space-y-6">
      <FabricSkeleton className="aspect-[4/5] w-full" />
      <div className="space-y-3">
        <FabricSkeleton className="h-4 w-1/4" />
        <FabricSkeleton className="h-6 w-3/4" />
        <FabricSkeleton className="h-4 w-1/5" />
      </div>
    </div>
  );
};
