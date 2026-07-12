'use client';

import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  category: string;
  price: string;
  imageUrl: string;
  isNew?: boolean;
}

export default function ProductCard({
  title,
  category,
  price,
  imageUrl,
  isNew
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col space-y-3 bg-white p-4 rounded-2xl transition-all duration-300 hover:shadow-2xl">
      {/* Product Shot Frame */}
      <div className="aspect-[4/5] w-full bg-[#F5F5F7] rounded-xl overflow-hidden relative flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-4/5 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {isNew && (
          <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
            New
          </div>
        )}

        {/* Floating Quick Add */}
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
           <ShoppingBag size={18} className="text-zinc-900" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{category}</p>
            <h3 className="text-zinc-900 font-bold text-sm tracking-tight">{title}</h3>
          </div>
          <span className="text-zinc-900 font-black text-sm">{price}</span>
        </div>
        
        <div className="flex items-center text-zinc-400 gap-1 text-[10px] font-medium pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
           View Details <ArrowUpRight size={10} />
        </div>
      </div>
    </div>
  );
}