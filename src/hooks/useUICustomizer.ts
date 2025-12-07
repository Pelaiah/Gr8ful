'use client';

import { useState, useEffect, useCallback } from 'react';

type ThemeColor = {
  name: string;
  primary: string;
  accent: string;
};

export const themeColors: ThemeColor[] = [
  { name: 'Purple', primary: '265 91% 60%', accent: '265 100% 95%' },
  { name: 'Yellow', primary: '45 91% 50%', accent: '45 100% 85%' },
  { name: 'Green', primary: '141 71% 42%', accent: '141 100% 85%' },
  { name: 'Blue', primary: '217 91% 60%', accent: '217 100% 88%' },
];

export const useUICustomizer = () => {
  const [activeTheme, setActiveTheme] = useState(themeColors[0]);
  
  const applyTheme = useCallback((theme: ThemeColor) => {
    const root = document.documentElement;
    if (root) {
      document.documentElement.classList.add('dark');
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--ring', theme.primary);
      if(theme.name === 'Yellow') {
        root.style.setProperty('--primary-foreground', '30 100% 6%');
      } else {
        root.style.setProperty('--primary-foreground', '0 0% 100%');
      }
    }
  }, []);

  useEffect(() => {
    const savedThemeName = localStorage.getItem('sonicflow-theme');
    const savedTheme = themeColors.find(t => t.name === savedThemeName) || themeColors[0];
    setActiveTheme(savedTheme);
    applyTheme(savedTheme);
  }, [applyTheme]);

  const setTheme = (theme: ThemeColor) => {
    setActiveTheme(theme);
    localStorage.setItem('sonicflow-theme', theme.name);
    applyTheme(theme);
  };
  
  return {
    themeColors,
    activeTheme,
    setTheme,
  };
};
