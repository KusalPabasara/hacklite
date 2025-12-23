import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import LanguageDropdown from "../components/LanguageDropdown";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  
  // Function to get initials from full name
  const getInitial = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length > 1) {
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

  // Enhanced theme detection with improved reliability
  useEffect(() => {
    const detectTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const htmlClass = document.documentElement.classList.contains('dark');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      const theme = savedTheme || (htmlClass ? 'dark' : systemTheme);
      setCurrentTheme(theme);
      
      // Apply theme to document
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    detectTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme);
    
    // Listen for manual theme changes
    const handleThemeChange = () => detectTheme();
    window.addEventListener('themeChanged', handleThemeChange);
    
    // Observer for class changes on document element
    const observer = new MutationObserver(() => {
      detectTheme();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      mediaQuery.removeEventListener('change', detectTheme);
      window.removeEventListener('themeChanged', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      setUserProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/quizzes", label: "Quizzes", icon: "🧠" },
    { path: "/explore-careers", label: "Careers", icon: "🔍" },
    { path: "/roadmap", label: "Roadmap", icon: "🗺️" },
    { path: "/chat", label: "Assistant", icon: "🤖" },
    { path: "/mentors", label: "Mentors", icon: "👥" },
    { path: "/inspiration", label: "Stories", icon: "✨" },
    { path: "/leaderboard", label: "Leaderboard", icon: "🏆" }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const getDisplayName = () => {
    return userProfile?.fullName || user?.name || 'User';
  };

  const getDisplayEmail = () => {
    return userProfile?.email || user?.email || '';
  };

  return (
    <>
      <style>{`
        /* Enhanced Navbar Styling with Proper Z-Index Management */
        
        @keyframes dropdown-slide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Navbar Base Styles with Fixed Z-Index */
        .clean-navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          height: 72px;
          transition: all 0.3s ease;
          position: fixed !important;
          z-index: 1000 !important;
        }
        
        .clean-navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        /* Dark theme navbar */
        .dark .clean-navbar {
          background: rgba(17, 24, 39, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .dark .clean-navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        /* Navigation Links */
        .nav-link {
          text-decoration: none;
          font-size: 15px;
          color: #374151;
          font-weight: 500;
          padding: 0;
          transition: color 0.2s ease;
          border: none;
          background: none;
        }
        
        .dark .nav-link {
          color: #d1d5db;
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: #f97316;
        }
        
        .dark .nav-link:hover,
        .dark .nav-link.active {
          color: #ec4899;
        }
        
        /* Contact Button */
        .contact-btn {
          background-color: #f97316;
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
          background-color: #ea580c;
        }
        
        .dark .contact-btn {
          background-color: #ec4899;
        }
        
        .dark .contact-btn:hover {
          background-color: #be185d;
        }
        
        /* Navbar Controls - Language Dropdown Priority */
        .navbar-controls {
          position: relative;
          z-index: 1001;
        }
        
        .navbar-controls .language-dropdown-container {
          position: relative;
          z-index: 9999 !important;
        }
        
        .navbar-controls .language-dropdown-menu {
          position: absolute !important;
          z-index: 9999 !important;
        }
        
        /* Profile Dropdown - Lower Priority than Language */
        .profile-dropdown {
          position: relative;
          z-index: 2000;
        }
        
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .dark .profile-btn {
          color: #d1d5db;
        }
        
        .profile-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }
        
        .dark .profile-btn:hover {
          background: #374151;
          color: #f9fafb;
        }
        
        .profile-menu {
          display: none;
          position: absolute;
          top: 110%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          min-width: 160px;
          padding: 8px 0;
          z-index: 2001;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: dropdown-slide 0.2s ease-out;
        }
        
        .profile-dropdown:hover .profile-menu,
        .profile-dropdown.open .profile-menu {
          display: block;
        }
        
        .dark .profile-menu {
          background: #1f2937;
          border: 1px solid #374151;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .profile-menu a,
        .profile-menu button {
          color: #374151;
          padding: 8px 16px;
          text-decoration: none;
          font-size: 14px;
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dark .profile-menu a,
        .dark .profile-menu button {
          color: #d1d5db;
        }
        
        .profile-menu a:hover,
        .profile-menu button:hover {
          background: #f3f4f6;
          color: #111827;
        }
        
        .dark .profile-menu a:hover,
        .dark .profile-menu button:hover {
          background: #374151;
          color: #f9fafb;
        }
        
        /* Profile Avatar */
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
          border: 2px solid #f97316;
        }
        
        .dark .profile-avatar {
          background: #374151;
          color: #d1d5db;
          border: 2px solid #ec4899;
        }
        
        /* Mobile Menu */
        .mobile-menu-bg {
          background: white;
          border-top: 1px solid #e5e7eb;
          z-index: 999;
        }
        
        .dark .mobile-menu-bg {
          background: #1f2937;
          border-top: 1px solid #374151;
        }
        
        /* Mobile Menu Language Dropdown */
        .mobile-menu-bg .language-dropdown-container {
          z-index: 9999 !important;
        }
        
        .mobile-menu-bg .language-dropdown-menu {
          z-index: 9999 !important;
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .clean-navbar {
            flex-wrap: wrap;
            height: auto;
            padding: 16px;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
        }
        
        /* Force language dropdown to be on top of everything */
        .language-dropdown-container,
        .language-dropdown-container * {
          position: relative;
        }
        
        .language-dropdown-menu {
          z-index: 9999 !important;
          position: absolute !important;
        }
      `}</style>

      <nav className={`clean-navbar fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled ? 'scrolled' : ''} ${currentTheme}`}>
        <div className="max-w-full mx-auto px-8">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo and Navigation Links */}
            <div className="flex items-center gap-4">
              {/* Logo with theme awareness */}
              <Logo className="h-8" theme={currentTheme} />

              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex gap-8 items-center desktop-nav ml-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActiveLink(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Contact, Language, and Profile */}
            <div className="flex items-center gap-5 navbar-controls">
              {/* Contact Button */}
              <Link 
                to="/contact" 
                className="contact-btn"
              >
                Contact Us
              </Link>

              {/* Language Dropdown - Highest Priority */}
              <div className="language-dropdown-container">
                <LanguageDropdown />
              </div>

              {/* Profile Dropdown */}
              {user ? (
                <div 
                  className={`profile-dropdown ${isUserDropdownOpen ? 'open' : ''}`} 
                  ref={dropdownRef}
                >
                  <button 
                    className="profile-btn"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
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
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{getDisplayEmail()}</p>
                    </div>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/settings">Settings</Link>
                    <div className="px-4 py-2">
                      <ThemeToggle variant="icon" className="ml-2" />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1 text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 dark:bg-pink-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-blue-700 dark:hover:bg-pink-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            >
              <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mobile-menu-bg">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition ${
                    isActiveLink(link.path) 
                      ? 'text-orange-500 dark:text-pink-500 bg-orange-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                
                {/* Mobile Language Dropdown */}
                <div className="px-4 py-3">
                  <LanguageDropdown />
                </div>
                
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
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{getDisplayName()}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{getDisplayEmail()}</p>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                      My Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                      Settings
                    </Link>
                    
                    <div className="px-4 py-3">
                      <ThemeToggle variant="icon" className="ml-2" />
                    </div>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-orange-500 dark:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 dark:hover:bg-pink-700 transition"
                    >
                      Register
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