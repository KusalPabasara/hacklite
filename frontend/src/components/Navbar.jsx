import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const Navbar = () => {
  const { user, logout, getAvatarData } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [googleTranslateLang, setGoogleTranslateLang] = useState('en');
  const [loadingLang, setLoadingLang] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get avatar data for display
  const avatarData = getAvatarData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Google Translate control functions
  useEffect(() => {
    const selectedLang = localStorage.getItem("googleLang");
    if (selectedLang) {
      setGoogleTranslateLang(selectedLang);
      setTimeout(() => {
        const select = document.querySelector("select.goog-te-combo");
        if (select) {
          select.value = selectedLang;
          select.dispatchEvent(new Event("change"));
        }
      }, 1000);
    }
  }, []);

  const waitForTranslateDropdown = (languageCode) => {
    setLoadingLang(true);
    const interval = setInterval(() => {
      const select = document.querySelector("select.goog-te-combo");
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event("change"));
        localStorage.setItem("googleLang", languageCode);
        setGoogleTranslateLang(languageCode);
        setLoadingLang(false);
        clearInterval(interval);
      }
    }, 300);
  };

  const switchGoogleTranslateLang = (lang) => {
    waitForTranslateDropdown(lang);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.lang = lng;
  };

  const navLinks = [
    { path: "/", label: t('dashboard'), icon: "🏠" },
    { path: "/quizzes", label: t('quizzes'), icon: "🧠" },
    { path: "/explore-careers", label: t('careers'), icon: "🔍" },
    { path: "/roadmap", label: t('roadmap'), icon: "🗺️" },
    { path: "/chat", label: "Assistant", icon: "🤖" },
    { path: "/mentors", label: t('mentors'), icon: "👥" },
    { path: "/inspiration", label: t('stories'), icon: "✨" },
    { path: "/leaderboard", label: t('leaderboard'), icon: "🏆" }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>{`
        /* Professional Navbar Styling */
        
        @keyframes nav-slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes dropdown-slide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-container {
          animation: nav-slide-down 0.5s ease-out;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #e2e8f0;
          font-weight: 500;
        }
        
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-link.active {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, #38bdf8, #3b82f6);
          transition: transform 0.3s ease-out;
          border-radius: 2px;
        }
        
        .nav-link.active::after {
          transform: translateX(-50%) scaleX(1);
        }
        
        .glass-nav {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-nav.scrolled {
          background: rgba(15, 23, 42, 0.98);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .dropdown-menu {
          animation: dropdown-slide 0.2s ease-out;
        }
        
        .user-avatar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }
        
        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
        
        .lang-btn {
          transition: all 0.3s ease;
        }
        
        .lang-btn.active {
          background: linear-gradient(135deg, #38bdf8, #3b82f6);
          color: white;
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .nav-container {
            padding: 0.5rem;
          }
        }
        
        /* Google Translate Widget Styling */
        .translate-widget {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .translate-widget-mobile {
          border-radius: 8px;
          overflow: hidden;
        }
        
        /* Google Translate elements are now hidden globally in index.css */
      `}</style>

      <nav className={`nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav scrolled' : 'glass-nav'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center flex-1 justify-center px-4">
              <div className="flex items-center space-x-1 flex-wrap justify-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActiveLink(link.path) ? 'active' : ''
                    }`}
                    title={link.label}
                  >
                    <span className="mr-1.5">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu & Language Switcher */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Google Translate Toggle Buttons */}
              <div className="flex items-center space-x-1 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => switchGoogleTranslateLang('en')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    googleTranslateLang === 'en' ? 'active' : 'text-gray-300 hover:text-white'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="English"
                >
                  <span className="truncate">🇬🇧 English</span>
                </button>
                <button
                  onClick={() => switchGoogleTranslateLang('si')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    googleTranslateLang === 'si' ? 'active' : 'text-gray-300 hover:text-white'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="සිංහල"
                >
                  <span className="truncate">🇱🇰 සිංහල</span>
                </button>
                <button
                  onClick={() => switchGoogleTranslateLang('ta')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    googleTranslateLang === 'ta' ? 'active' : 'text-gray-300 hover:text-white'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="தமிழ்"
                >
                  <span className="truncate">🇱🇰 தமிழ்</span>
                </button>
              </div>
              {loadingLang && (
                <div className="text-xs text-cyan-400 animate-pulse">
                  Translating...
                </div>
              )}

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-3 hover:bg-slate-800/50 rounded-lg px-3 py-2 transition-all duration-300"
                  >
                    <div className="user-avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm overflow-hidden">
                      {avatarData.type === 'image' ? (
                        <img src={avatarData.data} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{avatarData.data}</span>
                      )}
                    </div>
                    <span className="text-gray-200 text-sm font-medium hidden xl:block">{user.name}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="dropdown-menu absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {t('profile')}
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t('settings')}
                        </Link>
                        
                        <hr className="my-2 border-slate-700" />
                        
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

                        {/* Mobile Menu Button */}
                        <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            >
              <span className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800">
            <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Google Translate Toggle Buttons Mobile */}
              <div className="flex items-center justify-center space-x-1 mb-4 bg-slate-800/50 rounded-lg p-2">
                <button
                  onClick={() => switchGoogleTranslateLang('en')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-2 rounded-md text-sm font-medium flex-1 transition-all duration-300 ${
                    googleTranslateLang === 'en' ? 'active' : 'text-gray-300'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="English"
                >
                  <span className="truncate">🇬🇧 English</span>
                </button>
                <button
                  onClick={() => switchGoogleTranslateLang('si')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-2 rounded-md text-sm font-medium flex-1 transition-all duration-300 ${
                    googleTranslateLang === 'si' ? 'active' : 'text-gray-300'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="සිංහල"
                >
                  <span className="truncate">🇱🇰 සිංහල</span>
                </button>
                <button
                  onClick={() => switchGoogleTranslateLang('ta')}
                  disabled={loadingLang}
                  className={`lang-btn px-3 py-2 rounded-md text-sm font-medium flex-1 transition-all duration-300 ${
                    googleTranslateLang === 'ta' ? 'active' : 'text-gray-300'
                  } ${loadingLang ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="தமிழ்"
                >
                  <span className="truncate">🇱🇰 தமிழ்</span>
                </button>
              </div>
              {loadingLang && (
                <div className="text-center text-xs text-cyan-400 animate-pulse mb-4">
                  Translating...
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link block px-4 py-3 rounded-lg text-base font-medium ${
                    isActiveLink(link.path) ? 'active' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-800">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                      <div className="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                        {avatarData.type === 'image' ? (
                          <img src={avatarData.data} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span>{avatarData.data}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('profile')}
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('settings')}
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 mt-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-slate-800"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                    >
                      {t('register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;