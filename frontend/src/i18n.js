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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

// Set initial language attribute
const currentLang = localStorage.getItem('i18nextLng') || 'en';
document.documentElement.lang = currentLang;

export default i18n;