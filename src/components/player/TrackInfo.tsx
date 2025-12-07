'use client';

import { usePlayer } from '@/hooks/usePlayer';

export default function TrackInfo() {
  const { currentTrack } = usePlayer();
  return (
    <div className="mb-4 text-center">
      <h2 className="text-xl font-bold tracking-tight">{currentTrack.title}</h2>
      <p className="text-sm text-white/70">{currentTrack.artist}</p>
    </div>
  );
}
