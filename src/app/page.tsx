'use client';

import { PlayerProvider } from '@/context/PlayerContext';
import Player from '@/components/player/Player';
import { useEffect, useState } from 'react';

function ClientOnlyPlayer() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // or a loading spinner
  }

  return (
    <PlayerProvider>
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Player />
      </main>
    </PlayerProvider>
  );
}


export default function Home() {
  return <ClientOnlyPlayer />;
}
