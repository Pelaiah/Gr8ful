'use client';

import { usePlayer } from '@/hooks/usePlayer';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Controls() {
  const { isPlaying, togglePlay, nextTrack, prevTrack, isShuffle, toggleShuffle, repeatMode, toggleRepeatMode } = usePlayer();

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="flex items-center justify-between my-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleShuffle}
        className={cn('text-white/70 hover:text-white', isShuffle && 'text-primary hover:text-primary')}
        aria-label="Shuffle"
      >
        <Shuffle size={20} />
      </Button>
      <Button variant="ghost" size="icon" onClick={prevTrack} className="text-white hover:bg-white/10" aria-label="Previous track">
        <SkipBack size={28} fill="currentColor" />
      </Button>
      <Button
        size="icon"
        className="w-16 h-16 rounded-full bg-white text-black hover:bg-gray-200"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={32} fill="currentColor" />
        ) : (
          <Play size={32} fill="currentColor" className="ml-1" />
        )}
      </Button>
      <Button variant="ghost" size="icon" onClick={nextTrack} className="text-white hover:bg-white/10" aria-label="Next track">
        <SkipForward size={28} fill="currentColor" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRepeatMode}
        className={cn('text-white/70 hover:text-white', repeatMode !== 'off' && 'text-primary hover:text-primary')}
        aria-label="Repeat"
      >
        <RepeatIcon size={20} />
      </Button>
    </div>
  );
}
