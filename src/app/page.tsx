'use client';

import { useEffect, useState } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ArtistProfile from '@/components/artist/ArtistProfile';
import AudiencePortal from '@/components/audience/AudiencePortal';
import TicketCard from '@/components/ui/TicketCard';
import ProductCard from '@/components/merch/ProductCard';
import { Button } from '@/components/ui/button';
import { Rocket, Ticket, ShoppingBag, User, Users, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [portalMode, setPortalMode] = useState<'artist' | 'audience'>('audience');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  // Audience Portal Mode
  if (portalMode === 'audience') {
    return (
      <>
        <AudiencePortal />
        {/* Switcher Toggle for Demo */}
        <div className="fixed top-6 right-24 z-[60]">
          <Button 
            variant="ghost" 
            className="bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white rounded-full text-[10px] font-black uppercase px-4 h-8"
            onClick={() => setPortalMode('artist')}
          >
            Artist ERP
          </Button>
        </div>
      </>
    );
  }

  // Artist ERP Mode
  return (
    <main className="min-h-screen bg-[#F5F5F7] text-zinc-900">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter">GR8FUL.</h1>
        <div className="flex items-center gap-4">
           <Button 
            variant="outline" 
            className="rounded-full text-[10px] font-black uppercase h-8 border-2"
            onClick={() => setPortalMode('audience')}
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
                   <Button size="lg" className="rounded-full h-14 px-8 font-black text-lg bg-zinc-900" onClick={() => setShowOnboarding(true)}>
                     <Rocket className="mr-2 w-5 h-5" /> Start Onboarding
                   </Button>
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
              <div className="snap-center">
                <TicketCard 
                  artistName="Bass Master"
                  eventName="Gravity Pulse"
                  date="Dec 05, 2024"
                  location="Brooklyn Steel"
                  imageUrl="https://picsum.photos/seed/neon3/600/800"
                  price="$45.00"
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
              <ProductCard 
                title="Nexus Vinyl (Limited)"
                category="Collectibles"
                price="$60"
                imageUrl="https://picsum.photos/seed/vinyl/400/500"
                isNew
              />
              <ProductCard 
                title="Stargazer Tote"
                category="Accessories"
                price="$35"
                imageUrl="https://picsum.photos/seed/tote/400/500"
              />
            </div>
          </TabsContent>
        </Tabs>

      </div>
      
      {/* Bottom Floating Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-full shadow-2xl px-8 py-4 flex items-center gap-12">
        <button className="text-zinc-900 flex flex-col items-center gap-1">
          <Rocket size={20} />
          <span className="text-[8px] font-black uppercase">Feed</span>
        </button>
        <button className="text-zinc-400 flex flex-col items-center gap-1">
          <Ticket size={20} />
          <span className="text-[8px] font-black uppercase">Tickets</span>
        </button>
        <button className="text-zinc-400 flex flex-col items-center gap-1">
          <ShoppingBag size={20} />
          <span className="text-[8px] font-black uppercase">Shop</span>
        </button>
        <button className="text-zinc-400 flex flex-col items-center gap-1">
          <ShieldCheck size={20} />
          <span className="text-[8px] font-black uppercase">Rights</span>
        </button>
      </div>
    </main>
  );
}