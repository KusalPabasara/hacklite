import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context
const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('metamind-theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to system preference
    return 'system';
  });

  const [isDark, setIsDark] = useState(false);

  // Function to get effective theme (resolve 'system' to actual theme)
  const getEffectiveTheme = (themeValue) => {
    if (themeValue === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeValue;
  };

  // Update DOM and state based on theme
  const applyTheme = (newTheme) => {
    const effectiveTheme = getEffectiveTheme(newTheme);
    const root = document.documentElement;
    const body = document.body;

    // Remove all theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(effectiveTheme);
    body.classList.add(effectiveTheme);

    // Update state
    setIsDark(effectiveTheme === 'dark');

    // Update CSS custom properties for dynamic theming
    if (effectiveTheme === 'dark') {
      root.style.setProperty('--theme-bg', 'rgb(17, 24, 39)'); // gray-900
      root.style.setProperty('--theme-surface', 'rgb(31, 41, 55)'); // gray-800
      root.style.setProperty('--theme-card', 'rgb(31, 41, 55)'); // gray-800
      root.style.setProperty('--theme-text', 'rgb(243, 244, 246)'); // gray-100
      root.style.setProperty('--theme-text-secondary', 'rgb(156, 163, 175)'); // gray-400
      root.style.setProperty('--theme-text-muted', 'rgb(107, 114, 128)'); // gray-500
      root.style.setProperty('--theme-border', 'rgb(75, 85, 99)'); // gray-600
      root.style.setProperty('--theme-border-light', 'rgb(55, 65, 81)'); // gray-700
      root.style.setProperty('--theme-primary', 'rgb(139, 92, 246)'); // violet-500
      root.style.setProperty('--theme-primary-hover', 'rgb(124, 58, 237)'); // violet-600
      root.style.setProperty('--theme-primary-light', 'rgba(139, 92, 246, 0.1)');
      root.style.setProperty('--theme-success', 'rgb(16, 185, 129)'); // emerald-500
      root.style.setProperty('--theme-warning', 'rgb(245, 158, 11)'); // amber-500
      root.style.setProperty('--theme-error', 'rgb(239, 68, 68)'); // red-500
      root.style.setProperty('--theme-shadow', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--theme-shadow-lg', 'rgba(0, 0, 0, 0.4)');
    } else {
      root.style.setProperty('--theme-bg', 'rgb(255, 255, 255)'); // white
      root.style.setProperty('--theme-surface', 'rgb(249, 250, 251)'); // gray-50
      root.style.setProperty('--theme-card', 'rgb(255, 255, 255)'); // white
      root.style.setProperty('--theme-text', 'rgb(17, 24, 39)'); // gray-900
      root.style.setProperty('--theme-text-secondary', 'rgb(107, 114, 128)'); // gray-500
      root.style.setProperty('--theme-text-muted', 'rgb(156, 163, 175)'); // gray-400
      root.style.setProperty('--theme-border', 'rgb(229, 231, 235)'); // gray-200
      root.style.setProperty('--theme-border-light', 'rgb(243, 244, 246)'); // gray-100
      root.style.setProperty('--theme-primary', 'rgb(139, 92, 246)'); // violet-500
      root.style.setProperty('--theme-primary-hover', 'rgb(124, 58, 237)'); // violet-600
      root.style.setProperty('--theme-primary-light', 'rgb(245, 243, 255)'); // violet-50
      root.style.setProperty('--theme-success', 'rgb(16, 185, 129)'); // emerald-500
      root.style.setProperty('--theme-warning', 'rgb(245, 158, 11)'); // amber-500
      root.style.setProperty('--theme-error', 'rgb(239, 68, 68)'); // red-500
      root.style.setProperty('--theme-shadow', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--theme-shadow-lg', 'rgba(0, 0, 0, 0.15)');
    }

    // Save to localStorage
    localStorage.setItem('metamind-theme', newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Toggle between light and dark (skip system)
  const toggleTheme = () => {
    if (theme === 'light' || (theme === 'system' && !isDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Set specific theme
  const handleSetTheme = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Provide context value
  const contextValue = {
    theme,
    isDark,
    toggleTheme,
    setTheme: handleSetTheme,
    effectiveTheme: getEffectiveTheme(theme),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
