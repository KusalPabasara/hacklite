import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = 'h-10', theme = 'auto' }) => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="logo-wrapper">
        <img
          src="/marga-logo-dark.svg"
          alt="Marga.lk Logo"
          className={`${className} w-auto hover:scale-105 transition-transform duration-200 invert dark:invert-0`}
          style={{ maxHeight: '40px', width: 'auto' }}
        />
      </div>
    </Link>
  );
};

export default Logo;