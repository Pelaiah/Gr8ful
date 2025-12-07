'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown, Palette } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UICustomizer from './UICustomizer';
import { usePlayer } from '@/hooks/usePlayer';

export default function Header() {
  const { currentTrack } = usePlayer();
  const router = useRouter();

  const handleClose = () => {
    // In a real app, this might navigate back or minimize the player
    // For this demo, we'll navigate to a conceptual "home" or library page
    // Since we don't have one, we will just log to the console.
    console.log('Close button clicked');
    // router.back(); // or router.push('/library');
  };


  return (
    <header className="flex items-center justify-between">
      <button onClick={handleClose} className="p-2 -m-2" aria-label="Close player">
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
