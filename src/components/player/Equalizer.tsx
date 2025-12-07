'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const bands = ['60', '150', '400', '1k', '2.4k', '15k'];
const presets = {
  'Default': [50, 50, 50, 50, 50, 50],
  'Pop': [60, 70, 55, 45, 65, 75],
  'Rock': [75, 65, 45, 55, 70, 80],
  'Jazz': [70, 60, 50, 65, 75, 65],
  'Classical': [80, 70, 60, 50, 40, 30],
};
type PresetName = keyof typeof presets;

export default function Equalizer() {
  const [levels, setLevels] = useState<number[]>(presets['Default']);

  const handleSliderChange = (index: number, value: number[]) => {
    const newLevels = [...levels];
    newLevels[index] = value[0];
    setLevels(newLevels);
  };

  const applyPreset = (name: PresetName) => {
    setLevels(presets[name]);
  };

  return (
    <div className="p-4 h-[70vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Equalizer</h2>
      <div className="flex-grow flex items-center justify-around gap-4 px-4">
        {bands.map((band, index) => (
          <div key={band} className="flex flex-col items-center h-4/5">
            <Slider
              orientation="vertical"
              value={[levels[index]]}
              onValueChange={(value) => handleSliderChange(index, value)}
              className="w-2 h-full my-auto [&>span]:w-full [&>span>span]:bg-primary"
            />
            <span className="text-xs mt-4 font-medium text-muted-foreground">{band}Hz</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
            <Zap className="text-primary" size={16} />
            <h3 className="font-semibold text-foreground">Presets</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(presets).map((name) => (
            <Button
              key={name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(name as PresetName)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
