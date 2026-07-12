'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Users, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: 'artist' | 'audience') => void;
}

export default function RoleSelection({ onSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
          Choose Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Reality.</span>
        </h1>
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Establish your presence in the ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Artist Path */}
        <button 
          onClick={() => onSelect('artist')}
          className="group relative h-[400px] bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all p-1"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative h-full w-full bg-zinc-900 rounded-[2.9rem] flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="text-purple-500 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Creator ERP</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                Build your independent empire. Manage drops, analytics, and rights with 100% autonomy.
              </p>
            </div>
            <div className="flex items-center gap-2 text-purple-500 font-black text-xs uppercase tracking-widest pt-4">
              Enter Studio <ArrowRight size={14} />
            </div>
          </div>
        </button>

        {/* Audience Path */}
        <button 
          onClick={() => onSelect('audience')}
          className="group relative h-[400px] bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all p-1"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative h-full w-full bg-zinc-900 rounded-[2.9rem] flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="text-cyan-500 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Audience Portal</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                Explore the void. Connect directly with creators, collect exclusive drops, and join the mission.
              </p>
            </div>
            <div className="flex items-center gap-2 text-cyan-500 font-black text-xs uppercase tracking-widest pt-4">
              Enter Void <ArrowRight size={14} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
