'use client';

import React from 'react';
import { UserPlus, Share2, MoreHorizontal, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ArtistProfileProps {
  name: string;
  handle: string;
  followers: string;
  avatarUrl: string;
  bannerUrl: string;
}

export default function ArtistProfile({
  name,
  handle,
  followers,
  avatarUrl,
  bannerUrl
}: ArtistProfileProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-black text-white h-[90vh] rounded-[40px] shadow-2xl">
      {/* Background Banner with Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bannerUrl} 
          alt="Artist Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </div>

      {/* Main Profile Content */}
      <div className="relative z-10 flex flex-col h-full p-8 justify-end pb-12 space-y-8">
        
        {/* Floating Achievement Badges Layer */}
        <div className="flex gap-2">
          <div className="glass-card px-4 py-2 rounded-full text-[10px] font-black tracking-tighter uppercase border-cyan-400/30 text-cyan-400">
            Top Global #12
          </div>
          <div className="glass-card px-4 py-2 rounded-full text-[10px] font-black tracking-tighter uppercase border-purple-400/30 text-purple-400">
            Genesis Creator
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative inline-block">
             <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-2xl">
               <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
             </div>
             {/* Verified Badge Asymmetrical Polygon */}
             <div className="absolute -bottom-1 -right-1 bg-cyan-400 p-1.5 rounded-[8px] rotate-12 shadow-lg">
               <div className="w-3 h-3 bg-white rounded-[2px]"></div>
             </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter leading-none">{name}</h1>
            <p className="text-white/60 font-medium tracking-tight">@{handle}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 glass-card rounded-3xl p-6 gap-4">
          <div className="text-center border-r border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Fans</p>
            <p className="text-lg font-black">{followers}</p>
          </div>
          <div className="text-center border-r border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Drops</p>
            <p className="text-lg font-black">24</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Rank</p>
            <p className="text-lg font-black">S1</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1 h-14 rounded-full bg-white text-black font-black text-lg hover:bg-zinc-200 transition-all">
            <UserPlus className="mr-2 w-5 h-5" /> Connect
          </Button>
          <Button variant="outline" size="icon" className="w-14 h-14 rounded-full glass-card border-none hover:bg-white/20">
            <Share2 size={20} />
          </Button>
          <Button variant="outline" size="icon" className="w-14 h-14 rounded-full glass-card border-none hover:bg-white/20">
            <MoreHorizontal size={20} />
          </Button>
        </div>

        {/* Social Links Mini-Icons */}
        <div className="flex justify-center gap-6 pt-4 opacity-40">
           <Instagram size={20} />
           <Twitter size={20} />
           <Youtube size={20} />
        </div>
      </div>
    </div>
  );
}