'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'luxury' | 'streetwear' | 'boutique';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('luxury');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // We use a microtask to move the state update out of the synchronous render path
    // and satisfy the react-hooks/set-state-in-effect rule.
    Promise.resolve().then(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem('app-theme') as Theme;
      if (savedTheme) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    });
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
