import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Globe, ChevronUp } from 'lucide-react';

const LanguageSwitcher = () => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('த');
  const [isSwitching, setIsSwitching] = useState(false);
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'si', name: 'සිං', fullName: 'Sinhala' },
    { code: 'ta', name: 'த', fullName: 'Tamil' }
  ];

  useEffect(() => {
    // This interval checks for the element Google's script creates.
    const interval = setInterval(() => {
      const googleTranslateSelect = document.querySelector('.goog-te-combo');
      if (googleTranslateSelect) {
        setIsReady(true);
        
        // Get current language from localStorage first, then Google Translate
        const savedLang = localStorage.getItem('language') || localStorage.getItem('googleLang') || 'ta';
        const currentLangCode = googleTranslateSelect.value || savedLang;
        const currentLangName = languages.find(lang => lang.code === currentLangCode)?.name || 'த';
        setCurrentLang(currentLangName);
        
        // Sync Google Translate with our saved language
        if (googleTranslateSelect.value !== savedLang) {
          googleTranslateSelect.value = savedLang;
          googleTranslateSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Listen for Google Translate changes
        const handleGoogleTranslateChange = (e) => {
          const newLangCode = e.target.value;
          const newLangName = languages.find(lang => lang.code === newLangCode)?.name || 'த';
          setCurrentLang(newLangName);
          
          // Update localStorage when Google Translate changes
          localStorage.setItem('language', newLangCode);
          localStorage.setItem('googleLang', newLangCode);
          document.documentElement.lang = newLangCode;
          document.body.lang = newLangCode;
        };
        
        googleTranslateSelect.addEventListener('change', handleGoogleTranslateChange);
        
        clearInterval(interval);
      }
    }, 200); // Check more frequently for faster response

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleLanguageChange = (langCode, langName) => {
    // Show switching state for visual feedback
    setIsSwitching(true);
    
    // Immediately update UI state for instant feedback
    setCurrentLang(langName);
    setIsOpen(false);
    
    // Update localStorage immediately
    localStorage.setItem('language', langCode);
    localStorage.setItem('googleLang', langCode);
    localStorage.setItem('preferredLang', langCode);
    
    // Update document attributes immediately
    document.documentElement.lang = langCode;
    document.body.lang = langCode;
    
    // Try multiple methods to ensure Google Translate works
    const triggerGoogleTranslate = () => {
      const googleTranslateSelect = document.querySelector('.goog-te-combo');
      
      if (googleTranslateSelect) {
        // Method 1: Direct value change
        googleTranslateSelect.value = langCode;
        
        // Method 2: Trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        googleTranslateSelect.dispatchEvent(changeEvent);
        
        // Method 3: Trigger input event
        const inputEvent = new Event('input', { bubbles: true });
        googleTranslateSelect.dispatchEvent(inputEvent);
        
        // Method 4: Force focus and blur to trigger
        googleTranslateSelect.focus();
        googleTranslateSelect.blur();
        
        console.log(`🌐 Language changed to: ${langName} (${langCode})`);
        setIsSwitching(false); // Hide switching state
        return true;
      }
      return false;
    };
    
    // Set a timeout to ensure switching state doesn't get stuck
    const switchingTimeout = setTimeout(() => {
      setIsSwitching(false);
    }, 3000); // Maximum 3 seconds switching state
    
    // Try immediately
    if (!triggerGoogleTranslate()) {
      // If Google Translate not ready, try again after a short delay
      setTimeout(() => {
        if (!triggerGoogleTranslate()) {
          console.warn('Google Translate not ready, will retry...');
          // Retry after longer delay
          setTimeout(() => {
            triggerGoogleTranslate();
            clearTimeout(switchingTimeout);
            setIsSwitching(false); // Hide switching state even if failed
          }, 1000);
        } else {
          clearTimeout(switchingTimeout);
        }
      }, 100);
    } else {
      clearTimeout(switchingTimeout);
    }
  };

  const currentLanguage = languages.find(lang => lang.name === currentLang) || languages[2];

  return (
    <div 
      className="relative notranslate" 
      ref={dropdownRef}
      style={{ 
        // Ensure Google Translate doesn't translate this element
        'translate': 'no',
        'transform': 'none'
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200"
        style={{
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333333',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'}`,
          borderRadius: '6px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          minWidth: '80px'
        }}
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          hoverTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
          }, 2000); // Extended timeout to 2 seconds
        }}
      >
        <Globe 
          size={16} 
          className={isSwitching ? 'animate-spin' : ''}
          style={{ 
            color: isSwitching ? (isDarkMode ? '#60a5fa' : '#3b82f6') : (isDarkMode ? '#9ca3af' : '#6b7280')
          }} 
        />
        <span 
          className="text-sm font-medium notranslate"
          style={{ 
            color: isDarkMode ? '#ffffff' : '#374151',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {currentLanguage.name}
        </span>
        <ChevronUp 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ 
            color: isDarkMode ? '#9ca3af' : '#6b7280' 
          }} 
        />
      </div>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1 w-48 rounded-lg shadow-lg border z-[9999] transition-all duration-200"
          style={{
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            boxShadow: isDarkMode 
              ? '0 10px 25px rgba(0, 0, 0, 0.5)' 
              : '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setIsOpen(false);
            }, 2000); // Extended timeout to 2 seconds
          }}
        >
          {languages.map((language) => (
            <div
              key={language.code}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
              style={{
                backgroundColor: currentLanguage.code === language.code 
                  ? (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                  : 'transparent',
                color: isDarkMode ? '#ffffff' : '#333333'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentLanguage.code === language.code 
                  ? (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                  : 'transparent';
              }}
              onClick={() => handleLanguageChange(language.code, language.name)}
            >
              <Globe 
                size={16} 
                style={{ 
                  color: isDarkMode ? '#9ca3af' : '#6b7280' 
                }} 
              />
              <span 
                className="text-sm font-medium notranslate"
                style={{ 
                  color: isDarkMode ? '#ffffff' : '#374151',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {language.name}
              </span>
              <span className="text-sm text-gray-500 ml-auto notranslate">
                {language.fullName}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;