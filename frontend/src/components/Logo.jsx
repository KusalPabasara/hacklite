import React from 'react';

const Logo = ({ className = 'h-10' }) => {
  return (
    <div className="flex items-center space-x-2 group">
      {/* The SVG Icon */}
      <svg
        className={`${className} transition-transform duration-300 group-hover:scale-110`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MetaMind Logo"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
            <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          <path
            d="M24 4C14.0589 4 6 12.0589 6 22C6 29.2382 10.5964 35.342 17.151 37.8398C17.5815 37.9946 18 37.6432 18 37.1902V31.5C18 31.2239 18.2239 31 18.5 31H29.5C29.7761 31 30 31.2239 30 31.5V37.1902C30 37.6432 30.4185 37.9946 30.849 37.8398C37.4036 35.342 42 29.2382 42 22C42 12.0589 33.9411 4 24 4Z"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300 group-hover:stroke-[4]"
          />
          <path
            d="M24 31V21M24 21L21 26M24 21L27 26"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300 group-hover:stroke-[4]"
          />
          <path
            d="M18 22C18 18.6863 20.6863 16 24 16C27.3137 16 30 18.6863 30 22"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-[4]"
          />
        </g>
      </svg>
      {/* The Brand Name */}
      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-300 group-hover:from-cyan-300 group-hover:to-purple-300">
        MetaMind
      </span>
    </div>
  );
};

export default Logo;