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
  PieChart
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

type ArtistTab = 'overview' | 'analytics' | 'distribution' | 'releases' | 'social' | 'audience' | 'revenue' | 'team' | 'settings';

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
  const [activeTab, setActiveTab] = useState<ArtistTab>('overview');

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white flex overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0B] flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center rotate-45">
            <Zap size={16} className="-rotate-45 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter">ArtistOS</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={LayoutGrid} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={BarChart3} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Globe} label="Distribution" isActive={activeTab === 'distribution'} onClick={() => setActiveTab('distribution')} />
          <SidebarItem icon={Disc} label="Releases" isActive={activeTab === 'releases'} onClick={() => setActiveTab('releases')} />
          <SidebarItem icon={Layers} label="Social" isActive={activeTab === 'social'} onClick={() => setActiveTab('social')} />
          <SidebarItem icon={Users} label="Audience" isActive={activeTab === 'audience'} onClick={() => setActiveTab('audience')} />
          <SidebarItem icon={Wallet} label="Revenue" isActive={activeTab === 'revenue'} onClick={() => setActiveTab('revenue')} />
          <SidebarItem icon={Briefcase} label="Team" isActive={activeTab === 'team'} onClick={() => setActiveTab('team')} />
          <SidebarItem icon={Settings} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 mt-auto">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 group cursor-pointer hover:bg-white/10 transition-colors">
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
             <p className="text-xs text-white/40">Here's what's happening with your music.</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  placeholder="Search anything..." 
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50" 
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">⌘ K</span>
              </div>
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
                <Bell size={20} />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-[#0A0A0B]"></div>
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-900/20">
                <Plus size={20} />
              </Button>
           </div>
        </header>

        {/* Content Area */}
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full pb-32">
          
          {/* Top Row: Artist Header & Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Artist Main Card */}
            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-blue-900/20 to-transparent border-white/5">
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative">
                  <img src="https://picsum.photos/seed/weeknd-p/400/400" alt="artist" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#0A0A0B] shadow-lg">
                   <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-4xl font-black tracking-tighter">The Weeknd</h1>
                    <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-[10px] font-bold py-0.5">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    {['R&B', 'Pop', 'Alternative'].map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-white/40">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Metric label="Monthly Listeners" value="83.4M" trend="+8.2%" />
                  <Metric label="Followers" value="24.8M" trend="+14.2%" />
                  <Metric label="Total Streams" value="2.4B" trend="+12.7%" />
                  <Metric label="Active Releases" value="12" subLabel="View all" />
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  <PlatformIcon icon={SpotifyIcon} color="text-green-500" />
                  <PlatformIcon icon={AppleIcon} color="text-red-500" />
                  <PlatformIcon icon={YoutubeIcon} color="text-red-600" />
                  <PlatformIcon icon={TikTokIcon} color="text-white" />
                  <PlatformIcon icon={Instagram} color="text-pink-500" />
                </div>
              </div>
            </div>

            {/* Distribution Status */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">Distribution Status</h3>
                <Button variant="ghost" size="icon" className="text-white/20"><MoreHorizontal size={20} /></Button>
              </div>

              <div className="flex items-center justify-between bg-white/5 rounded-3xl p-6 border border-white/5">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="20" className="text-blue-600" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black">92%</span>
                    <span className="text-[8px] text-white/40 font-bold uppercase">Overall</span>
                  </div>
                </div>
                <div className="flex-1 pl-6 space-y-4">
                   <PlatformRow label="Spotify" status="Live" statusColor="text-green-500" />
                   <PlatformRow label="Apple Music" status="Live" statusColor="text-green-500" />
                   <PlatformRow label="YouTube Music" status="Live" statusColor="text-green-500" />
                   <PlatformRow label="TikTok" status="Uploading" statusColor="text-blue-400" />
                   <PlatformRow label="Amazon Music" status="Pending" statusColor="text-yellow-500" />
                </div>
              </div>

              <Button className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10">
                View Full Distribution <ArrowUpRight size={14} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <StatCard label="Streams" value="2.4B" trend="+12.7%" color="text-blue-500" />
             <StatCard label="Followers" value="24.8M" trend="+14.2%" color="text-purple-500" />
             <StatCard label="Revenue" value="$1.24M" trend="+9.3%" color="text-orange-500" />
             <StatCard label="Audience Growth" value="8.2%" trend="+8.2%" color="text-teal-500" />
          </div>

          {/* Activity & Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Releases */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Recent Releases</h3>
                  <Button variant="link" className="text-blue-500 font-bold p-0">View All</Button>
               </div>
               <div className="space-y-4">
                  <ReleaseRow 
                    title="Hurry Up Tomorrow" 
                    type="Album • Feb 2, 2025" 
                    streams="152M" 
                    saveRate="12.4%" 
                    imageUrl="https://picsum.photos/seed/album1/100/100" 
                  />
                  <ReleaseRow 
                    title="Dancing In The Flames" 
                    type="Single • Jan 5, 2025" 
                    streams="89.3M" 
                    saveRate="15.2%" 
                    imageUrl="https://picsum.photos/seed/album2/100/100" 
                  />
                  <ReleaseRow 
                    title="Timeless" 
                    type="Single • Nov 15, 2024" 
                    streams="120M" 
                    saveRate="13.1%" 
                    imageUrl="https://picsum.photos/seed/album3/100/100" 
                  />
               </div>
            </div>

            {/* Latest Activity */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
               <h3 className="text-lg font-bold">Latest Activity</h3>
               <div className="space-y-6">
                  <ActivityItem 
                    icon={SpotifyIcon} 
                    title="New playlist placement" 
                    desc='"Today&apos;s Top Hits" • Spotify' 
                    time="2h ago" 
                    color="bg-green-500" 
                  />
                  <ActivityItem 
                    icon={TikTokIcon} 
                    title="TikTok video reached 120K views" 
                    desc='"Behind The Scenes"' 
                    time="5h ago" 
                    color="bg-black border border-white/20" 
                  />
                  <ActivityItem 
                    icon={Instagram} 
                    title="Instagram engagement increased" 
                    desc="+12% from last week" 
                    time="1d ago" 
                    color="bg-pink-500" 
                  />
                  <ActivityItem 
                    icon={Globe} 
                    title="New release delivered" 
                    desc='"Hurry Up Tomorrow"' 
                    time="2d ago" 
                    color="bg-blue-600" 
                  />
               </div>
            </div>

            {/* Social Overview */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
               <h3 className="text-lg font-bold">Social Overview</h3>
               <div className="space-y-5">
                  <SocialStat icon={Instagram} label="Instagram" followers="12.4M" trend="+11.2%" />
                  <SocialStat icon={TikTokIcon} label="TikTok" followers="8.7M" trend="+38.4%" />
                  <SocialStat icon={YoutubeIcon} label="YouTube" followers="5.3M" trend="+7.1%" />
                  <SocialStat icon={Twitter} label="X (Twitter)" followers="2.1M" trend="+3.2%" />
                  <SocialStat icon={Facebook} label="Facebook" followers="1.8M" trend="+2.1%" />
               </div>
               <Button variant="outline" className="w-full h-12 rounded-2xl border-white/10 bg-white/5 font-bold text-xs uppercase tracking-widest hover:bg-white/10 mt-4">
                  View Social Analytics <ArrowUpRight size={14} className="ml-2" />
               </Button>
            </div>
          </div>

          {/* Detailed Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Streams Overview Chart */}
            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold">Streams Overview</h3>
                    <p className="text-xs text-white/40">Historical playback telemetry</p>
                  </div>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    {['7D', '30D', '90D', '1Y'].map(range => (
                      <button key={range} className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                        range === '30D' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                      )}>{range}</button>
                    ))}
                  </div>
               </div>

               <div className="h-[300px] w-full">
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
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1A1B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                        itemStyle={{ color: '#fff', fontWeight: 700 }}
                     />
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
               </div>

               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-white/5">
                 <SmallSource icon={SpotifyIcon} label="Spotify" value="1.45B" trend="+13.4%" color="text-green-500" />
                 <SmallSource icon={AppleIcon} label="Apple Music" value="456M" trend="+8.7%" color="text-red-500" />
                 <SmallSource icon={YoutubeIcon} label="YouTube" value="312M" trend="+11.2%" color="text-red-600" />
                 <SmallSource icon={TikTokIcon} label="TikTok" value="98M" trend="+22.1%" color="text-white" />
                 <SmallSource icon={AmazonIcon} label="Amazon Music" value="67M" trend="+9.3%" color="text-cyan-500" />
               </div>
            </div>

            {/* AI Insights */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">AI Insights</h3>
                  <Badge variant="outline" className="text-[8px] bg-blue-600/10 text-blue-500 border-blue-500/20 uppercase">Beta</Badge>
               </div>
               <div className="space-y-6">
                  <InsightItem 
                    icon={TikTokIcon} 
                    text="Your TikTok engagement increased 38% after posting behind-the-scenes videos." 
                    color="text-blue-400" 
                  />
                  <InsightItem 
                    icon={SpotifyIcon} 
                    text="Spotify streams usually spike 48 hours after Instagram posts." 
                    color="text-green-400" 
                  />
                  <InsightItem 
                    icon={MapPin} 
                    text="Most listeners come from Brazil. Consider targeting São Paulo in your next tour." 
                    color="text-yellow-400" 
                  />
                  <InsightItem 
                    icon={CalendarIcon} 
                    text="Best day to release music is Friday. Your audience is most active on Fridays." 
                    color="text-purple-400" 
                  />
                  <InsightItem 
                    icon={TrendingUp} 
                    text="Your newest single is outperforming your previous release by 27%." 
                    color="text-orange-400" 
                  />
               </div>
               <Button variant="outline" className="w-full h-12 rounded-2xl border-white/10 bg-white/5 font-bold text-xs uppercase tracking-widest hover:bg-white/10 mt-4">
                  View All Insights <ChevronRight size={14} className="ml-2" />
               </Button>
            </div>
          </div>

          {/* Audience Demographics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
             
             {/* Audience Breakdown */}
             <div className="lg:col-span-3 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-bold">Audience</h3>
                   <div className="flex gap-4">
                      {['Age', 'Country', 'Gender', 'Devices', 'Cities'].map(tab => (
                        <button key={tab} className={cn(
                          "text-[10px] font-black uppercase tracking-widest transition-colors",
                          tab === 'Age' ? "text-blue-500" : "text-white/40 hover:text-white"
                        )}>{tab}</button>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1 w-full space-y-6">
                      {ageData.map((item, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-white/60">{item.age}</span>
                              <span>{item.value}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.value}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="w-64 h-64 shrink-0 relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={countryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {countryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Top Country</span>
                         <span className="text-xl font-black">Brazil</span>
                         <span className="text-xs font-bold text-blue-500">18.7%</span>
                      </div>
                      <div className="absolute -bottom-4 right-0 space-y-1">
                         {countryData.slice(0, 4).map((c, i) => (
                           <div key={i} className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></div>
                             <span className="text-[9px] font-bold uppercase text-white/40">{c.name} {c.value}%</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Release Timeline */}
             <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border-white/5 space-y-8">
                <h3 className="text-lg font-bold">Release Timeline</h3>
                <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                   <TimelineItem 
                      date="Jan 2025" 
                      title="Dancing In The Flames" 
                      type="Single" 
                      status="Live" 
                      statusColor="text-green-500"
                      isActive
                   />
                   <TimelineItem 
                      date="Mar 2025" 
                      title="Echoes Of Silence" 
                      type="EP" 
                      status="Delivered" 
                      statusColor="text-blue-500"
                   />
                   <TimelineItem 
                      date="Jun 2025" 
                      title="Hurry Up Tomorrow" 
                      type="Album" 
                      status="Scheduled" 
                      statusColor="text-purple-500"
                   />
                   <TimelineItem 
                      date="Sep 2025" 
                      title="Open Hearts" 
                      type="Music Video" 
                      status="Planning" 
                      statusColor="text-white/20"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Artist Bottom Nav */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1A1A1B]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-2xl z-50">
          <NavButton icon={BarChart3} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavButton icon={Disc} label="Rollouts" isActive={activeTab === 'releases'} onClick={() => setActiveTab('releases')} />
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer mx-2">
            <Plus className="text-white" />
          </div>
          <NavButton icon={CalendarIcon} label="Planner" isActive={false} onClick={() => {}} />
          <NavButton icon={Briefcase} label="Escrow" isActive={false} onClick={() => {}} />
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

function Metric({ label, value, trend, subLabel }: { label: string, value: string, trend?: string, subLabel?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest whitespace-nowrap">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black">{value}</span>
        {trend && <span className="text-[10px] font-bold text-green-500">{trend}</span>}
        {subLabel && <span className="text-[10px] font-bold text-blue-500 cursor-pointer">{subLabel}</span>}
      </div>
    </div>
  );
}

function PlatformIcon({ icon: Icon, color }: { icon: any, color: string }) {
  return (
    <div className={cn("w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors", color)}>
      <Icon size={14} fill="currentColor" />
    </div>
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

function ReleaseRow({ title, type, streams, saveRate, imageUrl }: { title: string, type: string, streams: string, saveRate: string, imageUrl: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all">
       <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
       </div>
       <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{title}</h4>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{type}</p>
       </div>
       <div className="text-right flex flex-col items-end">
          <p className="text-sm font-black">{streams}</p>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-white/40 font-bold uppercase">Save Rate</span>
            <span className="text-[8px] text-green-500 font-bold">{saveRate}</span>
          </div>
       </div>
       <div className="pl-2 flex items-center gap-1 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase tracking-widest">Live</span>
       </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, desc, time, color }: { icon: any, title: string, desc: string, time: string, color: string }) {
  return (
    <div className="flex items-start gap-4">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color)}>
          <Icon size={16} fill="white" className="text-white" />
       </div>
       <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{title}</h4>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{desc}</p>
       </div>
       <span className="text-[10px] text-white/20 font-bold uppercase whitespace-nowrap">{time}</span>
    </div>
  );
}

function SocialStat({ icon: Icon, label, followers, trend }: { icon: any, label: string, followers: string, trend: string }) {
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
             <Icon size={14} className="text-white/60" />
          </div>
          <span className="text-xs font-bold text-white/60">{label}</span>
       </div>
       <div className="text-right">
          <p className="text-xs font-black">{followers}</p>
          <span className="text-[8px] font-bold text-green-500 tracking-widest">{trend}</span>
       </div>
    </div>
  );
}

function SmallSource({ icon: Icon, label, value, trend, color }: { icon: any, label: string, value: string, trend: string, color: string }) {
  return (
    <div className="space-y-1">
       <div className="flex items-center gap-2">
          <Icon size={12} className={color} fill="currentColor" />
          <span className="text-[8px] font-black uppercase tracking-widest text-white/40">{label}</span>
       </div>
       <div className="flex items-baseline gap-2">
          <span className="text-xs font-black">{value}</span>
          <span className="text-[8px] font-bold text-green-500">{trend}</span>
       </div>
    </div>
  );
}

function InsightItem({ icon: Icon, text, color }: { icon: any, text: string, color: string }) {
  return (
    <div className="flex items-start gap-4">
       <div className={cn("mt-1 shrink-0", color)}>
          <Icon size={16} fill="currentColor" className="opacity-80" />
       </div>
       <p className="text-xs font-medium text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

function TimelineItem({ date, title, type, status, statusColor, isActive }: { date: string, title: string, type: string, status: string, statusColor: string, isActive?: boolean }) {
  return (
    <div className="relative">
       <div className={cn(
         "absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0A0A0B] z-10",
         isActive ? "bg-blue-600" : "bg-white/10"
       )}></div>
       <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{date}</span>
          <div className="flex items-center justify-between">
             <div>
                <h4 className="text-xs font-bold">{title}</h4>
                <p className="text-[8px] text-white/40 font-bold uppercase tracking-[0.2em]">{type}</p>
             </div>
             <span className={cn("text-[8px] font-black uppercase tracking-widest", statusColor)}>{status}</span>
          </div>
       </div>
    </div>
  );
}

// Icons
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.466-1.028.249-2.815-1.72-6.36-2.111-10.536-1.157-.404.093-.811-.161-.904-.565-.093-.404.161-.811.565-.904 4.568-1.045 8.487-.6 11.654 1.336.353.217.465.676.249 1.041zm1.469-3.264c-.272.443-.852.585-1.295.313-3.221-1.979-8.131-2.556-11.94-1.399-.498.151-1.023-.131-1.174-.629s.131-1.023.629-1.174c4.356-1.321 9.778-.669 13.467 1.594.443.272.585.852.313 1.295zm.131-3.418C15.228 8.169 8.79 7.956 5.034 9.096c-.596.181-1.233-.153-1.414-.75s.153-1.233.75-1.414c4.302-1.306 11.414-1.054 16.035 1.685.536.319.714 1.011.395 1.547-.319.537-1.011.714-1.547.396z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.39 5.98.63 7.13-.58 1.5-1.36 3-2.68 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.342 6.342 0 0 1-1.89-1.51v7.53c.01 4.76-4.03 8.67-8.87 8.14-5.257-.57-8.82-5.91-7.07-10.83 1.25-3.51 5.25-5.51 8.78-4.34.81.27 1.54.74 2.11 1.35.03-3.003.01-6.007.01-9.007l.15-.02z"/>
  </svg>
);

const AmazonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.712 20.73c-1.748 1.34-4.524 2.046-6.732 2.046-3.15 0-5.98-.95-8.15-2.527-.24-.17-.2-.48.07-.65 2.13-1.36 5.6-2.18 8.16-2.18 2.28 0 4.67.65 6.64 1.95.28.18.3.5.01.69v.671zm.69-2.07c-.42-.35-.38-.6-.1-.95.89-1.12 1.4-2.56 1.4-4.17 0-3.86-3.14-7-7-7s-7 3.14-7 7c0 1.65.57 3.16 1.52 4.36.24.3.29.54-.08.84-.31.25-.63.45-.96.65-.29.17-.57-.01-.78-.26-1.56-1.82-2.5-4.19-2.5-6.78 0-6.07 4.93-11 11-11s11 4.93 11 11c0 2.54-.86 4.9-2.3 6.69-.2.25-.46.36-.78.14-.3-.2-.42-.5-.1-.85z"/>
  </svg>
);
