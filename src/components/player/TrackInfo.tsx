'use client';

import { usePlayer } from '@/hooks/usePlayer';

export default function TrackInfo() {
  const { currentTrack } = usePlayer();
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold tracking-tight">{currentTrack.title}</h2>
      <p className="text-md text-white/70">{currentTrack.artist}</p>
    </div>
  );
}
