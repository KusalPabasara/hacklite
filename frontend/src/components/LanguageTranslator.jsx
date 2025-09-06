import React, { useState, useEffect } from 'react';

const LanguageTranslator = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Auto-restore last selected language
    const selectedLang = localStorage.getItem('googleLang');
    if (selectedLang) {
      setCurrentLang(selectedLang);
      setTimeout(() => {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = selectedLang;
          select.dispatchEvent(new Event('change'));
        }
      }, 1000);
    }
  }, []);

  const waitForTranslateDropdown = (languageCode) => {
    setIsLoading(true);
    const interval = setInterval(() => {
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event('change'));
        localStorage.setItem('googleLang', languageCode);
        setCurrentLang(languageCode);
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 300);
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
          onClick={() => waitForTranslateDropdown('en')}
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
          onClick={() => waitForTranslateDropdown('si')}
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
          onClick={() => waitForTranslateDropdown('ta')}
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
