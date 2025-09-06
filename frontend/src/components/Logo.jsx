import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = 'h-8', theme = 'auto' }) => {
  return (
    <Link to="/" className="flex items-center justify-center group h-full w-full">
      <div className="flex items-center justify-center h-full w-full">
        <img
          src="/marga-logo-light.svg"
          alt="Marga.lk Logo"
          className={`${className} w-auto hover:scale-105 transition-transform duration-200 dark:hidden drop-shadow-lg`}
          style={{ 
            maxHeight: '32px', 
            width: 'auto',
            filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.3)) drop-shadow(0 0 3px rgba(147, 51, 234, 0.2))'
          }}
        />
        <img
          src="/marga-logo-dark.svg"
          alt="Marga.lk Logo"
          className={`${className} w-auto hover:scale-105 transition-transform duration-200 hidden dark:block drop-shadow-lg`}
          style={{ 
            maxHeight: '32px', 
            width: 'auto',
            filter: 'drop-shadow(0 0 12px rgba(147, 51, 234, 0.4)) drop-shadow(0 0 4px rgba(147, 51, 234, 0.2))'
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;