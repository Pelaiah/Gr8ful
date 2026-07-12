'use client';

import React from 'react';
import { Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  artistName: string;
  eventName: string;
  date: string;
  location: string;
  imageUrl: string;
  price: string;
}

export default function TicketCard({
  artistName,
  eventName,
  date,
  location,
  imageUrl,
  price
}: TicketCardProps) {
  return (
    <div className="relative w-80 group cursor-pointer">
      {/* Cyberpunk Gradient Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[28px] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
      
      <div className="relative flex flex-col w-full h-[480px] bg-zinc-900 rounded-[28px] overflow-hidden ticket-stub">
        {/* Top Half: Visuals */}
        <div className="h-2/3 relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={eventName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex gap-2">
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Event</span>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{artistName}</h4>
            <h3 className="text-white text-2xl font-black leading-none">{eventName}</h3>
          </div>
        </div>

        {/* Separator with notches handled by CSS mask in globals.css */}
        <div className="h-[2px] w-full border-t border-dashed border-white/20 relative"></div>

        {/* Bottom Half: Meta */}
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-400 uppercase">Date</span>
              <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-xs">
                <Calendar size={12} className="text-purple-600" />
                {date}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-400 uppercase">Venue</span>
              <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-xs">
                <MapPin size={12} className="text-pink-600" />
                {location}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-zinc-400 uppercase">Admission</span>
              <span className="text-xl font-black text-zinc-900">{price}</span>
            </div>
            {/* Barcode Mockup */}
            <div className="flex flex-col gap-0.5 items-end">
               <div className="flex gap-0.5 h-8">
                 {[1,2,4,2,1,3,1,2,3,1,4].map((w, i) => (
                   <div key={i} className="bg-zinc-900" style={{ width: `${w}px` }}></div>
                 ))}
               </div>
               <span className="text-[8px] font-mono text-zinc-400">#GR8-992-0X</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}