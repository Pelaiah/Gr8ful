'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Globe, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 selection:bg-purple-100">
      {/* Hero Section */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter">GR8FUL.</h1>
        <Button variant="ghost" className="font-bold text-sm" onClick={onGetStarted}>Sign In</Button>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              The Autonomous OS
            </div>
            <h1 className="text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.85]">
              OWN YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
                CREATIVE <br/>FUTURE.
              </span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium max-w-lg leading-relaxed">
              The first autonomous operating system for independent artists and the fans who champion them. 100% ownership. Zero algorithms. Direct connection.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full h-16 px-10 font-black text-lg bg-zinc-900 hover:scale-105 transition-transform" onClick={onGetStarted}>
                Enter Ecosystem <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-zinc-200">
              <div className="space-y-1">
                <span className="text-3xl font-black text-zinc-900">100%</span>
                <p className="text-xs font-bold text-zinc-400 uppercase">Master Ownership</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-zinc-900">0%</span>
                <p className="text-xs font-bold text-zinc-400 uppercase">Algorithm Bias</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-[3rem] blur-3xl"></div>
            <div className="relative w-full h-full bg-white rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/gr8ful-hero/1200/1200" 
                alt="Creative OS" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="digital music"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                    <img src="https://picsum.photos/seed/artist-hero/100/100" alt="Artist" />
                  </div>
                  <div>
                    <p className="font-black text-lg">Evelyn Smith</p>
                    <p className="text-xs font-bold text-white/70 uppercase">Top Autonomous Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
          {[
            { icon: Rocket, title: "Campaign Engine", desc: "Automated project cycles without the need for traditional labels.", color: "bg-purple-50 text-purple-600" },
            { icon: Globe, title: "Identity Sync", desc: "Manage your cross-platform social footprint from a singular admin panel.", color: "bg-pink-50 text-pink-600" },
            { icon: BarChart3, title: "Deep Analytics", desc: "Real-time growth telemetry mapping viral spikes to conversions.", color: "bg-blue-50 text-blue-600" },
            { icon: ShieldCheck, title: "Rights Governance", desc: "Millisecond-level word alignment and 100% catalog ownership.", color: "bg-cyan-50 text-cyan-600" },
          ].map((pillar, i) => (
            <div key={i} className="p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <pillar.icon size={28} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3">{pillar.title}</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
