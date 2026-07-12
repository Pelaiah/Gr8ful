'use client';

import React from 'react';
import { 
  X, 
  MoreHorizontal, 
  Flame, 
  Zap, 
  Globe, 
  Info, 
  UserCheck, 
  Plus,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ArtistProfileProps {
  name: string;
  handle: string;
  followers: string;
  avatarUrl: string;
  bannerUrl: string;
  onClose?: () => void;
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.342 6.342 0 0 1-1.89-1.51v7.53c.01 4.76-4.03 8.67-8.87 8.14-5.257-.57-8.82-5.91-7.07-10.83 1.25-3.51 5.25-5.51 8.78-4.34.81.27 1.54.74 2.11 1.35.03-3.003.01-6.007.01-9.007l.15-.02z"/>
  </svg>
);

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.466-1.028.249-2.815-1.72-6.36-2.111-10.536-1.157-.404.093-.811-.161-.904-.565-.093-.404.161-.811.565-.904 4.568-1.045 8.487-.6 11.654 1.336.353.217.465.676.249 1.041zm1.469-3.264c-.272.443-.852.585-1.295.313-3.221-1.979-8.131-2.556-11.94-1.399-.498.151-1.023-.131-1.174-.629s.131-1.023.629-1.174c4.356-1.321 9.778-.669 13.467 1.594.443.272.585.852.313 1.295zm.131-3.418C15.228 8.169 8.79 7.956 5.034 9.096c-.596.181-1.233-.153-1.414-.75s.153-1.233.75-1.414c4.302-1.306 11.414-1.054 16.035 1.685.536.319.714 1.011.395 1.547-.319.537-1.011.714-1.547.396z"/>
  </svg>
);

const Badge = ({ icon: Icon, label, colorClass, shapeClass }: { icon: any, label: string, colorClass: string, shapeClass: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={cn(
      "w-16 h-16 flex items-center justify-center relative shadow-lg",
      colorClass,
      shapeClass
    )}>
      <Icon className="w-8 h-8 text-white" fill="currentColor" />
    </div>
    <span className="text-[10px] font-bold text-white/90 tracking-tight uppercase">{label}</span>
  </div>
);

const SocialCard = ({ title, avatars, count }: { title: string, avatars: string[], count: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center gap-1 border border-white/10">
      <div className="flex -space-x-2">
        {avatars.map((url, i) => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] overflow-hidden">
            <img src={url} alt="social" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-[#1A1A1A] text-black text-[10px] font-bold">
          +{count}
        </div>
      </div>
    </div>
    <span className="text-[10px] font-bold text-white/50 tracking-tight uppercase">{title}</span>
  </div>
);

const CatalogItem = ({ index, title, artist, duration, imageUrl }: { index: number, title: string, artist: string, duration: string, imageUrl: string }) => (
  <div className="w-full flex items-center gap-4 group cursor-pointer">
    <span className="text-white/30 text-xs font-bold w-4">{index}</span>
    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Play size={16} fill="white" className="text-white" />
      </div>
    </div>
    <div className="flex-1 min-w-0 text-left">
      <h4 className="text-sm font-bold truncate">{title}</h4>
      <p className="text-[10px] font-medium text-white/50 truncate uppercase tracking-tighter">{artist}</p>
    </div>
    <span className="text-[10px] font-bold text-white/30">{duration}</span>
  </div>
);

export default function ArtistProfile({
  name,
  handle,
  followers,
  avatarUrl,
  bannerUrl,
  onClose
}: ArtistProfileProps) {
  const catalog = [
    { title: "Midnight Echoes", artist: name, duration: "3:42", imageUrl: "https://picsum.photos/seed/track1/100/100" },
    { title: "Neon Voyage", artist: name, duration: "2:58", imageUrl: "https://picsum.photos/seed/track2/100/100" },
    { title: "Void Pulse", artist: name, duration: "4:15", imageUrl: "https://picsum.photos/seed/track3/100/100" },
    { title: "Stargazer", artist: name, duration: "3:20", imageUrl: "https://picsum.photos/seed/track4/100/100" },
    { title: "Winds of Destiny", artist: name, duration: "3:55", imageUrl: "https://picsum.photos/seed/track5/100/100" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden bg-black text-white h-[90vh] rounded-[48px] shadow-2xl border-[8px] border-zinc-900">
      {/* Background Layer (Fixed) */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bannerUrl} 
          alt="Artist Banner" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Header Navigation (Fixed on top) */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 pt-12 bg-gradient-to-b from-black/40 to-transparent">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-white/80 tracking-tight">gr8ful.app/@{handle}</span>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Scrollable Content Container */}
      <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar pt-24 pb-12">
        <div className="flex flex-col items-center px-8 text-center">
          
          {/* Floating Badges Section */}
          <div className="flex justify-center gap-6 mt-4 mb-8">
            <Badge 
              icon={() => (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white" />
                </svg>
              )} 
              label="Orb Featured" 
              colorClass="bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500" 
              shapeClass="rounded-[20px] rotate-12"
            />
            <Badge 
              icon={Flame} 
              label="Top Artist" 
              colorClass="bg-[#222] border-4 border-white/20" 
              shapeClass="rounded-full [mask-image:radial-gradient(circle_at_center,black_70%,transparent_100%)] after:content-[''] after:absolute after:inset-0 after:border-dashed after:border-2 after:border-white/40 after:rounded-full"
            />
            <Badge 
              icon={Zap} 
              label="Top Collector" 
              colorClass="bg-gradient-to-r from-blue-500 to-red-500" 
              shapeClass="rounded-full w-20 scale-x-125"
            />
          </div>

          {/* Profile Details */}
          <div className="w-28 h-28 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl mb-6 relative shrink-0">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-1">{name}</h1>
          <div className="flex gap-2 text-xs font-bold text-white/60 mb-4">
            <span>{followers} Followers</span>
            <span>377 Follow</span>
            <span>14 Clubs</span>
          </div>
          
          <p className="text-sm font-medium text-white/70 max-w-[240px] leading-relaxed mb-6">
            independent artist / producer<br/>autonomy is everything
          </p>

          {/* Social Links Bar */}
          <div className="flex gap-5 mb-8 bg-white/5 backdrop-blur-xl px-8 py-3.5 rounded-full border border-white/10">
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <SpotifyIcon className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <TikTokIcon className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Youtube className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Facebook className="w-5 h-5" />
            </button>
          </div>

          {/* Small Action Buttons */}
          <div className="flex gap-2 mb-8">
            <Button variant="secondary" className="h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase hover:bg-white/20 px-4">
              <Info className="w-3 h-3 mr-1.5" /> About
            </Button>
            <Button variant="secondary" className="h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase hover:bg-white/20 px-4">
              <Globe className="w-3 h-3 mr-1.5" /> gr8ful.app/@{handle}
            </Button>
          </div>

          {/* Social Context Cards */}
          <div className="flex gap-6 mb-10 w-full justify-center">
            <SocialCard 
              title="friends follow" 
              count="33" 
              avatars={[
                "https://picsum.photos/seed/u1/100/100",
                "https://picsum.photos/seed/u2/100/100",
                "https://picsum.photos/seed/u3/100/100"
              ]} 
            />
            <SocialCard 
              title="mutual clubs" 
              count="2" 
              avatars={[
                "https://picsum.photos/seed/c1/100/100",
                "https://picsum.photos/seed/c2/100/100"
              ]} 
            />
          </div>

          {/* Primary Action Button */}
          <Button className="w-full h-16 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 mb-12">
            <UserCheck className="w-6 h-6" /> Follow
          </Button>

          {/* Catalog Section */}
          <div className="w-full text-left space-y-6 pb-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tighter">Catalog</h3>
                <span className="text-[10px] font-bold text-white/50 uppercase">View All</span>
             </div>
             <div className="space-y-4">
                {catalog.map((item, idx) => (
                  <CatalogItem 
                    key={idx}
                    index={idx + 1}
                    title={item.title}
                    artist={item.artist}
                    duration={item.duration}
                    imageUrl={item.imageUrl}
                  />
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
