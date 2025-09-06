import React, { useState, useEffect } from 'react';

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "si", label: "සිංහල", flag: "🇱🇰" },
  { code: "ta", label: "தமிழ்", flag: "🇱🇰" },
];

const LanguageDropdown = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get current language from localStorage or Google Translate
    const savedLang = localStorage.getItem('googleLang') || 'en';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Save to localStorage
    localStorage.setItem('googleLang', langCode);
    
    // Trigger Google Translate if available
    const waitForTranslateDropdown = (languageCode) => {
      const interval = setInterval(() => {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = languageCode;
          select.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
      }, 300);
      
      // Clear interval after 10 seconds to prevent infinite polling
      setTimeout(() => clearInterval(interval), 10000);
    };
    
    waitForTranslateDropdown(langCode);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    currentLang === lang.code 
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {currentLang === lang.code && (
                    <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageDropdown;
