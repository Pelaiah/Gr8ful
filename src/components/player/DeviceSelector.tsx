import { Airplay, Smartphone, Speaker, Headphones, Tv2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';

const devices = [
  { name: 'This Phone', icon: Smartphone },
  { name: 'Earpods', icon: Headphones },
  { name: 'Home Speaker', icon: Speaker },
  { name: 'Living Room TV', icon: Tv2 },
];

export default function DeviceSelector() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" aria-label="Select playback device">
            <Airplay size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 border-none bg-card/80 backdrop-blur-md text-foreground">
        <div className="space-y-4">
            <h3 className="font-bold">Connect to a device</h3>
            <div className="space-y-2">
                {devices.map((device) => (
                    <button key={device.name} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <device.icon size={20} />
                        <span className="font-medium">{device.name}</span>
                    </button>
                ))}
            </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
