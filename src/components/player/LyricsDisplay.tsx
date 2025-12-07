'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LyricsDisplay() {
  const { currentTrack, progress, isLyricsVisible } = usePlayer();
  const scrollRef = useRef<HTMLDivElement>(null);

  const lyricsLines = useMemo(() => currentTrack.lyrics.split('\n'), [currentTrack.lyrics]);
  
  const activeLineIndex = useMemo(() => {
    const totalLines = lyricsLines.length;
    if (totalLines === 0) return -1;
    const timePerLine = currentTrack.duration / totalLines;
    return Math.min(Math.floor(progress / timePerLine), totalLines - 1);
  }, [progress, currentTrack.duration, lyricsLines.length]);

  useEffect(() => {
    if (isLyricsVisible && scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(`[data-line-index="${activeLineIndex}"]`) as HTMLElement;
      if (activeElement) {
        const parent = scrollRef.current.parentElement?.parentElement; // viewport
        if(parent) {
            const parentHeight = parent.clientHeight;
            const scrollPosition = activeElement.offsetTop - parentHeight / 2 + activeElement.clientHeight / 2;
            parent.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
      }
    }
  }, [activeLineIndex, isLyricsVisible]);
  
  if (!isLyricsVisible) return <div className="flex-grow" />;

  return (
    <div className="w-full h-64 my-auto">
      <ScrollArea className="h-full w-full bg-black/30 backdrop-blur-sm rounded-none border border-white/20">
        <div ref={scrollRef} className="p-4">
          {lyricsLines.map((line, index) => (
            <p
              key={index}
              data-line-index={index}
              className={cn(
                'text-center text-lg font-bold transition-all duration-300 py-2 leading-tight',
                index === activeLineIndex ? 'text-primary scale-105' : 'text-white/70'
              )}
            >
              {line || '...'}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
