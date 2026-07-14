'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Disc, 
  Calendar as CalendarIcon, 
  Briefcase,
  User,
  Plus,
  Zap,
  Globe,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Wallet,
  Music,
  ArrowUpRight,
  Mic2,
  LayoutGrid,
  Search
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartConfig 
} from "@/components/ui/chart";
import { 
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip
} from "recharts";
import { cn } from '@/lib/utils';

interface ArtistDashboardProps {
  onStartOnboarding: () => void;
  onAudienceMode: () => void;
  onViewProfile: () => void;
}

type ArtistTab = 'analytics' | 'rollouts' | 'planner' | 'escrow';

const chartData = [
  { day: 'Mon', streams: 4000, tiktok: 2400 },
  { day: 'Tue', streams: 3000, tiktok: 1398 },
  { day: 'Wed', streams: 2000, tiktok: 9800 },
  { day: 'Thu', streams: 2780, tiktok: 3908 },
  { day: 'Fri', streams: 1890, tiktok: 4800 },
  { day: 'Sat', streams: 2390, tiktok: 3800 },
  { day: 'Sun', streams: 3490, tiktok: 4300 },
];

const chartConfig = {
  streams: {
    label: "Spotify Streams",
    color: "hsl(var(--neon-purple))",
  },
  tiktok: {
    label: "TikTok Views",
    color: "hsl(var(--neon-pink))",
  },
} satisfies ChartConfig;

export default function ArtistDashboard({ onStartOnboarding, onAudienceMode, onViewProfile }: ArtistDashboardProps) {
  const [activeTab, setActiveTab] = useState<ArtistTab>('analytics');

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-zinc-900 pb-32">
      {/* Top Navigation */}
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
           <Button variant="ghost" size="icon" className="rounded-full" onClick={onViewProfile}>
             <User size={20} />
           </Button>
        </div>
      </nav>

      <div className="pt-24 px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Page 1: Control Center (Dashboard & Analytics) */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <header>
               <h2 className="text-4xl font-black tracking-tighter">Control Center</h2>
               <p className="text-zinc-500 font-medium">Real-time telemetry and listener conversion.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Live Listeners" value="1,240" trend="+12%" color="text-purple-600" />
              <StatCard label="TikTok Spike" value="142k" trend="+88%" color="text-pink-600" />
              <StatCard label="Wallet Balance" value="$12,450" trend="Ready" color="text-green-600" />
              <StatCard label="Catalog Value" value="$2.4M" trend="Locked" color="text-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Social-to-Stream Correlation</h3>
                    <p className="text-xs text-zinc-400 font-bold uppercase">Telemetry Correlation Graph</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[10px] font-bold text-zinc-400 uppercase">Spotify</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500"></div><span className="text-[10px] font-bold text-zinc-400 uppercase">TikTok</span></div>
                  </div>
                </div>
                
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fontWeight: 700}} 
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="streams" 
                      stroke="#9333ea" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorStreams)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tiktok" 
                      stroke="#ec4899" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorTikTok)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-6">
                 <h3 className="text-xl font-black tracking-tight">Geographic Heatmap</h3>
                 <div className="aspect-square bg-zinc-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-zinc-200 relative overflow-hidden group">
                    <img 
                      src="https://picsum.photos/seed/map/400/400" 
                      alt="map" 
                      className="w-full h-full object-cover opacity-20 grayscale" 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-2">
                       <MapPin className="text-zinc-300 w-12 h-12" />
                       <p className="text-xs font-black uppercase text-zinc-400">High Concentration Regions</p>
                       <p className="text-xs text-zinc-400">London, UK • Berlin, DE • Tokyo, JP</p>
                    </div>
                    {/* Hotspots */}
                    <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-500 rounded-full blur-md animate-pulse"></div>
                 </div>
                 <Button className="w-full rounded-full h-12 bg-zinc-900 font-bold">Plan Tour Route</Button>
              </div>
            </div>

            <div className="p-8 bg-zinc-900 text-white rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                    <Wallet className="text-green-400" /> $12,450.00
                  </h3>
                  <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Accumulated Revenue Portfolio</p>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                 <Button className="flex-1 md:flex-none h-14 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white font-black uppercase text-xs tracking-widest">Withdraw to Wallet</Button>
                 <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-full border-2 border-white/20 bg-white/5 font-black uppercase text-xs tracking-widest">KYC Settings</Button>
               </div>
            </div>
          </div>
        )}

        {/* Page 2: Release Studio (The Rollout Controller) */}
        {activeTab === 'rollouts' && (
          <div className="space-y-8">
            <header className="flex items-center justify-between">
               <div>
                 <h2 className="text-4xl font-black tracking-tighter">Release Studio</h2>
                 <p className="text-zinc-500 font-medium">Orchestrate tracklists and asset distribution.</p>
               </div>
               <Button className="rounded-full h-12 px-6 bg-zinc-900 font-bold"><Plus className="mr-2 h-4 w-4" /> Initialize Project</Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Disc size={32} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black tracking-tight">EP & Album Creator</h3>
                        <p className="text-sm text-zinc-400 font-bold uppercase">Asset distribution pipeline</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                    {['Track 1: Midnight Echoes', 'Track 2: Void Pulse'].map((track, i) => (
                      <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between group cursor-pointer hover:border-purple-500/50">
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-zinc-300">0{i+1}</span>
                            <span className="font-bold">{track}</span>
                         </div>
                         <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus size={16} />
                         </Button>
                      </div>
                    ))}
                    <div className="p-4 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center py-8 space-y-2">
                       <Music className="text-zinc-300" />
                       <span className="text-xs font-black uppercase text-zinc-400">Add Track / Master File</span>
                    </div>
                  </div>
               </div>

               <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-pink-50 flex items-center justify-center text-pink-600">
                        <Mic2 size={32} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black tracking-tight">Lyric Forced Aligner</h3>
                        <p className="text-sm text-zinc-400 font-bold uppercase">Pixel-precise word mapping</p>
                     </div>
                  </div>
                  <div className="aspect-video bg-zinc-900 rounded-3xl relative overflow-hidden group">
                     {/* Waveform Mockup */}
                     <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-8">
                        {Array.from({length: 60}).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-[3px] bg-purple-500/40 rounded-full transition-all group-hover:bg-purple-500"
                            style={{ height: `${Math.random() * 60 + 20}%` }}
                          ></div>
                        ))}
                     </div>
                     <div className="absolute inset-x-0 bottom-8 px-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center">
                           <p className="text-white font-black text-sm tracking-tight uppercase">I've been tryna call, I've been on my own...</p>
                        </div>
                     </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-full h-12 border-2 font-bold">Open Waveform Editor</Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-zinc-100 rounded-[3rem] border border-zinc-200 space-y-4">
                  <h3 className="font-black tracking-tight">Pre-Save Funnel Builder</h3>
                  <p className="text-sm text-zinc-500">Deploy landing pages for Spotify, Apple Music, and YouTube.</p>
                  <Button className="w-full rounded-full bg-white text-zinc-900 border border-zinc-200 font-bold h-12">Configure Funnel</Button>
               </div>
               <div className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-[3rem] space-y-4">
                  <h3 className="font-black tracking-tight">Smart Budget Planner</h3>
                  <p className="text-sm text-white/80">Map marketing costs against incoming storefront revenue.</p>
                  <Button variant="outline" className="w-full rounded-full border-2 border-white/20 bg-white/5 text-white font-bold h-12">Open Terminal</Button>
               </div>
            </div>
          </div>
        )}

        {/* Page 3: Content & Live Planner */}
        {activeTab === 'planner' && (
          <div className="space-y-8">
            <header>
               <h2 className="text-4xl font-black tracking-tighter">Content & Live Planner</h2>
               <p className="text-zinc-500 font-medium">Unified visual calendar for omni-channel pushes.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black tracking-tight uppercase tracking-widest text-xs text-zinc-400">Campaign Rollout Calendar</h3>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full"><LayoutGrid size={16} /></Button>
                        <Button variant="ghost" size="icon" className="rounded-full bg-zinc-100"><Disc size={16} /></Button>
                     </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                      <div key={d} className="text-center text-[10px] font-black text-zinc-300 py-2">{d}</div>
                    ))}
                    {Array.from({length: 28}).map((_, i) => (
                      <div key={i} className={cn(
                        "aspect-square rounded-2xl flex items-center justify-center text-sm font-bold border border-zinc-50 relative group cursor-pointer",
                        i === 14 ? "bg-purple-600 text-white" : "bg-zinc-50 hover:bg-zinc-100 text-zinc-400"
                      )}>
                        {i + 1}
                        {i === 10 && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>}
                        {i === 18 && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>}
                      </div>
                    ))}
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-6">
                     <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-xl font-black tracking-tight">Livestream Command</h3>
                     <p className="text-xs text-zinc-500 font-medium">Schedule interactive live sessions and direct push notifications.</p>
                     <Button className="w-full rounded-full h-12 bg-zinc-900 font-bold">Initialize Broadcast</Button>
                  </div>
                  <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-zinc-400">Scheduled Asset Push</h4>
                     <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                           <Globe size={18} />
                        </div>
                        <div>
                           <p className="text-xs font-bold">TikTok Teaser #2</p>
                           <p className="text-[10px] text-zinc-400">Auto-publish in 4h 22m</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Page 4: Collaboration & Rights Console */}
        {activeTab === 'escrow' && (
          <div className="space-y-8">
            <header>
               <h2 className="text-4xl font-black tracking-tighter">Escrow & Rights</h2>
               <p className="text-zinc-500 font-medium">Autonomous legal governance and project management.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-green-50 flex items-center justify-center text-green-600">
                        <Briefcase size={32} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black tracking-tight">Escrow Collaboration</h3>
                        <p className="text-sm text-zinc-400 font-bold uppercase">Contract security & payouts</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {['Master Sync License: "Urban Flow"', 'Custom Feature: Project X'].map((brief, i) => (
                       <div key={i} className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 space-y-4">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold">{brief}</h4>
                             <span className="text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-600 px-2 py-0.5 rounded">Active Escrow</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="h-2 flex-1 bg-zinc-200 rounded-full overflow-hidden">
                                <div className="h-full w-[40%] bg-green-500"></div>
                             </div>
                             <span className="text-[10px] font-bold text-zinc-400 uppercase">Wait for File Upload</span>
                          </div>
                          <Button variant="outline" className="w-full rounded-full font-bold border-2">Manage Desk</Button>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center text-white">
                        <ShieldCheck size={32} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black tracking-tight">Catalog Governance</h3>
                        <p className="text-sm text-zinc-400 font-bold uppercase">Metadata locks & ownership</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     <div className="p-6 bg-zinc-50 rounded-3xl space-y-2">
                        <h4 className="text-xs font-black uppercase text-zinc-400">ISRC/ISWC Registry</h4>
                        <p className="text-sm font-bold">14 active registrations verified by protocol.</p>
                     </div>
                     <div className="p-6 bg-red-50 rounded-3xl space-y-2 border border-red-100">
                        <h4 className="text-xs font-black uppercase text-red-400">Global Catalog Takedown</h4>
                        <p className="text-sm font-bold text-red-900">Execute immediate global asset withdrawal.</p>
                        <Button variant="destructive" className="w-full rounded-full font-black uppercase text-[10px] tracking-widest mt-2">Trigger Takedown</Button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Artist Floating Bottom Nav */}
      <div className="fixed bottom-8 left-6 right-6 flex items-center justify-around bg-white/80 backdrop-blur-2xl border border-zinc-200 rounded-[32px] py-4 px-2 shadow-2xl z-50">
        <NavButton 
          icon={BarChart3} 
          label="Analytics" 
          isActive={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')} 
        />
        <NavButton 
          icon={Disc} 
          label="Rollouts" 
          isActive={activeTab === 'rollouts'} 
          onClick={() => setActiveTab('rollouts')} 
        />
        <div className="relative -top-10">
          <button 
            className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-transform hover:scale-110"
            onClick={onStartOnboarding}
          >
            <Plus className="text-white w-8 h-8" />
          </button>
        </div>
        <NavButton 
          icon={CalendarIcon} 
          label="Planner" 
          isActive={activeTab === 'planner'} 
          onClick={() => setActiveTab('planner')} 
        />
        <NavButton 
          icon={Briefcase} 
          label="Escrow" 
          isActive={activeTab === 'escrow'} 
          onClick={() => setActiveTab('escrow')} 
        />
      </div>
    </main>
  );
}

function NavButton({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 px-4 transition-all duration-300",
        isActive ? "text-zinc-900 scale-110" : "text-zinc-400 hover:text-zinc-600"
      )}
    >
      <Icon size={24} className={isActive ? "fill-current/10" : ""} />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function StatCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-2">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</h4>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-black tracking-tight">{value}</span>
        <span className={cn("text-[10px] font-black uppercase", color)}>{trend}</span>
      </div>
    </div>
  );
}
