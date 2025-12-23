import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfessionalLanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [googleTranslateReady, setGoogleTranslateReady] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', short: 'EN', nativeName: 'English' },
    { code: 'si', name: 'සිංහල', short: 'SI', nativeName: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்', short: 'TA', nativeName: 'தமிழ்' }
  ];

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  // Wait for Google Translate to be ready
  useEffect(() => {
    const checkGoogleTranslate = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        setGoogleTranslateReady(true);
        console.log('✅ Google Translate is ready');
        
        // Apply saved language
        const savedLang = localStorage.getItem('language') || 'en';
        if (savedLang !== 'en') {
          select.value = savedLang;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      return false;
    };

    // Listen for Google Translate ready event
    const handleGoogleTranslateReady = () => {
      console.log('🎉 Google Translate ready event received');
      if (checkGoogleTranslate()) {
        setGoogleTranslateReady(true);
        console.log('✅ Google Translate ready state updated to true');
      }
    };

    // Check immediately
    if (checkGoogleTranslate()) {
      setGoogleTranslateReady(true);
    } else {
      // Listen for the ready event
      window.addEventListener('googleTranslateReady', handleGoogleTranslateReady);
      
      // Fallback: check periodically
      const interval = setInterval(() => {
        if (checkGoogleTranslate()) {
          setGoogleTranslateReady(true);
          clearInterval(interval);
          console.log('✅ Google Translate ready via periodic check');
        }
      }, 500);
      
      // Clear interval after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
        if (!googleTranslateReady) {
          console.warn('⚠️ Google Translate failed to load after 10 seconds');
          // Still allow language switching for UI purposes
          setGoogleTranslateReady(true);
        }
      }, 10000);
    }

    return () => {
      window.removeEventListener('googleTranslateReady', handleGoogleTranslateReady);
    };
  }, []);

  // Language change handler using Google Translate
  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage === language) {
      setIsOpen(false);
      return;
    }
    
    setIsAnimating(true);
    setIsTranslating(true);
    setIsOpen(false);
    
    try {
      console.log(`🌐 ProfessionalLanguageToggle: Changing to ${newLanguage}`);
      
      // Update local context for UI state
      changeLanguage(newLanguage);
      
      // Save to localStorage
      localStorage.setItem('language', newLanguage);
      
      // Update document attributes
      document.documentElement.lang = newLanguage;
      document.body.lang = newLanguage;
      
      // Trigger Google Translate with better retry logic
      const triggerGoogleTranslate = () => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = newLanguage;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          console.log(`✅ Google Translate triggered: ${newLanguage}`);
          return true;
        }
        return false;
      };
      
      if (!triggerGoogleTranslate()) {
        console.log('⚠️ Google Translate not ready, will retry...');
        // Retry with exponential backoff
        let retryCount = 0;
        const maxRetries = 10;
        
        const retryInterval = setInterval(() => {
          retryCount++;
          if (triggerGoogleTranslate()) {
            clearInterval(retryInterval);
            console.log(`✅ Google Translate retry successful after ${retryCount} attempts: ${newLanguage}`);
          } else if (retryCount >= maxRetries) {
            clearInterval(retryInterval);
            console.error('❌ Google Translate failed after maximum retries');
          }
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Language change error:', error);
    } finally {
      setIsTranslating(false);
      // Reset animation state
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 224; // w-56 = 224px
      const viewportWidth = window.innerWidth;
      
      console.log('📍 Button position:', {
        rect,
        dropdownWidth,
        viewportWidth
      });
      
      // Calculate left position to align with button
      let leftPosition = rect.left;
      
      // Ensure dropdown doesn't go off the right edge
      if (leftPosition + dropdownWidth > viewportWidth) {
        leftPosition = viewportWidth - dropdownWidth - 16; // 16px margin from edge
      }
      
      // Ensure dropdown doesn't go off the left edge
      if (leftPosition < 16) {
        leftPosition = 16;
      }
      
      const newPosition = {
        top: rect.bottom + 8,
        left: leftPosition
      };
      
      console.log('📍 Setting dropdown position:', newPosition);
      setDropdownPosition(newPosition);
    }
  };

  const handleToggleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Toggle clicked, current state:', isOpen);
    
    if (!isOpen) {
      updateDropdownPosition();
    }
    
    setIsOpen(!isOpen);
    console.log('Setting isOpen to:', !isOpen);
  };

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      console.log('Dropdown opening, updating position');
      updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();
      const handleScroll = () => updateDropdownPosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  // Listen for Google Translate changes
  useEffect(() => {
    const handleGoogleTranslateChange = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        const currentLang = select.value;
        if (currentLang && currentLang !== language) {
          console.log(`🌐 Google Translate changed to: ${currentLang}`);
          changeLanguage(currentLang);
          localStorage.setItem('language', currentLang);
        }
      }
    };
    
    // Listen for Google Translate changes
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.addEventListener('change', handleGoogleTranslateChange);
    }
    
    // Also check periodically for changes
    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select && select.value !== language) {
        handleGoogleTranslateChange();
      }
    }, 1000);
    
    return () => {
      if (select) {
        select.removeEventListener('change', handleGoogleTranslateChange);
      }
      clearInterval(interval);
    };
  }, [language, changeLanguage]);
  
  // Note: Click outside handling is now done via portal overlay

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Debug logging (reduced)
  // console.log('🔄 Component render - isOpen:', isOpen, 'language:', language);

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <button
        ref={buttonRef}
        onClick={handleToggleClick}
        disabled={isTranslating || !googleTranslateReady}
        className={`
          ${sizeClasses.md}
          flex items-center gap-3
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-sm
          hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
          transition-all duration-200 ease-in-out
          ${isAnimating ? 'scale-95' : 'scale-100'}
          ${isTranslating || !googleTranslateReady ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
          font-medium text-gray-700 dark:text-gray-200
          min-w-[90px]
        `}
        aria-label={googleTranslateReady ? "Select language" : "Translation loading..."}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={googleTranslateReady ? "Click to change language" : "Translation system is loading..."}
      >
        <Globe 
          size={iconSizes.md} 
          className={`transition-transform duration-200 ${isTranslating ? 'animate-spin' : ''} ${googleTranslateReady ? 'text-orange-500' : 'text-gray-400'}`}
        />
        <span className="font-semibold text-sm">{currentLanguage.nativeName}</span>
        <ChevronDown 
          size={iconSizes.md} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ml-auto`}
        />
        {/* Google Translate ready indicator */}
        {googleTranslateReady && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" title="Translation ready" />
        )}
        {/* Debug indicator */}
        {isOpen && (
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Dropdown Menu - Using Portal */}
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
          style={{ 
            top: `${dropdownPosition.top || 40}px`,
            left: `${dropdownPosition.left || 0}px`,
            zIndex: 9999,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full px-4 py-3 text-left flex items-center justify-between
                hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600
                transition-colors duration-150
                ${language === lang.code 
                  ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' 
                  : 'text-gray-700 dark:text-gray-200'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{lang.nativeName}</span>
                  <span className="text-xs opacity-60">{lang.name !== lang.nativeName ? lang.name : ''}</span>
                </div>
              </div>
              {language === lang.code && (
                <Check size={16} className="text-orange-600 dark:text-orange-400" />
              )}
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* Click Outside Handler - Using Portal */}
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9998] bg-transparent" 
          onClick={() => {
            console.log('🎆 Click outside detected');
            setIsOpen(false);
          }}
        />,
        document.body
      )}

      {/* Translation Status Indicator */}
      {isTranslating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Switching language...
        </div>
      )}
      
      {/* Google Translate Loading Indicator */}
      {!googleTranslateReady && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Loading translation...
        </div>
      )}
    </div>
  );
};

export default ProfessionalLanguageToggle;