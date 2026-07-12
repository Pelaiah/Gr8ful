'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Link2, Wallet, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const Rocket = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-4 5-4"/>
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 4-5 4-5"/>
  </svg>
);

const levels = [
  { id: 1, title: 'Identity', description: 'Claim your unique Gr8ful slug.', icon: Link2 },
  { id: 2, title: 'Nexus', description: 'Sync Spotify & TikTok data.', icon: Zap },
  { id: 3, title: 'Vault', description: 'Connect mobile wallet payouts.', icon: Wallet },
  { id: 4, title: 'Launch', description: 'Initialize first drop campaign.', icon: Rocket },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [slug, setSlug] = useState('');

  const progress = (currentLevel / levels.length) * 100;
  const currentLevelData = levels[currentLevel - 1];
  const LevelIcon = currentLevelData.icon;

  const handleNext = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-primary uppercase tracking-tighter">Level {currentLevel}</span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="w-full max-w-md p-8 rounded-[2.5rem] border-4 border-primary/20 shadow-2xl space-y-8 bg-card/50 backdrop-blur-xl">
        <div className="space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center">
            {LevelIcon && <LevelIcon className="text-primary w-8 h-8" />}
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter">{currentLevelData.title}</h2>
            <p className="text-muted-foreground">{currentLevelData.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          {currentLevel === 1 && (
            <div className="space-y-2">
              <Label htmlFor="slug" className="font-bold">Artist Slug</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">gr8ful.app/</span>
                <input 
                  id="slug" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  placeholder="yourname" 
                  className="w-full pl-[6.5rem] h-14 rounded-2xl font-bold bg-background/50 border-2 border-input focus:border-primary outline-none transition-all px-4" 
                />
              </div>
            </div>
          )}

          {currentLevel === 2 && (
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-2 flex justify-between px-6 hover:bg-green-500/10 hover:border-green-500/50">
                <span>Spotify for Artists</span>
                <Link2 className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-2 flex justify-between px-6 hover:bg-black hover:text-white">
                <span>TikTok Content API</span>
                <Link2 className="w-5 h-5" />
              </Button>
            </div>
          )}

          {currentLevel === 3 && (
            <div className="space-y-4 text-center py-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 rounded-2xl flex flex-col font-bold border-2">
                  <span className="text-xs text-muted-foreground">Local Wallet</span>
                  <span>M-Pesa</span>
                </Button>
                <Button variant="outline" className="h-20 rounded-2xl flex flex-col font-bold border-2">
                  <span className="text-xs text-muted-foreground">International</span>
                  <span>Stripe</span>
                </Button>
              </div>
            </div>
          )}

          {currentLevel === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="font-bold">Identity Claimed</span>
              </div>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="font-bold">Data Nexus Active</span>
              </div>
            </div>
          )}

          <Button 
            className="w-full h-16 rounded-full text-lg font-black tracking-tight" 
            onClick={handleNext}
          >
            {currentLevel === levels.length ? 'Finalize Onboarding' : 'Continue'}
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        {levels.map((l) => (
          <div 
            key={l.id} 
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              currentLevel === l.id ? "w-8 bg-primary" : "bg-primary/20"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
