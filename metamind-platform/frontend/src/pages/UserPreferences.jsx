import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Sun, Moon, Palette, ArrowRight, Check, Settings, User } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const UserPreferences = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Set initial theme preference based on system or stored preference
    const storedTheme = localStorage.getItem('theme-preference');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSelectedTheme('dark');
    } else {
      setSelectedTheme('light');
    }

    // Set initial language from localStorage
    const storedLang = localStorage.getItem('user_lang') || localStorage.getItem('preferredLang') || 'en';
    setSelectedLanguage(storedLang);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'si', name: 'Sinhala', flag: '🇱🇰', native: 'සිංහල' },
    { code: 'ta', name: 'Tamil', flag: '🇱🇰', native: 'தமிழ்' }
  ];

  const themes = [
    { 
      id: 'light', 
      name: 'Light Mode', 
      description: 'Clean and bright interface',
      icon: Sun,
      preview: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    },
    { 
      id: 'dark', 
      name: 'Dark Mode', 
      description: 'Easy on the eyes, perfect for low light',
      icon: Moon,
      preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    },
    { 
      id: 'system', 
      name: 'System', 
      description: 'Follows your device settings',
      icon: Settings,
      preview: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    }
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    setIsAnimating(true);
    
    // Apply theme immediately for preview
    if (themeId === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else if (themeId === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else if (themeId === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    // Save preferences
    localStorage.setItem('user_lang', selectedLanguage);
    localStorage.setItem('preferredLang', selectedLanguage);
    localStorage.setItem('theme-preference', selectedTheme);
    
    // Apply language change if needed
    if (window.setLanguage) {
      window.setLanguage(selectedLanguage);
    }
    
    // Navigate to questionnaire
    navigate('/questionnaire');
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300"
             style={{ 
               background: 'var(--gradient-corporate)',
               boxShadow: 'var(--shadow-colored)'
             }}>
          <Globe size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Choose Your Language
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Select your preferred language for the best experience
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
              selectedLanguage === lang.code ? 'scale-[1.02]' : ''
            } ${isAnimating && selectedLanguage === lang.code ? 'animate-pulse' : ''}`}
            style={{
              background: selectedLanguage === lang.code ? 'var(--bg-card)' : 'var(--bg-secondary)',
              borderColor: selectedLanguage === lang.code ? 'var(--accent-blue)' : 'var(--border-primary)',
              boxShadow: selectedLanguage === lang.code ? 'var(--shadow-colored)' : 'var(--shadow-sm)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{lang.flag}</span>
                <div className="text-left">
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {lang.name}
                  </h3>
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {lang.native}
                  </p>
                </div>
              </div>
              {selectedLanguage === lang.code && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--accent-blue)' }}>
                  <Check size={20} className="text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300"
             style={{ 
               background: 'var(--gradient-professional)',
               boxShadow: 'var(--shadow-colored)'
             }}>
          <Palette size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Choose Your Theme
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Pick the perfect theme that matches your style and comfort
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {themes.map((theme) => {
          const IconComponent = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                selectedTheme === theme.id ? 'scale-[1.02]' : ''
              } ${isAnimating && selectedTheme === theme.id ? 'animate-pulse' : ''}`}
              style={{
                background: selectedTheme === theme.id ? 'var(--bg-card)' : 'var(--bg-secondary)',
                borderColor: selectedTheme === theme.id ? 'var(--accent-blue)' : 'var(--border-primary)',
                boxShadow: selectedTheme === theme.id ? 'var(--shadow-colored)' : 'var(--shadow-sm)'
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center relative overflow-hidden"
                     style={{ background: theme.preview }}>
                  <IconComponent size={24} className="text-white relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {theme.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {theme.description}
                </p>
                {selectedTheme === theme.id && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: 'var(--accent-blue)' }}>
                      <Check size={16} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-all duration-500"
         style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              step >= 1 ? 'text-white' : 'text-gray-400'
            }`}
            style={{ 
              backgroundColor: step >= 1 ? 'var(--accent-blue)' : 'var(--bg-secondary)',
              boxShadow: step >= 1 ? 'var(--shadow-sm)' : 'none'
            }}>
              {step > 1 ? <Check size={20} /> : '1'}
            </div>
            <div className="w-16 h-1 rounded-full transition-all duration-300"
                 style={{ 
                   backgroundColor: step > 1 ? 'var(--accent-blue)' : 'var(--bg-secondary)'
                 }}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              step >= 2 ? 'text-white' : 'text-gray-400'
            }`}
            style={{ 
              backgroundColor: step >= 2 ? 'var(--accent-blue)' : 'var(--bg-secondary)',
              boxShadow: step >= 2 ? 'var(--shadow-sm)' : 'none'
            }}>
              2
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Step {step} of 2
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500">
          {step === 1 ? renderStep1() : renderStep2()}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-12">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md"
              style={{
                background: 'var(--bg-button-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-primary)'
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
            style={{
              background: 'var(--gradient-corporate)',
              color: 'white'
            }}
          >
            {step === 2 ? 'Start Assessment' : 'Continue'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
