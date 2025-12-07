'use client';

import { usePlayer } from '@/hooks/usePlayer';
import { Slider } from '@/components/ui/slider';

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function ProgressBar() {
  const { progress, duration, seek } = usePlayer();

  return (
    <div className="w-full mb-2">
      <Slider
        value={[progress]}
        max={duration}
        step={1}
        onValueChange={(value) => seek(value[0])}
        className="[&_span:first-child]:h-2 [&>span>span]:bg-primary [&>span>span]:h-2 [&>a]:h-4 [&>a]:w-4 [&>a]:bg-white [&>a]:border-2 [&>a]:border-black [&>a]:rounded-none"
      />
      <div className="flex justify-between text-xs text-white/70 mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
