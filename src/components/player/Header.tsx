'use client';

import { ChevronDown, Palette } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import UICustomizer from './UICustomizer';
import { usePlayer } from '@/hooks/usePlayer';

export default function Header() {
  const { currentTrack } = usePlayer();

  return (
    <header className="flex items-center justify-between">
      <button className="p-2 -m-2">
        <ChevronDown size={24} />
      </button>
      <div className="text-center">
        <p className="text-xs uppercase text-white/70 tracking-widest">Playing from Album</p>
        <p className="font-bold text-sm">{currentTrack.album}</p>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 -m-2" aria-label="Customize UI">
            <Palette size={24} />
          </button>
        </SheetTrigger>
        <SheetContent>
            <UICustomizer />
        </SheetContent>
      </Sheet>
    </header>
  );
}
