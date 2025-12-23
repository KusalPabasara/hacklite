import React, { useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '', showLabel = false, size = 'md' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        className={`enhanced-theme-toggle ${sizeClasses[size]} flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 relative overflow-hidden group ${className}`}
        style={{
          background: 'var(--bg-button-secondary)',
          borderColor: 'var(--border-primary)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-sm)',
          focusRingColor: 'var(--focus-ring)'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'var(--border-focus)';
          e.target.style.background = 'var(--hover-bg)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'var(--border-primary)';
          e.target.style.background = 'var(--bg-button-secondary)';
        }}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        
        {/* Theme icons with smooth transition */}
        <div className={`relative z-10 transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}>
          {isDarkMode ? (
            <Sun 
              size={iconSizes[size]} 
              className="transition-all duration-300 hover:rotate-12 drop-shadow-sm"
              style={{ color: 'var(--accent-yellow)' }}
            />
          ) : (
            <Moon 
              size={iconSizes[size]} 
              className="transition-all duration-300 hover:rotate-12 drop-shadow-sm"
              style={{ color: 'var(--accent-blue)' }}
            />
          )}
        </div>
        
      </button>
      
      {showLabel && (
        <span 
          className="text-sm font-medium transition-colors duration-300 select-none"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isDarkMode ? 'Dark' : 'Light'} Mode
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;