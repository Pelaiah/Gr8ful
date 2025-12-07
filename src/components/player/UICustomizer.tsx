'use client';

import { useUICustomizer } from '@/hooks/useUICustomizer';
import { Check } from 'lucide-react';

export default function UICustomizer() {
  const { themeColors, activeTheme, setTheme } = useUICustomizer();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Customize UI</h2>
      <p className="text-muted-foreground mb-6">Pick a color to personalize your player.</p>
      
      <div className="grid grid-cols-2 gap-4">
        {themeColors.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme)}
            className="p-4 rounded-none border-2 transition-colors flex flex-col items-center justify-center relative"
            style={{
              borderColor: activeTheme.name === theme.name ? `hsl(${theme.primary})` : 'hsl(var(--border))'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-none" style={{ backgroundColor: `hsl(${theme.primary})` }} />
              <div className="w-6 h-6 rounded-none" style={{ backgroundColor: `hsl(${theme.accent})` }} />
            </div>
            <p className="font-medium text-foreground text-sm">{theme.name}</p>
            {activeTheme.name === theme.name && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-none flex items-center justify-center" style={{ backgroundColor: `hsl(${theme.primary})` }}>
                <Check size={16} className="text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
