'use client';

import { useState, useEffect, useCallback } from 'react';

type ThemeColor = {
  name: string;
  primary: string;
  accent: string;
};

export const themeColors: ThemeColor[] = [
  { name: 'Green', primary: '141 71% 42%', accent: '141 100% 85%' },
  { name: 'Blue', primary: '217 91% 60%', accent: '217 100% 88%' },
  { name: 'Purple', primary: '262 84% 60%', accent: '262 100% 88%' },
  { name: 'Orange', primary: '25 95% 53%', accent: '25 100% 85%' },
];

export const useUICustomizer = () => {
  const [activeTheme, setActiveTheme] = useState(themeColors[0]);
  
  const applyTheme = useCallback((theme: ThemeColor) => {
    const root = document.documentElement;
    if (root) {
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--ring', theme.primary);
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
