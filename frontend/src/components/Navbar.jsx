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
          from { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
          }
          50% {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(127, 90, 240, 0.2);
          }
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
          height: 60px;
          display: flex;
          align-items: center;
        }
        
        .light .dark-navbar {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .dark-navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }
        
        .light .dark-navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 100%;
          width: auto;
          min-width: 120px;
        }
        
        .nav-link {
          text-decoration: none;
          font-size: 15px;
          color: #cbd5e1;
          font-weight: 500;
          padding: 6px 12px;
          transition: all 0.2s ease;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          height: 100%;
          border-radius: 6px;
          position: relative;
        }
        
        .light .nav-link {
          color: #64748b;
        }
        
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .light .nav-link:hover {
          color: #1e293b;
          background: rgba(0, 0, 0, 0.05);
        }
        
        .nav-link.active {
          color: #ffffff;
          background: rgba(127, 90, 240, 0.15);
          border-radius: 8px;
        }
        
        .light .nav-link.active {
          color: #7f5af0;
          background: rgba(127, 90, 240, 0.1);
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #7f5af0;
          border-radius: 1px;
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
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          height: 36px;
          margin: 0 8px;
          box-shadow: 0 2px 4px rgba(127, 90, 240, 0.2);
          white-space: nowrap;
          min-width: fit-content;
        }
        
        .contact-btn:hover {
          background-color: #6c47e0;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(127, 90, 240, 0.3);
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
          animation: pulse-glow 2s ease-in-out infinite;
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
          padding: 6px;
          border-radius: 6px;
          transition: all 0.2s ease;
          height: 36px;
        }
        
        .light .profile-btn {
          color: #64748b;
        }
        
        .profile-btn:hover {
          background: #1e293b;
          color: #fff;
        }
        
        .light .profile-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #1e293b;
        }
        
        .profile-menu {
          display: none;
          position: absolute;
          top: 110%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          min-width: 220px;
          padding: 8px 0;
          z-index: 1001;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: dropdown-slide 0.2s ease-out;
        }
        
        .dark .profile-menu {
          background: #1f2937;
          border-color: #374151;
        }
        
        .profile-menu::before {
          content: '';
          position: absolute;
          top: -8px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #1e293b;
          filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.2));
        }
        
        .light .profile-menu::before {
          border-bottom: 8px solid #ffffff;
          filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .profile-menu a {
          color: #374151;
          padding: 12px 20px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
          border-radius: 8px;
          margin: 4px 12px;
          position: relative;
        }
        
        .dark .profile-menu a {
          color: #d1d5db;
        }
        
        .profile-menu a:hover {
          background: #f9fafb;
          color: #111827;
        }
        
        .dark .profile-menu a:hover {
          background: #374151;
          color: #ffffff;
        }
        
        .profile-menu a::before {
          content: '';
          width: 4px;
          height: 4px;
          background: #7f5af0;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .profile-menu a:hover::before {
          opacity: 1;
        }
        
        .profile-menu button {
          color: #374151;
          padding: 12px 20px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 8px;
          margin: 4px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        
        .dark .profile-menu button {
          color: #d1d5db;
        }
        
        .profile-menu button:hover {
          background: #f9fafb;
          color: #111827;
        }
        
        .dark .profile-menu button:hover {
          background: #374151;
          color: #ffffff;
        }
        
        .profile-menu button::before {
          content: '';
          width: 4px;
          height: 4px;
          background: #7f5af0;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .profile-menu button:hover::before {
          opacity: 1;
        }
        
        .profile-menu button.logout-btn {
          color: #dc2626;
          border-top: 1px solid #e5e7eb;
          margin-top: 8px;
          padding-top: 16px;
        }
        
        .dark .profile-menu button.logout-btn {
          color: #f87171;
          border-top-color: #374151;
        }
        
        .profile-menu button.logout-btn:hover {
          background: #fef2f2;
          color: #b91c1c;
        }
        
        .dark .profile-menu button.logout-btn:hover {
          background: rgba(248, 113, 113, 0.1);
          color: #fca5a5;
        }
        
        .profile-avatar {
          width: 32px;
          height: 32px;
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
            height: 56px;
          }
          
          .navbar-logo {
            gap: 4px;
          }
          
          .nav-link {
            padding: 4px 8px;
            font-size: 14px;
          }
          
          .contact-btn {
            padding: 6px 12px;
            height: 32px;
            font-size: 13px;
            margin: 0 6px;
          }
          
          .profile-btn {
            height: 32px;
            padding: 4px;
          }
          
          .profile-avatar {
            width: 24px;
            height: 24px;
            font-size: 11px;
          }
        }
        
        @media (max-width: 768px) {
          .dark-navbar {
            height: 52px;
            padding: 0 16px;
          }
          
          .mobile-menu {
            display: block;
          }
          
          .desktop-nav {
            display: none;
          }
          
          .navbar-logo {
            gap: 2px;
          }
          
          .contact-btn {
            padding: 6px 10px;
            height: 32px;
            font-size: 12px;
            margin: 0 4px;
          }
          
          .profile-btn {
            height: 28px;
            padding: 3px;
          }
          
          .profile-avatar {
            width: 20px;
            height: 20px;
            font-size: 10px;
          }
        }
      `}</style>

      <nav className={`dark-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`} lang={currentLang}>
        <div className="max-w-full mx-auto px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo and Navigation Links */}
            <div className="flex items-center gap-6 h-full">
              {/* Logo */}
              <div className="navbar-logo flex items-center justify-center">
                <Logo className="h-8" />
              </div>

              {/* Navigation Links - Desktop */}
<<<<<<< HEAD
              <div className="hidden lg:flex gap-8 items-center desktop-nav ml-8">
>>>>>>> c2fbe43 (Initial commit)
=======
              <div className="hidden lg:flex gap-2 items-center desktop-nav h-full">
>>>>>>> 4199d3e (feat: changed ui)
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
            <div className="flex items-center gap-4 h-full">
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
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-300 light:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="profile-menu">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="profile-avatar w-12 h-12">
                          {userProfile?.avatar ? (
                            <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            getInitial(getDisplayName())
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{getDisplayName()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{getDisplayEmail()}</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="px-6 py-2">
                      <ThemeToggle variant="icon" className="w-full" />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 px-3 py-1 text-sm font-medium transition"
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
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 ml-4"
            >
              <span className={`block w-6 h-0.5 bg-gray-300 dark:bg-gray-300 light:bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-300 dark:bg-gray-300 light:bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-300 dark:bg-gray-300 light:bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
<<<<<<< HEAD
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
=======
          <div className="lg:hidden bg-slate-800 dark:bg-slate-800 light:bg-white border-t border-gray-600 dark:border-gray-600 light:border-gray-200">
>>>>>>> 4199d3e (feat: changed ui)
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
                      ? 'text-white dark:text-white light:text-purple-600 bg-slate-700 dark:bg-slate-700 light:bg-purple-50' 
                      : 'text-gray-300 dark:text-gray-300 light:text-gray-600 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100'
                  }`}
                >
>>>>>>> c2fbe43 (Initial commit)
                  {link.label}
                </Link>
              ))}
              
<<<<<<< HEAD
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
=======
              <div className="pt-4 mt-4 border-t border-gray-600 dark:border-gray-600 light:border-gray-200">
>>>>>>> 4199d3e (feat: changed ui)
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2 bg-gray-50 dark:bg-gray-700 rounded-lg mx-4">
                      <div className="profile-avatar w-12 h-12">
                        {userProfile?.avatar ? (
                          <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          getInitial(getDisplayName())
                        )}
                      </div>
                      <div>
<<<<<<< HEAD
                        <p className="text-white font-medium">{getDisplayName()}</p>
                        <p className="text-gray-400 text-sm">{getDisplayEmail()}</p>
>>>>>>> c2fbe43 (Initial commit)
=======
                        <p className="text-gray-900 dark:text-white font-medium">{getDisplayName()}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{getDisplayEmail()}</p>
>>>>>>> 4199d3e (feat: changed ui)
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
<<<<<<< HEAD
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('profile')}
=======
                      className="block px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition"
=======
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
>>>>>>> 4199d3e (feat: changed ui)
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
>>>>>>> c2fbe43 (Initial commit)
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
<<<<<<< HEAD
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
=======
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
>>>>>>> 4199d3e (feat: changed ui)
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
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
<<<<<<< HEAD
                      className="flex items-center w-full px-4 py-3 mt-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('logout')}
=======
                      className="block w-full text-left px-4 py-3 text-red-400 hover:bg-slate-700 rounded-lg transition"
=======
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
>>>>>>> 4199d3e (feat: changed ui)
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
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
<<<<<<< HEAD
                      className="block w-full text-center text-gray-300 hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-slate-800"
                    >
                      {t('login')}
=======
                      className="block w-full text-center text-gray-300 hover:bg-slate-700 px-4 py-3 rounded-lg font-medium transition"
=======
                      className="block w-full text-center text-gray-300 dark:text-gray-300 light:text-gray-600 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition"
>>>>>>> 4199d3e (feat: changed ui)
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