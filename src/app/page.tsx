'use client';

import { useEffect, useState } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { Button } from '@/components/ui/button';
import { Music2, Rocket, BarChart3, Users } from 'lucide-react';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-black tracking-tighter text-primary">GR8FUL.</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The Enterprise Resource Planning platform for the next generation of autonomous artists.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center space-y-3">
          <Music2 className="text-primary h-8 w-8" />
          <h3 className="font-bold">Creator ERP</h3>
          <p className="text-xs text-muted-foreground">Manage drops, analytics, and rights.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center space-y-3">
          <Users className="text-primary h-8 w-8" />
          <h3 className="font-bold">D2C Fan Hub</h3>
          <p className="text-xs text-muted-foreground">Direct engagement and viral referrals.</p>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-md space-y-3">
        <Button size="lg" className="w-full h-14 text-lg font-bold rounded-full" onClick={() => setShowOnboarding(true)}>
          <Rocket className="mr-2 h-5 w-5" /> Start Artist Onboarding
        </Button>
        <Button variant="outline" size="lg" className="w-full h-14 text-lg font-bold rounded-full">
          Enter Fan Drop Feed
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground pt-12">
        Creators retain 100% ownership. Zero algorithms. Pure autonomy.
      </p>
    </main>
  );
}
