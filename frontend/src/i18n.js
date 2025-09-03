import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files
import en from './locales/en.json';
import si from './locales/si.json';

const resources = {
  en: { translation: en },
  si: { translation: si }
};

// Enhanced language detection with Sri Lankan context
const detectLanguage = () => {
  // Check localStorage first (user preference)
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && ['en', 'si', 'ta'].includes(storedLang)) {
    return storedLang;
  }

  // Detect from browser language
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.slice(0, 2).toLowerCase();

  // Map browser languages to our supported languages
  if (langCode === 'si') return 'si'; // Sinhala
  if (langCode === 'ta') return 'si'; // Tamil -> Sinhala (since we don't have Tamil i18n yet)
  if (langCode === 'en') return 'en'; // English
  
  // Default to English for unsupported languages
  return 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },

    react: {
      useSuspense: false,
    },
  });

// Set initial language attribute and store preference
const currentLang = i18n.language || 'en';
document.documentElement.lang = currentLang;
localStorage.setItem('i18nextLng', currentLang);

export default i18n;