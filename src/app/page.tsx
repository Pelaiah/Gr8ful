import { PlayerProvider } from '@/context/PlayerContext';
import Player from '@/components/player/Player';

export default function Home() {
  return (
    <PlayerProvider>
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Player />
      </main>
    </PlayerProvider>
  );
}
