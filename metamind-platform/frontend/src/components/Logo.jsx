import React, { useState, useEffect } from 'react';

// Enhanced Logo component with theme-aware image switching and fallback SVG
const Logo = ({ className = 'h-10', theme = 'auto' }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [imageError, setImageError] = useState(false);

  // Theme detection and management
  useEffect(() => {
    const detectTheme = () => {
      if (theme !== 'auto') {
        setCurrentTheme(theme);
        return;
      }

      // Check for theme in various places
      const savedTheme = localStorage.getItem('theme');
      const htmlClass = document.documentElement.classList.contains('dark');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      const detectedTheme = savedTheme || (htmlClass ? 'dark' : systemTheme);
      setCurrentTheme(detectedTheme);
    };

    detectTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'auto') detectTheme();
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Listen for manual theme changes
    const handleThemeChange = () => detectTheme();
    window.addEventListener('themeChanged', handleThemeChange);
    
    // Observer for class changes on document element
    const observer = new MutationObserver(() => {
      if (theme === 'auto') detectTheme();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('themeChanged', handleThemeChange);
      observer.disconnect();
    };
  }, [theme]);

  // Get appropriate logo source based on theme
  const getLogoSource = () => {
    if (imageError) return null; // Use SVG fallback
    
    if (currentTheme === 'dark') {
      return "/marga-logo-dark.svg"; // Pink logo for dark mode
    } else {
      return "/marga-logo-light.svg"; // Blue logo for light mode (you'll need to create this)
    }
  };

  // Handle image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback SVG logo with theme-aware colors
  const SVGLogo = () => {
    const colors = currentTheme === 'dark' 
      ? {
          primary: '#ec4899',   // Pink for dark mode
          secondary: '#be185d', // Darker pink
          accent: '#f472b6',    // Light pink
          text: '#f9fafb'       // Light text
        }
      : {
          primary: '#2563eb',   // Blue for light mode
          secondary: '#1e40af', // Darker blue
          accent: '#3b82f6',    // Medium blue
          text: '#1f2937'       // Dark text
        };

    return (
      <svg
        width="160"
        height="40"
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} w-auto transition-all duration-300`}
      >
        <defs>
          <linearGradient id={`logoGradient-${currentTheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.2" />
            <stop offset="50%" stopColor={colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`textGradient-${currentTheme}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect
          width="160"
          height="40"
          rx="8"
          fill={`url(#logoGradient-${currentTheme})`}
          className="transition-all duration-300"
        />
        
        {/* Logo symbol - Abstract "M" */}
        <path
          d="M12 8 L22 28 L32 8 L32 16 L26 28 L20 16 L20 28 L12 16 Z"
          fill={colors.primary}
          className="transition-colors duration-300"
        />
        
        {/* Text "Marga" */}
        <text
          x="42"
          y="25"
          fontSize="16"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill={`url(#textGradient-${currentTheme})`}
          className="transition-all duration-300"
        >
          Marga
        </text>
        
        {/* Subtitle ".lk" */}
        <text
          x="92"
          y="30"
          fontSize="10"
          fontWeight="500"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill={colors.accent}
          className="transition-colors duration-300"
        >
          .lk
        </text>
        
        {/* Decorative dots */}
        <circle cx="140" cy="12" r="1.5" fill={colors.accent} className="transition-colors duration-300" />
        <circle cx="144" cy="16" r="1" fill={colors.primary} className="transition-colors duration-300" />
        <circle cx="140" cy="20" r="0.8" fill={colors.secondary} className="transition-colors duration-300" />
      </svg>
    );
  };

  const logoSource = getLogoSource();

  return (
    <div className="flex items-center group logo-container">
      <div className="logo-wrapper relative">
        {logoSource && !imageError ? (
          <img
            src={logoSource}
            alt="Marga.lk Logo"
            className={`${className} w-auto hover:scale-110 transition-all duration-300 filter drop-shadow-lg hover:drop-shadow-xl`}
            style={{ 
              maxHeight: '40px', 
              width: 'auto',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
            onError={handleImageError}
            onLoad={() => setImageError(false)} // Reset error state if image loads successfully
          />
        ) : (
          <SVGLogo />
        )}
        
        {/* Enhanced glow effect on hover */}
        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
          currentTheme === 'dark' 
            ? 'bg-gradient-to-r from-pink-400/20 to-purple-400/20' 
            : 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20'
        }`}></div>
      </div>
    </div>
  );
};

export default Logo;