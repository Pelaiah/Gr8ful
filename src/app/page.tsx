'use client';

import { useEffect, useState } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import RoleSelection from '@/components/auth/RoleSelection';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ArtistDashboard from '@/components/artist/ArtistDashboard';
import ArtistProfile from '@/components/artist/ArtistProfile';
import AudiencePortal from '@/components/audience/AudiencePortal';

type AppView = 'landing' | 'role-selection' | 'portal';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [view, setView] = useState<AppView>('landing');
  const [portalMode, setPortalMode] = useState<'artist' | 'audience'>('audience');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // 1. Landing View
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('role-selection')} />;
  }

  // 2. Role Selection View
  if (view === 'role-selection') {
    return (
      <RoleSelection 
        onSelect={(role) => {
          setPortalMode(role);
          setView('portal');
        }} 
      />
    );
  }

  // 3. Portal View
  if (view === 'portal') {
    // Artist Flow
    if (portalMode === 'artist') {
      if (showOnboarding) {
        return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
      }
      return (
        <ArtistDashboard 
          onStartOnboarding={() => setShowOnboarding(true)} 
          onAudienceMode={() => setPortalMode('audience')}
        />
      );
    }

    // Audience Flow
    if (portalMode === 'audience') {
      if (selectedArtist) {
        return (
          <ArtistProfile 
            name={selectedArtist.name}
            handle={selectedArtist.handle}
            followers={selectedArtist.followers}
            avatarUrl={selectedArtist.avatarUrl}
            bannerUrl={selectedArtist.bannerUrl}
            onClose={() => setSelectedArtist(null)}
          />
        );
      }

      return (
        <div className="relative">
          <AudiencePortal onSelectArtist={(artist) => setSelectedArtist(artist)} />
          {/* Subtle Dev Switcher */}
          <button 
            className="fixed top-6 right-24 z-[60] bg-white/10 backdrop-blur-md border border-white/10 text-white/50 hover:text-white rounded-full text-[10px] font-black uppercase px-4 h-8"
            onClick={() => setPortalMode('artist')}
          >
            Artist ERP
          </button>
        </div>
      );
    }
  }

  return null;
}