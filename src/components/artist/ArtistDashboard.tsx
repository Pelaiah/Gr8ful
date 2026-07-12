'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Globe, ShieldCheck, BarChart3, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistProfile from './ArtistProfile';
import TicketCard from '@/components/ui/TicketCard';
import ProductCard from '@/components/merch/ProductCard';

interface ArtistDashboardProps {
  onStartOnboarding: () => void;
  onAudienceMode: () => void;
}

export default function ArtistDashboard({ onStartOnboarding, onAudienceMode }: ArtistDashboardProps) {
  return (
    <main className="min-h-screen bg-[#F5F5F7] text-zinc-900">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter">GR8FUL.</h1>
        <div className="flex items-center gap-4">
           <Button 
            variant="outline" 
            className="rounded-full text-[10px] font-black uppercase h-8 border-2"
            onClick={onAudienceMode}
           >
             Audience Mode
           </Button>
           <Button variant="ghost" size="icon" className="rounded-full">
             <User size={20} />
           </Button>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-12">
        <Tabs defaultValue="artist" className="w-full">
          <TabsList className="bg-zinc-200/50 p-1 rounded-full mb-8">
            <TabsTrigger value="artist" className="rounded-full px-8 font-bold data-[state=active]:bg-white">
              Artist Hub
            </TabsTrigger>
            <TabsTrigger value="tickets" className="rounded-full px-8 font-bold data-[state=active]:bg-white">
              Event Tickets
            </TabsTrigger>
            <TabsTrigger value="merch" className="rounded-full px-8 font-bold data-[state=active]:bg-white">
              Storefront
            </TabsTrigger>
          </TabsList>

          <TabsContent value="artist" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
               <div className="space-y-6 pt-12">
                 <h2 className="text-6xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
                   THE OS FOR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AUTONOMOUS</span> <br/>CREATORS.
                 </h2>
                 <p className="text-xl text-zinc-500 font-medium max-w-md">
                   Manage your drops, analytics, and rights in one glassmorphic ERP. 100% ownership. Zero algorithms.
                 </p>
                 <div className="flex gap-4">
                   <Button size="lg" className="rounded-full h-14 px-8 font-black text-lg bg-zinc-900" onClick={onStartOnboarding}>
                     <Rocket className="mr-2 w-5 h-5" /> Start Onboarding
                   </Button>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-12">
                    <div className="p-5 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-2">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                            <Zap size={16} className="text-purple-600" />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-tight">Campaign Engine</h4>
                        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Automated rollouts, pre-save funnels & smart budget mapping.</p>
                    </div>
                    <div className="p-5 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-2">
                        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                            <Globe size={16} className="text-pink-600" />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-tight">Identity Sync</h4>
                        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Omni-channel scheduling across TikTok, Instagram & YouTube.</p>
                    </div>
                    <div className="p-5 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <BarChart3 size={16} className="text-blue-600" />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-tight">Deep Analytics</h4>
                        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Cross-platform growth maps & granular audience demographics.</p>
                    </div>
                    <div className="p-5 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                            <ShieldCheck size={16} className="text-cyan-600" />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-tight">Rights Management</h4>
                        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Lyric forced aligner, escrow desk & 100% catalog ownership.</p>
                    </div>
                 </div>
               </div>
               
               <ArtistProfile 
                 name="Evelyn Smith"
                 handle="evelynsmith"
                 followers="2,425"
                 avatarUrl="https://picsum.photos/seed/evelyn/400/400"
                 bannerUrl="https://picsum.photos/seed/portrait1/800/1200"
               />
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Upcoming Drops</h2>
                <p className="text-zinc-500 font-medium">Cyberpunk gradient wallet stubs.</p>
              </div>
              <Button variant="outline" className="rounded-full border-2 font-bold">View All</Button>
            </div>
            
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x">
              <div className="snap-center">
                <TicketCard 
                  artistName="Nebula Kid"
                  eventName="Void Tour: Phase 1"
                  date="Oct 24, 2024"
                  location="Tokyo Dome"
                  imageUrl="https://picsum.photos/seed/neon1/600/800"
                  price="$89.00"
                />
              </div>
              <div className="snap-center">
                <TicketCard 
                  artistName="Synthwave Queen"
                  eventName="Midnight Echoes"
                  date="Nov 12, 2024"
                  location="Berlin Arena"
                  imageUrl="https://picsum.photos/seed/neon2/600/800"
                  price="$65.00"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="merch" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Exclusive Merch</h2>
                <p className="text-zinc-500 font-medium">Minimalist studio high-end fashion.</p>
              </div>
              <Button variant="outline" className="rounded-full border-2 font-bold">Shop Collection</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ProductCard 
                title="Gr8ful Void Hoodie"
                category="Apparel"
                price="$120"
                imageUrl="https://picsum.photos/seed/hoodie/400/500"
                isNew
              />
              <ProductCard 
                title="Artist Edition Tee"
                category="Apparel"
                price="$45"
                imageUrl="https://picsum.photos/seed/tee/400/500"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
