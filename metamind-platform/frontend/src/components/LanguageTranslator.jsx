import React, { useState, useEffect } from 'react';

const LanguageTranslator = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
    
    // Check Google Translate status
    const checkGoogleTranslate = () => {
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        setCurrentLang(select.value || savedLang);
      } else {
        setTimeout(checkGoogleTranslate, 500);
      }
    };
    
    setTimeout(checkGoogleTranslate, 1000);
  }, []);

  const changeLanguage = (languageCode) => {
    setIsLoading(true);
    
    // Update local state
    setCurrentLang(languageCode);
    localStorage.setItem('language', languageCode);
    
    // Update document attributes
    document.documentElement.lang = languageCode;
    document.body.lang = languageCode;
    
    // Trigger Google Translate
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = languageCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      setIsLoading(false);
    } else {
      // Retry after delay
      setTimeout(() => {
        const retrySelect = document.querySelector('.goog-te-combo');
        if (retrySelect) {
          retrySelect.value = languageCode;
          retrySelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
          <span>Translating...</span>
        </div>
      )}
      
      {/* Language buttons */}
      <div className="flex space-x-1">
        <button
          onClick={() => changeLanguage('en')}
          disabled={isLoading}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center
            ${currentLang === 'en' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
          `}
          title="Switch to English"
        >
          🇬🇧 English
        </button>
        
        <button
          onClick={() => changeLanguage('si')}
          disabled={isLoading}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center
            ${currentLang === 'si' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
          `}
          title="Switch to Sinhala"
        >
          🇱🇰 සිංහල
        </button>
        
        <button
          onClick={() => changeLanguage('ta')}
          disabled={isLoading}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center
            ${currentLang === 'ta' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
          `}
          title="Switch to Tamil"
        >
          🇱🇰 தமிழ்
        </button>
      </div>
    </div>
  );
};

export default LanguageTranslator;
