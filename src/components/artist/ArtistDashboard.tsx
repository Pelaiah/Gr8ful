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
  Video,
  ExternalLink,
  Sparkles,
  Smartphone,
  Info
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

// Mock Data for Analytics
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

const recentReleases = [
  { title: "Hurry Up Tomorrow", type: "Album", date: "Feb 2, 2025", streams: "152M", saveRate: "12.4%", image: "https://picsum.photos/seed/weeknd1/200/200" },
  { title: "Dancing In The Flames", type: "Single", date: "Jan 5, 2025", streams: "89.3M", saveRate: "15.2%", image: "https://picsum.photos/seed/weeknd2/200/200" },
  { title: "Timeless", type: "Single", date: "Nov 15, 2024", streams: "120M", saveRate: "13.1%", image: "https://picsum.photos/seed/weeknd3/200/200" },
];

const topSources = [
  { name: "Spotify", total: "1.45B", growth: "+13.4%", color: "bg-green-500", icon: Music },
  { name: "Apple Music", total: "456M", growth: "+8.7%", color: "bg-pink-500", icon: Music },
  { name: "YouTube", total: "312M", growth: "+11.2%", color: "bg-red-500", icon: Youtube },
  { name: "TikTok", total: "98M", growth: "+22.1%", color: "bg-black border border-white/10", icon: Video },
  { name: "Amazon Music", total: "67M", growth: "+9.3%", color: "bg-blue-500", icon: Music },
];

const socialMetrics = [
  { platform: "Instagram", followers: "12.4M", growth: "+11.2%", icon: Instagram, color: "text-pink-500" },
  { platform: "TikTok", followers: "8.7M", growth: "+38.4%", icon: Music, color: "text-white" },
  { platform: "YouTube", followers: "5.3M", growth: "+7.1%", icon: Youtube, color: "text-red-500" },
  { platform: "X (Twitter)", followers: "2.1M", growth: "+3.2%", icon: Twitter, color: "text-blue-400" },
  { platform: "Facebook", followers: "1.8M", growth: "+2.1%", icon: Facebook, color: "text-blue-600" },
];

const activityLogs = [
  { event: "New playlist placement", detail: "\"Today's Top Hits\" • Spotify", time: "2h ago", icon: Music, iconColor: "text-green-500" },
  { event: "TikTok video reached 120k views", detail: "\"Behind The Scenes\"", time: "5h ago", icon: Music, iconColor: "text-white" },
  { event: "Instagram engagement increased", detail: "+12% from last week", time: "1d ago", icon: Instagram, iconColor: "text-pink-500" },
  { event: "New release delivered", detail: "\"Hurry Up Tomorrow\"", time: "2d ago", icon: Send, iconColor: "text-blue-500" },
  { event: "YouTube Music feature", detail: "Added to \"New Music Mix\"", time: "3d ago", icon: Youtube, iconColor: "text-red-500" },
];

const aiInsights = [
  { text: "Your TikTok engagement increased 38% after posting behind-the-scenes videos.", icon: Music, color: "text-blue-400" },
  { text: "Spotify streams usually spike 48 hours after Instagram posts.", icon: Music, color: "text-green-500" },
  { text: "Most listeners come from Brazil. Consider targeting São Paulo in your next tour.", icon: MapPin, color: "text-yellow-500" },
  { text: "Best day to release music is Friday. Your audience is most active on Fridays.", icon: CalendarIcon, color: "text-purple-400" },
  { text: "Your newest single is outperforming your previous release by 27%.", icon: TrendingUp, color: "text-orange-400" },
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
    <main className="min-h-screen bg-[#0A0A0B] text-white flex overflow-hidden font-sans">
      
      {/* Sidebar - Desktop */}
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
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white" 
                />
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
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Top Row: Releases, Activity, Social */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Releases */}
                <div className="glass-card rounded-[2.5rem] p-6 border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Recent Releases</h3>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">View All</button>
                  </div>
                  <div className="space-y-5">
                    {recentReleases.map((release, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                          <img src={release.image} alt={release.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold truncate">{release.title}</h4>
                          <p className="text-[10px] text-white/40 uppercase font-black">{release.type} • {release.date}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div>
                              <span className="text-[10px] text-white/40 uppercase block">Streams</span>
                              <span className="text-xs font-bold">{release.streams}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-white/40 uppercase block">Save Rate</span>
                              <span className="text-xs font-bold">{release.saveRate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[8px] font-black uppercase text-green-500 tracking-tighter">Live Everywhere</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Activity */}
                <div className="glass-card rounded-[2.5rem] p-6 border-white/5 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Latest Activity</h3>
                  <div className="space-y-6 relative">
                    <div className="absolute left-[1.125rem] top-2 bottom-2 w-px bg-white/5"></div>
                    {activityLogs.map((log, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className={cn("w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 z-10", log.iconColor)}>
                          <log.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold truncate">{log.event}</h4>
                            <span className="text-[9px] font-bold text-white/20 uppercase whitespace-nowrap">{log.time}</span>
                          </div>
                          <p className="text-[10px] text-white/40 truncate mt-0.5">{log.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Overview */}
                <div className="glass-card rounded-[2.5rem] p-6 border-white/5 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Social Overview</h3>
                  <div className="space-y-4">
                    {socialMetrics.map((social, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center", social.color)}>
                            <social.icon size={16} />
                          </div>
                          <span className="text-xs font-bold">{social.platform}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold">{social.followers}</div>
                          <div className="text-[9px] font-black uppercase text-green-500 flex items-center gap-0.5 justify-end">
                            <TrendingUp size={10} /> {social.growth}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full rounded-2xl border border-white/5 h-12 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white mt-2">
                    View Social Analytics <ArrowUpRight size={14} className="ml-2" />
                  </Button>
                </div>

              </div>

              {/* Middle Row: Streams Overview & AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Streams Overview */}
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">Streams Overview</h3>
                      <p className="text-xs text-white/40">Real-time listening performance across all platforms</p>
                    </div>
                    <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
                      {['7D', '30D', '90D', '1Y'].map(range => (
                        <button 
                          key={range} 
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                            range === '30D' ? "bg-blue-600 text-white" : "text-white/40 hover:text-white"
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-[300px] w-full">
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

                  {/* Top Sources Integrated */}
                  <div className="pt-8 border-t border-white/5 mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Top Sources</h4>
                      <button className="text-[10px] font-bold text-blue-500 uppercase">View All</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                      {topSources.map((source, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-sm", source.color)}></div>
                            <span className="text-[10px] font-bold text-white/60">{source.name}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-black">{source.total}</span>
                            <span className="text-[9px] font-bold text-green-500 uppercase">{source.growth}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8 flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">AI Insights</h3>
                    <Badge variant="outline" className="text-[8px] h-4 uppercase tracking-widest text-white/40 border-white/10">Beta</Badge>
                  </div>
                  <div className="space-y-6 flex-1">
                    {aiInsights.map((insight, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className={cn("w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", insight.color)}>
                          <insight.icon size={20} />
                        </div>
                        <p className="text-xs font-medium text-white/80 leading-relaxed pt-1">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full rounded-2xl border border-white/5 h-14 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white">
                    View All Insights <ArrowUpRight size={14} className="ml-2" />
                  </Button>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'releases' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            </div>
          )}

          {activeTab === 'planner' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                       {['M', 'T', 'W', 'Th', 'F', 'S', 'Su'].map((d, i) => (
                         <div key={`${d}-${i}`} className="text-center text-[10px] font-black text-white/20 pb-2">{d}</div>
                       ))}
                       {[...Array(28)].map((_, i) => (
                         <div key={i} className={cn(
                           "aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1",
                           i === 12 ? "bg-blue-600 border-blue-500" : "bg-white/5 border-white/5 hover:bg-white/10"
                         )}>
                            <span className="text-[10px] font-bold">{i + 1}</span>
                            {i === 12 && <InstagramIcon className="w-2.5 h-2.5" />}
                            {i === 14 && <div className="w-1 h-1 rounded-full bg-orange-500"></div>}
                         </div>
                       ))}
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                             <InstagramIcon className="w-6 h-6" />
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
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            </div>
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
