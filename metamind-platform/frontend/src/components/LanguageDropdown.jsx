import React, { useState, useEffect, useRef } from 'react';

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "si", label: "සිංහල", flag: "🇱🇰" },
  { code: "ta", label: "தமிழ்", flag: "🇱🇰" },
];

const LanguageDropdown = ({ className = '' }) => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Get current language from localStorage or Google Translate
    const savedLang = localStorage.getItem('googleLang') || 
                     localStorage.getItem('preferredLang') || 
                     localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode) => {
    setIsLoading(true);
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Save to all possible localStorage keys for consistency
    localStorage.setItem('googleLang', langCode);
    localStorage.setItem('preferredLang', langCode);
    localStorage.setItem('language', langCode);
    
    // Update document attributes
    document.documentElement.lang = langCode;
    document.body.lang = langCode;
    
    // Trigger Google Translate if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }));

    // Reset loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <>
      <style jsx>{`
        .language-dropdown-container {
          position: relative;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .language-dropdown-menu {
          position: absolute !important;
          z-index: 9999 !important;
          top: 100% !important;
          right: 0 !important;
          margin-top: 8px !important;
        }
        
        .language-backdrop {
          position: fixed !important;
          z-index: 9998 !important;
        }
        
        /* Mobile positioning */
        @media (max-width: 640px) {
          .language-dropdown-menu {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, -50%) !important;
            margin-top: 0 !important;
            width: 280px !important;
            max-width: 90vw !important;
          }
        }
        
        /* Animation */
        @keyframes dropdown-appear {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes dropdown-appear-mobile {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .language-dropdown-menu {
          animation: dropdown-appear 0.15s ease-out;
        }
        
        @media (max-width: 640px) {
          .language-dropdown-menu {
            animation: dropdown-appear-mobile 0.15s ease-out;
          }
        }
      `}</style>

      <div className={`language-dropdown-container ${className}`} ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className={`
            flex items-center space-x-2 px-3 py-2 text-sm font-medium 
            text-gray-700 dark:text-gray-200 
            hover:text-gray-900 dark:hover:text-white 
            hover:bg-gray-100 dark:hover:bg-gray-700
            rounded-lg transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-pink-500 focus:ring-offset-1
            ${isLoading ? 'opacity-75 cursor-wait' : 'cursor-pointer'}
            ${isOpen ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-blue-500 dark:ring-pink-500 ring-offset-1' : ''}
          `}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Select Language"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          ) : (
            <>
              <span className="text-lg" role="img" aria-label={currentLanguage.label}>
                {currentLanguage.flag}
              </span>
              <span className="hidden sm:inline">{currentLanguage.label}</span>
              <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
            </>
          )}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="language-backdrop fixed inset-0 bg-black bg-opacity-25 sm:bg-transparent"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <div 
              className="language-dropdown-menu w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-menu"
            >
              <div className="py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLanguageChange(lang.code);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-sm text-left 
                      transition-all duration-150
                      ${currentLang === lang.code 
                        ? 'bg-blue-50 dark:bg-pink-900/20 text-blue-600 dark:text-pink-300 border-r-2 border-blue-500 dark:border-pink-500' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                      focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    role="menuitem"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg flex-shrink-0" role="img" aria-label={lang.label}>
                        {lang.flag}
                      </span>
                      <span className="flex-grow min-w-0">
                        <span className="block truncate font-medium">{lang.label}</span>
                      </span>
                    </div>
                    {currentLang === lang.code && (
                      <svg 
                        className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-pink-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LanguageDropdown;