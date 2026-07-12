'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  User, 
  BarChart3, 
  Ticket, 
  ShieldCheck, 
  Globe, 
  Zap,
  Plus,
  LayoutGrid
} from 'lucide-react';
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
      {/* Top ERP Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black tracking-tighter">GR8FUL.</h1>
          <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white px-2 py-0.5 rounded">ERP v1.0</span>
        </div>
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
        <Tabs defaultValue="hub" className="w-full">
          <TabsList className="bg-zinc-200/50 p-1 rounded-full mb-8 flex-wrap h-auto">
            <TabsTrigger value="hub" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-white">
              Artist Hub
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-white">
              Campaign Engine
            </TabsTrigger>
            <TabsTrigger value="sync" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-white">
              Identity Sync
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="rights" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-white">
              Governance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hub" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
               <div className="space-y-6 pt-12">
                 <h2 className="text-5xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
                   Welcome back, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Evelyn.</span>
                 </h2>
                 <p className="text-lg text-zinc-500 font-medium max-w-md">
                   You have 3 active campaigns and 2 upcoming drops. Your catalog is performing 12% above last month.
                 </p>
                 <div className="flex gap-4">
                   <Button size="lg" className="rounded-full h-14 px-8 font-black text-lg bg-zinc-900" onClick={onStartOnboarding}>
                     <Rocket className="mr-2 w-5 h-5" /> Launch Quick Drop
                   </Button>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-12">
                    <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                            <BarChart3 size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm uppercase tracking-tight">Active Fans</h4>
                          <p className="text-2xl font-black text-zinc-900">24,250</p>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                        <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center">
                            <Ticket size={20} className="text-pink-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm uppercase tracking-tight">Ticket Revenue</h4>
                          <p className="text-2xl font-black text-zinc-900">$12,450</p>
                        </div>
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

          <TabsContent value="campaigns" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Release & Campaign Engine</h2>
                <p className="text-zinc-500 font-medium">Orchestrate project cycles without traditional labels.</p>
              </div>
              <Button className="rounded-full bg-zinc-900 font-bold"><Plus className="mr-2 h-4 w-4" /> New Campaign</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[2rem] border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300">
                  <LayoutGrid size={32} />
                </div>
                <h3 className="text-xl font-bold">EP / Album Builder</h3>
                <p className="text-sm text-zinc-400 max-w-xs">Structure tracklists, upload high-res art, and distribute via integrated APIs.</p>
                <Button variant="outline" className="rounded-full border-2 font-bold">Initialize Builder</Button>
              </div>
              <div className="p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Rocket size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Active</span>
                </div>
                <h3 className="text-xl font-bold">"Void Pulse" Drop</h3>
                <p className="text-sm text-zinc-500">Pre-save funnel analytics for your upcoming single.</p>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase">
                  <span>Pre-saves: 4.2k</span>
                  <span>Goal: 10k</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Digital Identity Sync</h2>
                <p className="text-zinc-500 font-medium">Manage cross-platform social footprints natively.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['TikTok', 'Instagram', 'YouTube'].map((platform) => (
                <div key={platform} className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                      <Globe size={18} />
                    </div>
                    <h3 className="font-bold">{platform} Sync</h3>
                  </div>
                  <p className="text-xs text-zinc-500">Omni-channel scheduler active. Last sync: 2 mins ago.</p>
                  <Button variant="outline" className="w-full rounded-full text-xs font-bold border-2">Config API</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Deep Performance Terminal</h2>
                <p className="text-zinc-500 font-medium">Advanced cross-platform behavioral tracking.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-8 bg-zinc-900 text-white rounded-[2.5rem] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Cross-Platform Growth Map</h3>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all hover:scale-105" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">Listener Conversion</h4>
                   <p className="text-3xl font-black">12.4%</p>
                   <p className="text-xs text-green-500 font-bold">↑ 2.1% from last week</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">Merch Velocity</h4>
                   <p className="text-3xl font-black">880 units</p>
                   <p className="text-xs text-zinc-500 font-bold">Active drop: "Void Hoodies"</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rights" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">Governance Console</h2>
                <p className="text-zinc-500 font-medium">100% catalog ownership guaranteed by protocol.</p>
              </div>
              <Button variant="destructive" className="rounded-full font-bold">Catalog Takedown</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-sm space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold">Rights Governance</h3>
                <ul className="space-y-3">
                  {['Lyric forced aligner', 'Escrow desk', 'ISRC/ISWC metadata locks'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                      <Zap size={14} className="text-yellow-500 fill-yellow-500" /> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full rounded-full border-2 font-bold">Manage Assets</Button>
              </div>
              <div className="p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-sm space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-xl font-bold">Collaboration Desk</h3>
                <p className="text-sm text-zinc-500">Autonomous escrow managing boilerplate creative contracts.</p>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                   <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                     <ShieldCheck size={16} />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs font-bold">Active Escrow #882</span>
                     <span className="text-[10px] font-medium text-zinc-400">Sync with "Hyper-Studio"</span>
                   </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
