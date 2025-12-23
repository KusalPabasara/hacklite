import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  MessageSquare,
  Star,
  Trophy,
  LogOut,
  Briefcase,
  Map,
  Users,
  Award,
  Menu,
  X
} from 'lucide-react';
import Logo from '../Logo';
import LanguageDropdown from '../LanguageDropdown';
import ThemeToggle from '../ThemeToggle';
import ProfileAvatar from '../ProfileAvatar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/my-career-path', icon: Compass, label: 'My Recommendations' },
    { path: '/quizzes', icon: BookOpen, label: 'Quizzes' },
    { path: '/explore-careers', icon: Briefcase, label: 'Careers' },
    { path: '/roadmap', icon: Map, label: 'Roadmap' },
    { path: '/chat', icon: MessageSquare, label: 'Assistant' },
    { path: '/mentors', icon: Users, label: 'Mentors' },
    { path: '/stories', icon: Star, label: 'Success Stories' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  return (
    <>
      <style jsx>{`
        /* Full Viewport Dashboard Layout with Responsive Fixes */
        .dashboard-layout {
          position: relative;
          z-index: 1;
          height: 100vh;
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          overflow-y: hidden;
          display: flex;
        }

        .dashboard-sidebar {
          position: fixed;
          z-index: 500;
          height: 100vh;
          overflow-y: auto;
          transition: transform 0.3s ease;
          width: 256px;
        }

        .dashboard-main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 100vw;
          overflow-x: hidden;
          margin-left: 0;
          transition: margin-left 0.3s ease;
          width: 100%;
        }

        .dashboard-main-wrapper.sidebar-open {
          margin-left: min(256px, 20vw); /* Responsive sidebar margin */
        }
        
        .dashboard-topbar {
          position: relative;
          z-index: 600;
          flex-shrink: 0;
          height: 72px;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          transition: all 0.3s ease;
        }

        .dashboard-main-content {
          position: relative;
          z-index: 100;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          height: calc(100vh - 72px);
          width: 100%;
          max-width: 100%;
          padding: 0;
        }
        
        .mobile-menu-overlay {
          position: fixed;
          z-index: 400;
        }
        
        .mobile-menu-button {
          position: fixed;
          z-index: 700;
        }
        
        /* Language dropdown priority */
        .dashboard-topbar .language-dropdown-container {
          position: relative;
          z-index: 9999;
        }
        
        .dashboard-topbar .language-dropdown-menu {
          position: absolute !important;
          z-index: 9999 !important;
        }
        
        /* Profile avatar dropdown */
        .dashboard-topbar .profile-avatar {
          position: relative;
          z-index: 1000;
        }
        
        /* Theme toggle */
        .dashboard-topbar .theme-toggle {
          position: relative;
          z-index: 1000;
          display: flex !important;
        }
        
        /* Topbar controls container */
        .dashboard-topbar .flex-shrink-0 {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: fit-content;
        }
        
        /* Navigation styling */
        .nav-item {
          transition: all 0.2s ease;
          border-radius: 8px;
          margin-bottom: 4px;
        }
        
        .nav-item:hover {
          transform: translateX(4px);
        }
        
        .nav-item.active {
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-hover) 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }
        
        /* Enhanced Responsive adjustments */
        @media (max-width: 1024px) {
          .dashboard-main-wrapper.sidebar-open {
            margin-left: 0; /* Remove sidebar margin on tablets */
          }
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            overflow-x: hidden;
          }

          .dashboard-sidebar {
            z-index: 800;
            width: min(280px, 80vw); /* Responsive sidebar width */
          }

          .dashboard-main-wrapper {
            margin-left: 0 !important;
            width: 100%;
            max-width: 100vw;
          }

          .dashboard-topbar {
            padding: 0 1rem;
            width: 100%;
          }

          .mobile-menu-overlay {
            z-index: 750;
          }

          .mobile-menu-button {
            z-index: 900;
          }

          .dashboard-topbar .language-dropdown-menu {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 9999 !important;
          }
          
          /* Improve topbar controls spacing on mobile */
          .dashboard-topbar .flex-shrink-0 {
            gap: 8px !important;
          }
          
          /* Ensure theme toggle is visible on mobile */
          .dashboard-topbar .theme-toggle {
            display: flex !important;
            transform: scale(0.9);
          }
          
          /* Adjust profile avatar size on mobile */
          .dashboard-topbar .profile-avatar button {
            transform: scale(0.9);
          }
        }

        @media (max-width: 480px) {
          .dashboard-sidebar {
            width: 90vw; /* Full width on small screens */
          }

          .dashboard-topbar {
            padding: 0 0.5rem;
          }
        }
        
        /* Scrollbar styling */
        .dashboard-main-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .dashboard-main-content::-webkit-scrollbar-track {
          background: var(--bg-secondary);
          border-radius: 4px;
        }
        
        .dashboard-main-content::-webkit-scrollbar-thumb {
          background: var(--border-secondary);
          border-radius: 4px;
        }
        
        .dashboard-main-content::-webkit-scrollbar-thumb:hover {
          background: var(--border-tertiary);
        }
        
        /* Sidebar scrollbar */
        .dashboard-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .dashboard-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .dashboard-sidebar::-webkit-scrollbar-thumb {
          background: var(--border-primary);
          border-radius: 3px;
        }
      `}</style>

      <div 
        className="dashboard-layout font-sans"
        style={{ 
          backgroundColor: 'var(--bg-primary)', 
          color: 'var(--text-primary)' 
        }}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mobile-menu-button md:hidden fixed top-4 left-4 p-3 rounded-xl transition-all duration-200 shadow-lg z-50"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-primary)',
            color: 'var(--text-primary)',
            border: '1px solid'
          }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar Navigation */}
        <aside 
          className={`dashboard-sidebar w-64 p-6 flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
          style={{
            backgroundColor: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border-primary)'
          }}
        >
          <div className="mb-8 pt-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
          
          <nav className="flex flex-col gap-1 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`nav-item flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive ? 'active' : ''}`}
                  style={{
                    backgroundColor: isActive ? 'var(--accent-blue)' : 'transparent',
                    color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} className={`transition-all duration-200 ${isActive ? 'drop-shadow-sm' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="mobile-menu-overlay md:hidden fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Wrapper */}
        <div className={`dashboard-main-wrapper ${sidebarOpen ? 'sidebar-open' : ''} md:sidebar-open`}>
          {/* Topbar */}
          <header
            className="dashboard-topbar backdrop-blur-sm border-b px-2 sm:px-4 lg:px-6 flex justify-between items-center transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-header)',
              borderColor: 'var(--border-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div className="flex items-center min-w-0 flex-1">
              <h2
                className="text-lg sm:text-xl lg:text-2xl font-semibold transition-colors duration-300 truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {getCurrentPageTitle()}
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
              <div className="theme-toggle">
                <ThemeToggle size="sm" />
              </div>
              <div className="language-dropdown-container">
                <LanguageDropdown className="mx-1" />
              </div>
              <div className="profile-avatar">
                <ProfileAvatar size="default" />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main 
            className="dashboard-main-content transition-colors duration-300"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;