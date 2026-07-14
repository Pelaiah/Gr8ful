
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
  TrendingUp,
  MapPin,
  Wallet,
  Music,
  ArrowUpRight,
  Mic2,
  LayoutGrid,
  Search,
  Bell,
  MoreHorizontal,
  Play,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  Settings,
  Users,
  PieChart,
  FileText,
  ShieldCheck,
  Send,
  Video
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent, 
  ChartConfig 
} from "@/components/ui/chart";
import { 
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Pie
} from "recharts";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ArtistDashboardProps {
  onStartOnboarding: () => void;
  onAudienceMode: () => void;
  onViewProfile: () => void;
}

type ArtistTab = 'analytics' | 'releases' | 'planner' | 'escrow';

// Mock Data
const streamData = [
  { name: 'Apr 28', value: 30 },
  { name: 'May 5', value: 45 },
  { name: 'May 12', value: 35 },
  { name: 'May 19', value: 65 },
  { name: 'May 26', value: 55 },
  { name: 'Jun 2', value: 80 },
  { name: 'Jun 9', value: 70 },
];

const sparklineData = [
  { value: 400 }, { value: 300 }, { value: 500 }, { value: 450 }, { value: 600 }, { value: 550 }, { value: 700 }
];

const ageData = [
  { age: '18 - 24', value: 34, color: '#3b82f6' },
  { age: '25 - 34', value: 38, color: '#3b82f6' },
  { age: '35 - 44', value: 17, color: '#3b82f6' },
  { age: '45 - 54', value: 7, color: '#3b82f6' },
  { age: '55+', value: 4, color: '#3b82f6' },
];

const countryData = [
  { name: 'Brazil', value: 18.7, color: '#3b82f6' },
  { name: 'USA', value: 12.5, color: '#8b5cf6' },
  { name: 'Mexico', value: 6.9, color: '#ec4899' },
  { name: 'UK', value: 4.8, color: '#06b6d4' },
  { name: 'Other', value: 57.1, color: '#334155' },
];

const chartConfig = {
  value: {
    label: "Streams",
    color: "hsl(var(--neon-purple))",
  },
} satisfies ChartConfig;

export default function ArtistDashboard({ onStartOnboarding, onAudienceMode, onViewProfile }: ArtistDashboardProps) {
  const [activeTab, setActiveTab] = useState<ArtistTab>('analytics');

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white flex overflow-hidden">
      
      {/* Sidebar - Desktop (Synced with Bottom Nav) */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0B] flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center rotate-45">
            <Zap size={16} className="-rotate-45 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter">ArtistOS</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={BarChart3} label="Control Center" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Disc} label="Release Studio" isActive={activeTab === 'releases'} onClick={() => setActiveTab('releases')} />
          <SidebarItem icon={CalendarIcon} label="Content Planner" isActive={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
          <SidebarItem icon={Briefcase} label="Rights & Escrow" isActive={activeTab === 'escrow'} onClick={() => setActiveTab('escrow')} />
          <div className="pt-4 mt-4 border-t border-white/5">
             <SidebarItem icon={Settings} label="Settings" isActive={false} onClick={() => {}} />
          </div>
        </nav>

        <div className="p-4 mt-auto">
           <div 
             onClick={onViewProfile}
             className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 group cursor-pointer hover:bg-white/10 transition-colors"
           >
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src="https://picsum.photos/seed/weeknd/100/100" />
                <AvatarFallback>TW</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">The Weeknd</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">View Profile</p>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:translate-x-1 transition-transform" />
           </div>
        </div>
      </aside>

      {/* Main Terminal */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
        
        {/* Top bar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0A0A0B]/80 backdrop-blur-md z-40">
           <div>
             <h2 className="text-lg font-bold">Good morning, The Weeknd. 👋</h2>
             <p className="text-xs text-white/40">Your autonomous creator ecosystem is active.</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  placeholder="Search metadata or analytics..." 
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50" 
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">⌘ K</span>
              </div>
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
                <Bell size={20} />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-[#0A0A0B]"></div>
              </Button>
              <Button onClick={onViewProfile} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <User size={20} />
              </Button>
           </div>
        </header>

        {/* Content Area */}
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full pb-32">
          
          {activeTab === 'analytics' && (
            <>
              {/* Analytics Tab (Control Center) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Live Stream Count" value="83.4M" trend="+12.7%" color="text-blue-500" />
                <StatCard label="Follower Base" value="24.8M" trend="+14.2%" color="text-purple-500" />
                <StatCard label="Wallet Balance" value="$1.24M" trend="+9.3%" color="text-orange-500" />
                <StatCard label="Audience Conversion" value="8.2%" trend="+8.2%" color="text-teal-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Social-to-Stream Telemetry</h3>
                      <p className="text-xs text-white/40">Correlation between social spikes and listening conversions</p>
                    </div>
                  </div>
                  <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={streamData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#ffffff40', fontWeight: 700}} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#ffffff40', fontWeight: 700}}
                            tickFormatter={(value) => `${value}M`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3b82f6" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#0A0A0B' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>

                <div className="glass-card rounded-[2.5rem] p-8 border-white/5 flex flex-col justify-between">
                   <div className="space-y-6">
                      <h3 className="text-lg font-bold">KYC Revenue Summary</h3>
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Available Funds</span>
                            <Badge variant="outline" className="text-green-500 border-green-500/20 text-[8px] bg-green-500/5">Secured</Badge>
                         </div>
                         <h2 className="text-4xl font-black">$412,890.12</h2>
                         <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="text-white/40">From Merch</span>
                               <span>$82,341</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="text-white/40">From Tickets</span>
                               <span>$156,220</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="text-white/40">From Beat Licensing</span>
                               <span>$174,329</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs mt-6">
                      Withdraw to Wallet <ArrowUpRight size={14} className="ml-2" />
                   </Button>
                </div>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Geographic Fan Heatmap</h3>
                    <p className="text-xs text-white/40">Optimal tour routing based on density</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                       <HeatmapItem label="São Paulo, Brazil" value="1.2M listeners" percent={92} />
                       <HeatmapItem label="New York, USA" value="840k listeners" percent={78} />
                       <HeatmapItem label="London, UK" value="620k listeners" percent={65} />
                       <HeatmapItem label="Mexico City, MX" value="510k listeners" percent={58} />
                    </div>
                    <div className="flex items-center justify-center">
                       <div className="relative w-64 h-64 flex items-center justify-center">
                          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>
                          <Globe size={180} className="text-blue-600/20" />
                          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                       </div>
                    </div>
                 </div>
              </div>
            </>
          )}

          {activeTab === 'releases' && (
            <>
              {/* Release Studio Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">EP & Album Creator</h3>
                          <Button size="sm" className="bg-blue-600 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest">New Drop</Button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ReleaseDraftCard title="Untitled EP" status="Draft" items="6 Tracks" />
                          <div className="border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 gap-3 cursor-pointer hover:bg-white/5 transition-colors">
                             <Plus className="text-white/20" size={32} />
                             <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Initialize Collection</span>
                          </div>
                       </div>
                    </div>

                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">Lyric Forced Aligner</h3>
                          <Badge variant="outline" className="text-blue-500 border-blue-500/20">Production Ready</Badge>
                       </div>
                       <div className="bg-black/40 rounded-3xl p-8 border border-white/5 space-y-8">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                <Mic2 size={32} />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-bold">Hurry Up Tomorrow - Lead Single</h4>
                                <p className="text-xs text-white/40">Auto-aligning text to vocal stems...</p>
                                <Progress value={78} className="h-1.5 mt-4" />
                             </div>
                          </div>
                          <div className="h-40 border border-white/5 rounded-2xl relative overflow-hidden flex items-center">
                             <div className="absolute inset-0 flex items-center justify-around px-8 opacity-20">
                                {[...Array(40)].map((_, i) => (
                                  <div key={i} className="w-1 bg-blue-500 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                                ))}
                             </div>
                             <div className="relative z-10 w-full text-center">
                                <p className="text-xl font-black italic tracking-tighter text-blue-500">"I've been tryna call..."</p>
                                <span className="text-[10px] font-mono text-white/40">Timestamp: 00:12.425ms</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Distribution Sync</h3>
                       <div className="space-y-4">
                          <PlatformRow label="Spotify" status="Live" statusColor="text-green-500" />
                          <PlatformRow label="Apple Music" status="Live" statusColor="text-green-500" />
                          <PlatformRow label="YouTube" status="Syncing" statusColor="text-blue-400" />
                          <PlatformRow label="TikTok" status="Pending" statusColor="text-yellow-500" />
                       </div>
                    </div>
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Pre-Save Funnels</h3>
                       <div className="space-y-4">
                          <FunnelItem title="Summer Tour 2025" clicks="12.4k" conv="18.2%" />
                          <FunnelItem title="Hurry Up Tomorrow" clicks="89.3k" conv="24.5%" />
                       </div>
                       <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 text-xs font-bold uppercase tracking-widest mt-4">
                          Deploy New Funnel
                       </Button>
                    </div>
                 </div>
              </div>
            </>
          )}

          {activeTab === 'planner' && (
            <>
              {/* Content & Live Planner Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
                    <div className="flex justify-between items-center">
                       <h3 className="text-lg font-bold">Omnichannel Scheduler</h3>
                       <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest">Month</Button>
                          <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-blue-500">Week</Button>
                       </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                       {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                         <div key={d} className="text-center text-[10px] font-black text-white/20 pb-2">{d}</div>
                       ))}
                       {[...Array(28)].map((_, i) => (
                         <div key={i} className={cn(
                           "aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1",
                           i === 12 ? "bg-blue-600 border-blue-500" : "bg-white/5 border-white/5 hover:bg-white/10"
                         )}>
                            <span className="text-[10px] font-bold">{i + 1}</span>
                            {i === 12 && <Instagram size={10} />}
                            {i === 14 && <div className="w-1 h-1 rounded-full bg-orange-500"></div>}
                         </div>
                       ))}
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                             <Instagram size={24} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold">Instagram Teaser Post</h4>
                             <p className="text-xs text-white/40">Scheduled for Tomorrow, 10:00 AM</p>
                          </div>
                       </div>
                       <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-blue-500">Edit Asset</Button>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Livestream Console</h3>
                       <div className="space-y-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Video size={20} />
                             </div>
                             <div className="flex-1">
                                <h4 className="text-sm font-bold">Next Session</h4>
                                <p className="text-[10px] text-white/40 uppercase font-black">Today • 8:00 PM</p>
                             </div>
                             <Button size="sm" className="bg-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest h-8">Go Live</Button>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                             <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Discount Code</p>
                             <div className="flex justify-between items-center">
                                <span className="text-xl font-black font-mono">LIVE30</span>
                                <Badge className="bg-blue-600">30% OFF</Badge>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Campaign Templates</h3>
                       <div className="space-y-4">
                          <TemplateRow icon={Zap} title="Viral Single Drop" duration="2 Weeks" />
                          <TemplateRow icon={Music} title="Full Album Rollout" duration="2 Months" />
                          <TemplateRow icon={Globe} title="Global Tour Hype" duration="3 Months" />
                       </div>
                    </div>
                 </div>
              </div>
            </>
          )}

          {activeTab === 'escrow' && (
            <>
              {/* Collaboration & Rights Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">Escrow Collaboration Desk</h3>
                          <Badge variant="outline" className="text-green-500 border-green-500/20">4 Active Projects</Badge>
                       </div>
                       <div className="space-y-4">
                          <EscrowProject 
                            partner="Nike Music Lab" 
                            title="Summer Campaign Sync" 
                            amount="$45,000" 
                            status="Secured" 
                            color="text-green-500"
                          />
                          <EscrowProject 
                            partner="Metro Boomin" 
                            title="Producer Collaboration" 
                            amount="$12,500" 
                            status="Pending Sign" 
                            color="text-blue-400"
                          />
                          <EscrowProject 
                            partner="Splice Records" 
                            title="Sample Pack License" 
                            amount="$3,200" 
                            status="In Review" 
                            color="text-yellow-500"
                          />
                       </div>
                    </div>

                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Catalog Governance</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                             <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                                <ShieldCheck size={28} />
                             </div>
                             <h4 className="font-bold">Metadata Lockdown</h4>
                             <p className="text-xs text-white/40 leading-relaxed">Ensure your ISRC/ISWC data cannot be altered by third parties without multisig approval.</p>
                             <Button variant="outline" className="w-full rounded-xl border-white/10 text-[10px] font-black uppercase tracking-widest">Configure Multisig</Button>
                          </div>
                          <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 space-y-4">
                             <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                <Layers size={28} />
                             </div>
                             <h4 className="font-bold">Takedown Console</h4>
                             <p className="text-xs text-white/40 leading-relaxed">Trigger an instant, global removal of any track or entire catalog across all DSPs.</p>
                             <Button variant="destructive" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest">Initialize Protocol</Button>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
                       <h3 className="text-lg font-bold">Asset Vault</h3>
                       <div className="space-y-4">
                          <VaultItem label="Master Audio Stems" items="42 Files" />
                          <VaultItem label="High-Res Cover Art" items="12 Files" />
                          <VaultItem label="Legal Contracts" items="8 PDF" />
                          <VaultItem label="Project Backups" items="24 GB" />
                       </div>
                       <Button className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest mt-4">
                          Access Secure Vault
                       </Button>
                    </div>
                 </div>
              </div>
            </>
          )}

        </div>

        {/* Artist Bottom Nav */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1A1A1B]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-2xl z-50">
          <NavButton icon={BarChart3} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavButton icon={Disc} label="Rollouts" isActive={activeTab === 'releases'} onClick={() => setActiveTab('releases')} />
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer mx-2">
            <Plus className="text-white" />
          </div>
          <NavButton icon={CalendarIcon} label="Planner" isActive={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
          <NavButton icon={Briefcase} label="Escrow" isActive={activeTab === 'escrow'} onClick={() => setActiveTab('escrow')} />
        </div>
      </div>
    </main>
  );
}

// Sub-components

function SidebarItem({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
        isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon size={18} className={cn(isActive ? "text-blue-500" : "group-hover:text-white")} />
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
  );
}

function NavButton({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 px-5 py-2 transition-all duration-300 rounded-[1.5rem]",
        isActive ? "text-white bg-white/10" : "text-white/40 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function PlatformRow({ label, status, statusColor }: { label: string, status: string, statusColor: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
      <span className="text-white/40">{label}</span>
      <div className="flex items-center gap-2">
         <span className={statusColor}>{status}</span>
         {status === 'Live' && <div className="w-1 h-1 rounded-full bg-green-500"></div>}
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
  return (
    <div className="glass-card rounded-[2rem] p-6 border-white/5 space-y-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</h4>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black">{value}</span>
          <span className={cn("text-[10px] font-black uppercase flex items-center gap-1", trend.startsWith('+') ? 'text-green-500' : 'text-red-500')}>
            {trend.startsWith('+') ? <TrendingUp size={12} /> : null} {trend}
          </span>
        </div>
      </div>
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#8b5cf6' : color.includes('orange') ? '#f97316' : '#14b8a6'} 
              strokeWidth={2} 
              fillOpacity={0} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function HeatmapItem({ label, value, percent }: { label: string, value: string, percent: number }) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-white/40">{label}</span>
          <span>{value}</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }}></div>
       </div>
    </div>
  );
}

function ReleaseDraftCard({ title, status, items }: { title: string, status: string, items: string }) {
  return (
    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-6 group cursor-pointer hover:bg-white/10 transition-colors">
       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
          <Plus size={24} />
       </div>
       <div className="flex-1">
          <div className="flex items-center gap-2">
             <h4 className="font-bold">{title}</h4>
             <Badge variant="outline" className="text-[8px] h-4 bg-white/5 border-white/10 uppercase">{status}</Badge>
          </div>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">{items}</p>
       </div>
       <ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
    </div>
  );
}

function FunnelItem({ title, clicks, conv }: { title: string, clicks: string, conv: string }) {
  return (
    <div className="flex items-center justify-between">
       <div>
          <h4 className="text-xs font-bold">{title}</h4>
          <p className="text-[10px] text-white/40 uppercase font-black">{clicks} Total Clicks</p>
       </div>
       <div className="text-right">
          <p className="text-xs font-black text-blue-500">{conv}</p>
          <span className="text-[8px] font-bold text-white/20 uppercase">Conv. Rate</span>
       </div>
    </div>
  );
}

function TemplateRow({ icon: Icon, title, duration }: { icon: any, title: string, duration: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
       <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
          <Icon size={16} />
       </div>
       <div className="flex-1">
          <h4 className="text-xs font-bold">{title}</h4>
       </div>
       <span className="text-[9px] font-black uppercase text-white/40">{duration}</span>
    </div>
  );
}

function EscrowProject({ partner, title, amount, status, color }: { partner: string, title: string, amount: string, status: string, color: string }) {
  return (
    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
             <Briefcase size={16} className="text-white/40" />
          </div>
          <div>
             <h4 className="text-sm font-bold">{partner}</h4>
             <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{title}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-sm font-black">{amount}</p>
          <span className={cn("text-[9px] font-bold uppercase tracking-widest", color)}>{status}</span>
       </div>
    </div>
  );
}

function VaultItem({ label, items }: { label: string, items: string }) {
  return (
    <div className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-0">
       <div className="flex items-center gap-2">
          <FileText size={14} className="text-white/20" />
          <span className="font-bold text-white/60">{label}</span>
       </div>
       <span className="text-[10px] font-black uppercase text-white/40">{items}</span>
    </div>
  );
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
