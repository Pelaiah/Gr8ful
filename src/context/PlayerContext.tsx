'use client';

import type { ReactNode } from 'react';
import React, { createContext, useCallback, useEffect, useState, useRef } from 'react';
import { tracks } from '@/lib/data';
import type { Track, RepeatMode } from '@/types';

interface PlayerContextType {
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTrack: Track;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  isLyricsVisible: boolean;
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeatMode: () => void;
  setIsLyricsVisible: (visible: boolean) => void;
  setTrack: (track: Track) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [isLyricsVisible, setIsLyricsVisible] = useState(true);
  
  const currentTrack = tracks[currentTrackIndex];
  const duration = currentTrack.duration;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTrack = useCallback(() => {
    if (isShuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrackIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= tracks.length) {
          if (repeatMode === 'all') return 0;
          setIsPlaying(false);
          return prev;
        }
        return nextIndex;
      });
    }
    setProgress(0);
  }, [isShuffle, repeatMode]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= duration) {
          if (repeatMode === 'one') {
            return 0;
          }
          nextTrack();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }, [duration, repeatMode, nextTrack]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, startTimer]);
  
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const seek = (time: number) => {
    setProgress(time);
  };

  const prevTrack = () => {
    if (progress > 3) {
      setProgress(0);
    } else {
      setCurrentTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
      setProgress(0);
    }
  };
  
  const toggleShuffle = () => setIsShuffle(prev => !prev);

  const toggleRepeatMode = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const setTrack = (track: Track) => {
    const trackIndex = tracks.findIndex(t => t.id === track.id);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      setProgress(0);
      if(!isPlaying) setIsPlaying(true);
    } else {
      // If track is not in our mock data (e.g., from search), we can't play it.
      // In a real app, we would add it to the playlist.
      // For this demo, we'll just switch to a known track.
      const firstTrackIndex = 0;
      setCurrentTrackIndex(firstTrackIndex);
      setProgress(0);
      if(!isPlaying) setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        progress,
        duration,
        currentTrack,
        isShuffle,
        repeatMode,
        isLyricsVisible,
        togglePlay,
        seek,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleRepeatMode,
        setIsLyricsVisible,
        setTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
