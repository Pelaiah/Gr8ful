'use client';

import { Search, SlidersHorizontal, Mic2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import OnlineSearch from './OnlineSearch';
import Equalizer from './Equalizer';
import DeviceSelector from './DeviceSelector';
import { usePlayer } from '@/hooks/usePlayer';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function Toolbar() {
    const { isLyricsVisible, setIsLyricsVisible } = usePlayer();

    return (
        <div className="flex items-center justify-around text-white/70">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" aria-label="Search music">
                        <Search size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl border-none bg-card">
                    <OnlineSearch />
                </SheetContent>
            </Sheet>

            <Button
                variant="ghost" 
                size="icon"
                className={cn("text-white/70 hover:text-white", isLyricsVisible && "text-primary")}
                onClick={() => setIsLyricsVisible(!isLyricsVisible)}
                aria-label="Toggle lyrics"
            >
                <Mic2 size={20} />
            </Button>
            
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" aria-label="Open equalizer">
                        <SlidersHorizontal size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl border-none bg-card">
                    <Equalizer />
                </SheetContent>
            </Sheet>
            
            <DeviceSelector />
        </div>
    );
}
