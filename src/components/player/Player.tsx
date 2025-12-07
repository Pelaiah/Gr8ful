'use client';

import { usePlayer } from '@/hooks/usePlayer';
import AlbumArt from './AlbumArt';
import Controls from './Controls';
import Header from './Header';
import LyricsDisplay from './LyricsDisplay';
import ProgressBar from './ProgressBar';
import Toolbar from './Toolbar';
import TrackInfo from './TrackInfo';

export default function Player() {
  const { currentTrack } = usePlayer();

  return (
    <div className="relative w-full max-w-md h-[812px] rounded-3xl overflow-hidden shadow-2xl bg-card flex flex-col">
      <AlbumArt imageUrl={currentTrack.albumArtUrl} />
      <div className="relative z-10 flex flex-col h-full p-6 text-white bg-gradient-to-b from-black/60 via-transparent to-black/80">
        <Header />
        <div className="flex-grow flex items-center justify-center">
            <LyricsDisplay />
        </div>
        <div className="w-full">
            <TrackInfo />
            <ProgressBar />
            <Controls />
            <Toolbar />
        </div>
      </div>
    </div>
  );
}
