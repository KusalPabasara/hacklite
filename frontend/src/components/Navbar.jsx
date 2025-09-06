import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
<<<<<<< HEAD

const Navbar = () => {
  const { user, logout, getAvatarData } = useContext(AuthContext);
=======
import ThemeToggle from "../components/ThemeToggle";
import LanguageDropdown from "../components/LanguageDropdown";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
>>>>>>> c2fbe43 (Initial commit)
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [googleTranslateLang, setGoogleTranslateLang] = useState('en');
  const [loadingLang, setLoadingLang] = useState(false);
<<<<<<< HEAD
  const dropdownRef = useRef(null);
  
  // Get avatar data for display
  const avatarData = getAvatarData();
=======
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  
  // Function to get initials from full name
  const getInitial = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length > 1) {
      // Return first letter of first name and last name
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Load user profile from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  // Listen for profile updates from Profile page
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      setUserProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);
>>>>>>> c2fbe43 (Initial commit)

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

<<<<<<< HEAD
  // Google Translate control functions
  useEffect(() => {
    const selectedLang = localStorage.getItem("googleLang");
    if (selectedLang) {
      setGoogleTranslateLang(selectedLang);
      setTimeout(() => {
=======
  // Google Translate control functions with enhanced persistence
  useEffect(() => {
    const selectedLang = localStorage.getItem("preferredLang") || localStorage.getItem("googleLang");
    const i18nLang = localStorage.getItem("i18nextLng");
    
    // Set initial language from localStorage
    if (selectedLang) {
      setGoogleTranslateLang(selectedLang);
      setCurrentLang(selectedLang);
      
      // Apply language to document
      document.documentElement.lang = selectedLang;
      document.body.lang = selectedLang;
      
      // Apply to Google Translate with retry mechanism
      const applyLanguage = () => {
>>>>>>> c2fbe43 (Initial commit)
        const select = document.querySelector("select.goog-te-combo");
        if (select) {
          select.value = selectedLang;
          select.dispatchEvent(new Event("change"));
<<<<<<< HEAD
        }
      }, 1000);
=======
          return true;
        }
        return false;
      };
      
      // Try immediately
      if (!applyLanguage()) {
        // If not ready, wait and try again
        const interval = setInterval(() => {
          if (applyLanguage()) {
            clearInterval(interval);
          }
        }, 200);
        
        // Clear interval after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
      }
    } else if (i18nLang) {
      // Fallback to i18n language
      setGoogleTranslateLang(i18nLang);
      setCurrentLang(i18nLang);
      document.documentElement.lang = i18nLang;
      document.body.lang = i18nLang;
>>>>>>> c2fbe43 (Initial commit)
    }
  }, []);

  const waitForTranslateDropdown = (languageCode) => {
    setLoadingLang(true);
    const interval = setInterval(() => {
      const select = document.querySelector("select.goog-te-combo");
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event("change"));
<<<<<<< HEAD
        localStorage.setItem("googleLang", languageCode);
        setGoogleTranslateLang(languageCode);
=======
        
        // Enhanced persistence
        localStorage.setItem("googleLang", languageCode);
        localStorage.setItem("i18nextLng", languageCode);
        localStorage.setItem("preferredLang", languageCode);
        
        setGoogleTranslateLang(languageCode);
        setCurrentLang(languageCode);
        
        // Update document language attributes
        document.documentElement.lang = languageCode;
        document.body.lang = languageCode;
        
>>>>>>> c2fbe43 (Initial commit)
        setLoadingLang(false);
        clearInterval(interval);
      }
    }, 300);
  };

  const switchGoogleTranslateLang = (lang) => {
<<<<<<< HEAD
    waitForTranslateDropdown(lang);
  };

=======
    // Update i18n language as well
    i18n.changeLanguage(lang);
    waitForTranslateDropdown(lang);
  };

  const setLanguage = (lang) => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      localStorage.setItem('preferredLang', lang);
      setGoogleTranslateLang(lang);
      setCurrentLang(lang);
    } else {
      // Fallback to existing method if Google Translate not loaded
      switchGoogleTranslateLang(lang);
    }
  };

  const changeLang = (lang) => {
    localStorage.setItem('preferredLang', lang);
    setGoogleTranslateLang(lang);
    setCurrentLang(lang);

    // Use the global setLanguage function for better reliability
    if (window.setLanguage) {
      window.setLanguage(lang);
    } else {
      // Fallback method
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      }
    }
  };

>>>>>>> c2fbe43 (Initial commit)
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

<<<<<<< HEAD
  return (
    <>
      <style>{`
        /* Professional Navbar Styling */
        
        @keyframes nav-slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
=======
  // Get the best available name for display
  const getDisplayName = () => {
    return userProfile?.fullName || user?.name || 'User';
  };

  // Get the best available email for display
  const getDisplayEmail = () => {
    return userProfile?.email || user?.email || '';
  };

  return (
    <>
      <style>{`
        /* Professional Dark Theme Navbar Styling */
>>>>>>> c2fbe43 (Initial commit)
        
        @keyframes dropdown-slide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
<<<<<<< HEAD
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
=======
        .dark-navbar {
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
          height: 72px;
        }
        
        .dark-navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .nav-link {
          text-decoration: none;
          font-size: 15px;
          color: #cbd5e1;
          font-weight: 500;
          padding: 0;
          transition: color 0.2s ease;
          border: none;
          background: none;
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: #ffffff;
          border-bottom: 2px solid #7f5af0;
        }
        
        .contact-btn {
          background-color: #7f5af0;
          border: 1px solid transparent;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
          text-decoration: none;
        }
        
        .contact-btn:hover {
          background-color: #6c47e0;
        }
        
        .lang-dropdown {
          position: relative;
        }
        
        .lang-dropdown:hover .lang-menu {
          display: block;
        }
        
        
        .lang-menu {
          display: none;
          position: absolute;
          top: 110%;
          right: 0;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          min-width: 120px;
          padding: 8px 0;
          z-index: 1001;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .lang-menu button {
          color: #e2e8f0;
          padding: 8px 16px;
          text-decoration: none;
          font-size: 14px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .lang-menu button:hover {
          background: #334155;
          color: #fff;
        }
        
        .profile-dropdown {
          position: relative;
        }
        
        .profile-dropdown:hover .profile-menu {
          display: block;
        }
        
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #cbd5e1;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .profile-btn:hover {
          background: #1e293b;
          color: #fff;
        }
        
        .profile-menu {
          display: none;
          position: absolute;
          top: 110%;
          right: 0;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          min-width: 160px;
          padding: 8px 0;
          z-index: 1001;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .profile-menu a {
          color: #e2e8f0;
          padding: 8px 16px;
          text-decoration: none;
          font-size: 14px;
          display: block;
          transition: all 0.2s ease;
        }
        
        .profile-menu a:hover {
          background: #334155;
          color: #fff;
        }
        
        .profile-menu button {
          color: #e2e8f0;
          padding: 8px 16px;
          text-decoration: none;
          font-size: 14px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .profile-menu button:hover {
          background: #334155;
          color: #fff;
        }
        
        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #374151;
          border: 2px solid #6d28d9;
        }
        
        .mobile-menu {
          display: none;
        }
        
        @media (max-width: 1024px) {
          .dark-navbar {
            flex-wrap: wrap;
            height: auto;
            padding: 16px;
          }
          
          .navbar-links {
            flex-wrap: wrap;
            gap: 16px;
            padding-top: 10px;
          }
          
          .contact-btn {
            padding: 6px 12px;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu {
            display: block;
          }
          
          .desktop-nav {
            display: none;
          }
        }
      `}</style>

      <nav className={`dark-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`} lang={currentLang}>
        <div className="max-w-full mx-auto px-8">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo and Navigation Links */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <Logo className="h-8" />

              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex gap-8 items-center desktop-nav ml-8">
>>>>>>> c2fbe43 (Initial commit)
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
<<<<<<< HEAD
                    className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActiveLink(link.path) ? 'active' : ''
                    }`}
                    title={link.label}
                  >
                    <span className="mr-1.5">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
=======
                    className={`nav-link ${isActiveLink(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
>>>>>>> c2fbe43 (Initial commit)
                  </Link>
                ))}
              </div>
            </div>

<<<<<<< HEAD
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
=======
            {/* Right: Contact, Language, and Profile */}
            <div className="flex items-center gap-5">
              {/* Contact Button */}
              <Link 
                to="/contact" 
                className="contact-btn"
              >
                Contact Us
              </Link>

              {/* Language Dropdown */}
              <LanguageDropdown />

              {/* Profile Dropdown */}
              {user ? (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <button className="profile-btn">
                    <div className="profile-avatar">
                      {userProfile?.avatar ? (
                        <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        getInitial(getDisplayName())
                      )}
                    </div>
                    ▼
                  </button>
                  <div className="profile-menu">
                    <div className="px-4 py-2 border-b border-gray-600">
                      <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                      <p className="text-xs text-gray-400">{getDisplayEmail()}</p>
                    </div>
                    <Link
                      to="/profile"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                    >
                      Settings
                    </Link>
                    <div className="px-4 py-2">
                      <ThemeToggle variant="icon" className="ml-2" />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-3 py-1 text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-purple-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-purple-700 transition"
                  >
                    Register
>>>>>>> c2fbe43 (Initial commit)
                  </Link>
                </div>
              )}
            </div>

<<<<<<< HEAD
                        {/* Mobile Menu Button */}
                        <button
=======
            {/* Mobile Menu Button */}
            <button
>>>>>>> c2fbe43 (Initial commit)
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
<<<<<<< HEAD
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

=======
          <div className="lg:hidden bg-slate-800 border-t border-gray-600">
            <div className="px-4 py-6 space-y-2">
>>>>>>> c2fbe43 (Initial commit)
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
                  className={`nav-link block px-4 py-3 rounded-lg text-base font-medium ${
                    isActiveLink(link.path) ? 'active' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
=======
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition ${
                    isActiveLink(link.path) 
                      ? 'text-white bg-slate-700' 
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
>>>>>>> c2fbe43 (Initial commit)
                  {link.label}
                </Link>
              ))}
              
<<<<<<< HEAD
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
=======
              <div className="pt-4 mt-4 border-t border-gray-600">
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                      <div className="profile-avatar w-12 h-12">
                        {userProfile?.avatar ? (
                          <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          getInitial(getDisplayName())
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{getDisplayName()}</p>
                        <p className="text-gray-400 text-sm">{getDisplayEmail()}</p>
>>>>>>> c2fbe43 (Initial commit)
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('profile')}
=======
                      className="block px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition"
                    >
                      My Profile
>>>>>>> c2fbe43 (Initial commit)
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('settings')}
                    </Link>
                    
=======
                      className="block px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition"
                    >
                      Settings
                    </Link>
                    
                    <div className="px-4 py-3">
                      <ThemeToggle variant="icon" className="ml-2" />
                    </div>
                    
>>>>>>> c2fbe43 (Initial commit)
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
<<<<<<< HEAD
                      className="flex items-center w-full px-4 py-3 mt-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('logout')}
=======
                      className="block w-full text-left px-4 py-3 text-red-400 hover:bg-slate-700 rounded-lg transition"
                    >
                      Logout
>>>>>>> c2fbe43 (Initial commit)
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
                      className="block w-full text-center text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-slate-800"
                    >
                      {t('login')}
=======
                      className="block w-full text-center text-gray-300 hover:bg-slate-700 px-4 py-3 rounded-lg font-medium transition"
                    >
                      Login
>>>>>>> c2fbe43 (Initial commit)
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
                      className="block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                    >
                      {t('register')}
=======
                      className="block w-full text-center bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
                    >
                      Register
>>>>>>> c2fbe43 (Initial commit)
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
<<<<<<< HEAD
=======

>>>>>>> c2fbe43 (Initial commit)
      </nav>
    </>
  );
};

export default Navbar;