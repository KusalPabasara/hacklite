import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ variant = 'dropdown', className = '' }) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  // Dropdown variant - shows all three options
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 rounded-lg ${className}`}
          title="Change theme"
        >
          <span className="mr-3 text-lg">
            {theme === 'system' ? '🌓' : isDark ? '🌙' : '🌞'}
          </span>
          <span className="flex-1 text-left">
            {theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
          </span>
          <span className={`ml-2 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button
                onClick={() => {
                  setTheme('light');
                  setShowDropdown(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === 'light' ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">🌞</span>
                Light Mode
                {theme === 'light' && <span className="ml-auto">✓</span>}
              </button>
              
              <button
                onClick={() => {
                  setTheme('dark');
                  setShowDropdown(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === 'dark' ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">🌙</span>
                Dark Mode
                {theme === 'dark' && <span className="ml-auto">✓</span>}
              </button>
              
              <button
                onClick={() => {
                  setTheme('system');
                  setShowDropdown(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === 'system' ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">🌓</span>
                System
                {theme === 'system' && <span className="ml-auto">✓</span>}
              </button>
            </div>
          </div>
        )}

        {/* Backdrop to close dropdown */}
        {showDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  }

  // Toggle variant - simple toggle button
  if (variant === 'toggle') {
    return (
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${ isDark ? 'bg-violet-600' : 'bg-gray-200' } ${className}`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ isDark ? 'translate-x-6' : 'translate-x-1' }`}
        />
      </button>
    );
  }

  // Icon variant - just an icon button
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="relative w-5 h-5">
          {/* Sun icon */}
          <svg
            className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${ isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100' }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>

          {/* Moon icon */}
          <svg
            className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${ isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0' }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
      </button>
    );
  }

  // Floating variant - floating action button style
  if (variant === 'floating') {
    return (
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center ${className}`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <span className="text-xl">
          {isDark ? '🌞' : '🌙'}
        </span>
      </button>
    );
  }

  // Default: Simple button variant
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 rounded-lg ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="mr-3 text-lg">
        {isDark ? '🌞' : '🌙'}
      </span>
      <span className="flex-1 text-left">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;