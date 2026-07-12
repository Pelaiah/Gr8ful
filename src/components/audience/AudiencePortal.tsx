'use client';

import React from 'react';
import { 
  Bell, 
  Menu, 
  Search, 
  User, 
  LayoutGrid,
  Users,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ArtistAvatar = ({ imageUrl, isActive }: { imageUrl: string, isActive?: boolean }) => (
  <div className="relative flex-shrink-0">
    <div className="w-16 h-16 rounded-[22px] overflow-hidden border-2 border-white/10 p-0.5">
      <img src={imageUrl} alt="artist" className="w-full h-full object-cover rounded-[18px]" />
    </div>
    {isActive && (
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>
    )}
  </div>
);

const LiveCard = ({ artistName, followers, title, imageUrl, viewers, duration }: { 
  artistName: string, 
  followers: string, 
  title: string, 
  imageUrl: string,
  viewers: string,
  duration: string
}) => (
  <div className="relative w-64 h-96 rounded-[32px] overflow-hidden flex-shrink-0 group cursor-pointer shadow-2xl">
    <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
    
    {/* Card Header */}
    <div className="absolute top-4 left-4 right-4 flex items-center justify-between bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
          <img src={`https://picsum.photos/seed/${artistName}/100/100`} alt={artistName} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white leading-none">{artistName}</span>
          <span className="text-[8px] font-medium text-white/60">{followers} FOLLOWERS</span>
        </div>
      </div>
      <button className="text-[8px] font-bold text-yellow-500 uppercase px-2 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        Follow
      </button>
    </div>

    {/* Drop Title */}
    <div className="absolute bottom-16 left-6 right-6">
      <h3 className="text-white text-3xl font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-wrap">
        {title.split(' ').join('\n')}
      </h3>
    </div>

    {/* Live Stats Footer */}
    <div className="absolute bottom-4 left-4 flex items-center gap-3">
      <div className="flex items-center gap-1.5 bg-orange-600 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
        Live
      </div>
      <div className="flex items-center gap-1 text-white/80 text-[10px] font-bold">
        <div className="w-1 h-1 rounded-full bg-white/60"></div>
        {duration}
      </div>
      <div className="flex items-center gap-1 text-white text-[10px] font-bold">
        <Users size={12} className="text-white/60" />
        {viewers}
      </div>
    </div>
  </div>
);

const PopularCard = ({ date, imageUrl }: { date: string, imageUrl: string }) => (
  <div className="relative w-40 h-56 rounded-[28px] overflow-hidden flex-shrink-0">
    <img src={imageUrl} alt="drop" className="w-full h-full object-cover" />
    <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
      {date}
    </div>
  </div>
);

export default function AudiencePortal() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white pb-32">
      {/* Top Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-xl rotate-45 flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-sm -rotate-45"></div>
          </div>
          <h1 className="text-xl font-black tracking-tight">Gr8ful</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
            <Bell size={20} className="text-white/80" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border border-black"></div>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
            <img src="https://picsum.photos/seed/user1/100/100" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8 px-6">
        
        {/* Following Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest">Your Artists</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a1/100/100" isActive />
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a2/100/100" isActive />
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a3/100/100" isActive />
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a4/100/100" />
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a5/100/100" />
            <ArtistAvatar imageUrl="https://picsum.photos/seed/a6/100/100" />
          </div>
        </section>

        {/* Live Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest">Artists on Live</h2>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
            <div className="snap-center">
              <LiveCard 
                artistName="Marina"
                followers="119"
                title="WINDS OF DESTINY"
                imageUrl="https://picsum.photos/seed/live1/600/900"
                viewers="86.54k"
                duration="2m"
              />
            </div>
            <div className="snap-center">
              <LiveCard 
                artistName="Kaelen"
                followers="425"
                title="NEON VOYAGE"
                imageUrl="https://picsum.photos/seed/live2/600/900"
                viewers="12.2k"
                duration="15m"
              />
            </div>
            <div className="snap-center">
              <LiveCard 
                artistName="Zora"
                followers="88"
                title="VOID PULSE"
                imageUrl="https://picsum.photos/seed/live3/600/900"
                viewers="4.1k"
                duration="1h"
              />
            </div>
          </div>
        </section>

        {/* Popular Drops */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest">Popular Drops</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            <PopularCard date="18th Oct" imageUrl="https://picsum.photos/seed/pop1/400/600" />
            <PopularCard date="20th Oct" imageUrl="https://picsum.photos/seed/pop2/400/600" />
            <PopularCard date="22nd Oct" imageUrl="https://picsum.photos/seed/pop3/400/600" />
            <PopularCard date="25th Oct" imageUrl="https://picsum.photos/seed/pop4/400/600" />
          </div>
        </section>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-6 right-6 flex items-center justify-around bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[28px] py-4 px-2 shadow-2xl z-50">
        <button className="text-white/40 hover:text-white transition-colors">
          <Menu size={24} />
        </button>
        <button className="relative p-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl blur-md opacity-50"></div>
          <div className="relative bg-black rounded-xl p-2 border border-white/20">
            <LayoutGrid size={24} className="text-white" />
          </div>
        </button>
        <button className="text-white/40 hover:text-white transition-colors">
          <Search size={24} />
        </button>
        <button className="text-white/40 hover:text-white transition-colors">
          <Bell size={24} />
        </button>
        <button className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
          <img src="https://picsum.photos/seed/user1/100/100" alt="user" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
}