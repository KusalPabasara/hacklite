import { useEffect, useState, useCallback } from "react";

export default function useGoogleTranslateFallback() {
  const [isReady, setIsReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // Fallback translation method using URL parameters
  const translateTo = useCallback((lang) => {
    console.log(`🌐 Fallback: Attempting to translate to: ${lang}`);
    
    // Map language names to codes
    const langCodes = {
      'English': 'en',
      'Sinhala': 'si', 
      'Tamil': 'ta'
    };
    
    const langCode = langCodes[lang] || 'en';
    
    // Update current language state
    setCurrentLanguage(lang);
    localStorage.setItem("selectedLang", lang);
    
    // Try to trigger Google Translate if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      try {
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`✅ Fallback: Used select element for: ${lang}`);
        return true;
      } catch (error) {
        console.warn('Select element error:', error);
      }
    }
    
    // If Google Translate is not available, show a message
    console.log(`ℹ️ Fallback: Google Translate not available, but language preference saved: ${lang}`);
    return false;
  }, []);

  // Initialize with saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang") || "English";
    console.log(`🔄 Fallback: Initializing with saved language: ${savedLang}`);
    
    setCurrentLanguage(savedLang);
    
    // Check if Google Translate is available
    const checkGoogleTranslate = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        console.log("✅ Fallback: Google Translate detected");
        setIsReady(true);
        return true;
      }
      return false;
    };
    
    // Check immediately
    if (checkGoogleTranslate()) {
      setIsReady(true);
    } else {
      // Wait for Google Translate to load
      let attempts = 0;
      const maxAttempts = 10;
      
      const interval = setInterval(() => {
        attempts++;
        if (checkGoogleTranslate()) {
          clearInterval(interval);
          setIsReady(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.warn("⚠️ Fallback: Google Translate not available, using fallback mode");
          setIsReady(true); // Still allow UI to work
        }
      }, 1000);
    }
  }, []);

  return { 
    translateTo, 
    isReady, 
    currentLanguage 
  };
}
