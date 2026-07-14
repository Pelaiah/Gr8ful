'use client';

import React, { useState } from 'react';
import { 
  X, 
  MoreHorizontal, 
  Flame, 
  Zap, 
  Globe, 
  Info, 
  UserCheck, 
  Instagram,
  Facebook,
  Youtube,
  Play,
  Camera,
  Edit2,
  Settings2,
  Disc,
  Music,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ArtistProfileProps {
  name: string;
  handle: string;
  followers: string;
  avatarUrl: string;
  bannerUrl: string;
  isEditable?: boolean;
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

const CatalogItem = ({ index, title, plays, duration, imageUrl }: { index: number, title: string, plays: string, duration: string, imageUrl: string }) => (
  <div className="w-full flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all">
    <span className="text-white/20 text-[10px] font-black w-4">{index}</span>
    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Play size={16} fill="white" className="text-white" />
      </div>
    </div>
    <div className="flex-1 min-w-0 text-left">
      <h4 className="text-sm font-bold truncate text-white/90">{title}</h4>
      <div className="flex items-center gap-3 mt-1">
         <div className="flex items-center gap-1">
            <Play size={10} className="text-white/40 fill-white/40" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">{plays} plays</span>
         </div>
         <div className="w-0.5 h-0.5 rounded-full bg-white/20"></div>
         <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">{duration}</span>
      </div>
    </div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
       <BarChart3 size={14} className="text-white/40" />
    </div>
  </div>
);

const CatalogSection = ({ title, icon: Icon, items }: { title: string, icon: any, items: any[] }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
            <Icon size={20} />
         </div>
         <h3 className="text-2xl font-black uppercase tracking-tighter">{title}</h3>
      </div>
      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{items.length} Releases</span>
    </div>
    <div className="grid grid-cols-1 gap-2">
      {items.map((item, idx) => (
        <CatalogItem 
          key={idx}
          index={idx + 1}
          title={item.title}
          plays={item.plays}
          duration={item.duration}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  </div>
);

export default function ArtistProfile({
  name,
  handle,
  followers,
  avatarUrl,
  bannerUrl,
  isEditable = false,
  onClose
}: ArtistProfileProps) {
  const { toast } = useToast();

  const albums = [
    { title: "Midnight Echoes", plays: "2.4M", duration: "3:42", imageUrl: "https://picsum.photos/seed/track1/200/200" },
    { title: "Void Pulse: The Anthology", plays: "1.1M", duration: "42:15", imageUrl: "https://picsum.photos/seed/track3/200/200" },
  ];

  const eps = [
    { title: "Neon Voyage", plays: "840k", duration: "12:58", imageUrl: "https://picsum.photos/seed/track2/200/200" },
    { title: "Stargazer EP", plays: "420k", duration: "18:20", imageUrl: "https://picsum.photos/seed/track4/200/200" },
  ];

  const singles = [
    { title: "Winds of Destiny", plays: "124k", duration: "3:55", imageUrl: "https://picsum.photos/seed/track5/200/200" },
    { title: "Digital Silence", plays: "98k", duration: "2:45", imageUrl: "https://picsum.photos/seed/track6/200/200" },
    { title: "Ether Flow", plays: "245k", duration: "3:10", imageUrl: "https://picsum.photos/seed/track7/200/200" },
  ];

  const handleEditMedia = (type: 'banner' | 'avatar') => {
    toast({
      title: "Initialize Media Vault",
      description: `Connecting to secure asset manager for ${type} update...`,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Layer (Fixed) */}
      <div className="fixed inset-0 z-0">
        <img 
          src={bannerUrl} 
          alt="Artist Banner" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Edit Banner Button (Top Layer, Top-Left) */}
      {isEditable && (
        <div className="fixed top-24 left-6 z-[60]">
          <Button 
            onClick={() => handleEditMedia('banner')}
            className="bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 rounded-full h-12 px-6 font-black uppercase tracking-tighter text-xs shadow-2xl transition-all active:scale-95"
          >
            <Camera size={16} className="mr-2" /> Change Banner Asset
          </Button>
        </div>
      )}

      {/* Header Navigation (Fixed on top) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 pt-8 bg-gradient-to-b from-black/60 to-transparent">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-white/80 tracking-tight">gr8ful.app/@{handle}</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 pt-48 pb-24">
        <div className="flex flex-col items-center px-8 text-center max-w-4xl mx-auto">
          
          {/* Floating Badges Section */}
          <div className="flex justify-center gap-6 mb-12">
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
          <div className="relative group mb-8">
            <div className="w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl relative shrink-0">
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full"></div>
            </div>
            {isEditable && (
              <button 
                onClick={() => handleEditMedia('avatar')}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-2 border-dashed border-white/20 z-[61]"
              >
                <Camera size={24} className="mb-1" />
                <span className="text-[10px] font-black uppercase">Edit Photo</span>
              </button>
            )}
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-2 flex items-center gap-4">
            {name}
            {isEditable && <Edit2 size={24} className="text-white/20 cursor-pointer hover:text-white transition-colors" />}
          </h1>
          <div className="flex gap-4 text-sm lg:text-base font-bold text-white/60 mb-8">
            <span>{followers} Followers</span>
            <div className="w-1 h-1 rounded-full bg-white/20 self-center"></div>
            <span>377 Follow</span>
            <div className="w-1 h-1 rounded-full bg-white/20 self-center"></div>
            <span>14 Clubs</span>
          </div>
          
          <p className="text-lg lg:text-xl font-medium text-white/70 max-w-xl leading-relaxed mb-10">
            independent artist / producer<br/>autonomy is everything
          </p>

          {/* Social Links Bar */}
          <div className="flex gap-8 mb-12 bg-white/5 backdrop-blur-xl px-12 py-5 rounded-full border border-white/10">
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <SpotifyIcon className="w-8 h-8" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Instagram className="w-8 h-8" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <TikTokIcon className="w-8 h-8" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Youtube className="w-8 h-8" />
            </button>
            <button className="text-white/40 hover:text-white transition-all transform hover:scale-110">
              <Facebook className="w-8 h-8" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <Button variant="secondary" className="h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-black uppercase hover:bg-white/20 px-8">
              <Info className="w-4 h-4 mr-2" /> About
            </Button>
            <Button variant="secondary" className="h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-black uppercase hover:bg-white/20 px-8">
              <Globe className="w-4 h-4 mr-2" /> gr8ful.app/@{handle}
            </Button>
          </div>

          {/* Social Context Cards */}
          <div className="flex gap-10 mb-16 w-full justify-center">
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
          {isEditable ? (
            <Button className="w-full max-w-md h-20 rounded-[32px] bg-white text-black font-black text-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-4 mb-20">
              <Settings2 className="w-8 h-8" /> Artist Settings
            </Button>
          ) : (
            <Button className="w-full max-w-md h-20 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-4 mb-20">
              <UserCheck className="w-8 h-8" /> Follow
            </Button>
          )}

          {/* Catalog Section */}
          <div className="w-full text-left space-y-16 pb-32">
             <CatalogSection title="Albums" icon={Disc} items={albums} />
             <CatalogSection title="EPs" icon={Disc} items={eps} />
             <CatalogSection title="Singles" icon={Music} items={singles} />
             
             <div className="flex justify-center pt-8">
                <Button variant="ghost" className="text-white/30 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">
                   View Full डिस्कोग्राफी
                </Button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}