import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileAvatar = ({ className = '', size = 'default' }) => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [currentTheme, setCurrentTheme] = useState('light');
  const buttonRef = useRef(null);

  // Size configurations
  const sizeConfig = {
    small: { width: '32px', height: '32px', fontSize: '12px' },
    default: { width: '40px', height: '40px', fontSize: '14px' },
    large: { width: '56px', height: '56px', fontSize: '18px' }
  };

  const avatarSize = sizeConfig[size] || sizeConfig.default;

  // Theme detection
  useEffect(() => {
    const detectTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const htmlClass = document.documentElement.classList.contains('dark');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      const theme = savedTheme || (htmlClass ? 'dark' : systemTheme);
      setCurrentTheme(theme);
    };

    detectTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme);
    
    const handleThemeChange = () => detectTheme();
    window.addEventListener('themeChanged', handleThemeChange);
    
    const observer = new MutationObserver(() => detectTheme());
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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getProfileImage = () => {
    if (user?.profileImage || user?.profile_picture) {
      const imageUrl = user.profileImage || user.profile_picture;
      
      if (imageUrl.startsWith('data:image/')) {
        return imageUrl;
      } else if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      } else if (imageUrl.startsWith('/uploads/')) {
        return `http://localhost:5000${imageUrl}`;
      } else if (imageUrl.includes('/uploads/')) {
        return `http://localhost:5000/${imageUrl}`;
      } else {
        return `http://localhost:5000/uploads/profile-pictures/${imageUrl}`;
      }
    }
    return null;
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  };

  const handleButtonClick = () => {
    updateDropdownPosition();
    setProfileOpen(!profileOpen);
  };

  useEffect(() => {
    if (profileOpen) {
      updateDropdownPosition();
    }
  }, [profileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (profileOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [profileOpen]);

  useEffect(() => {
    const handleProfileUpdate = (event) => {
      console.log('Profile updated, refreshing avatar');
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  const getDisplayName = () => {
    return user?.firstName || user?.name || user?.username || 'User';
  };

  const getDisplayEmail = () => {
    return user?.email || 'user@example.com';
  };

  return (
    <>
      <style jsx>{`
        .profile-avatar-container {
          position: relative;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-avatar-button {
          border-radius: 50%;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        
        .profile-avatar-button:hover {
          transform: scale(1.05);
          border-color: ${currentTheme === 'dark' ? '#ec4899' : '#3b82f6'};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .profile-avatar-button:focus {
          outline: none;
          border-color: ${currentTheme === 'dark' ? '#ec4899' : '#3b82f6'};
          box-shadow: 0 0 0 3px ${currentTheme === 'dark' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
        }
        
        .profile-initials {
          background: ${currentTheme === 'dark' 
            ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)' 
            : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
          };
          color: ${currentTheme === 'dark' ? '#f9fafb' : '#374151'};
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .profile-dropdown {
          background: ${currentTheme === 'dark' ? '#1f2937' : '#ffffff'};
          border: 1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'};
          border-radius: 12px;
          box-shadow: ${currentTheme === 'dark' 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          };
          z-index: 99999;
          overflow: hidden;
          backdrop-filter: blur(10px);
          animation: dropdownSlideIn 0.2s ease-out;
        }
        
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .profile-header {
          background: ${currentTheme === 'dark' 
            ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
          };
          border-bottom: 1px solid ${currentTheme === 'dark' ? '#374151' : '#e2e8f0'};
          padding: 16px;
        }
        
        .profile-name {
          color: ${currentTheme === 'dark' ? '#f9fafb' : '#1e293b'};
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .profile-email {
          color: ${currentTheme === 'dark' ? '#9ca3af' : '#64748b'};
          font-size: 14px;
        }
        
        .profile-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          color: ${currentTheme === 'dark' ? '#d1d5db' : '#374151'};
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
        }
        
        .profile-menu-item:hover {
          background: ${currentTheme === 'dark' ? '#374151' : '#f8fafc'};
          color: ${currentTheme === 'dark' ? '#f9fafb' : '#1e293b'};
        }
        
        .profile-menu-item:focus {
          outline: none;
          background: ${currentTheme === 'dark' ? '#374151' : '#f8fafc'};
        }
        
        .profile-menu-item.logout:hover {
          background: ${currentTheme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'};
          color: ${currentTheme === 'dark' ? '#f87171' : '#dc2626'};
        }
        
        .profile-menu-divider {
          height: 1px;
          background: ${currentTheme === 'dark' ? '#374151' : '#e2e8f0'};
          margin: 8px 0;
        }
      `}</style>

      <div className={`profile-avatar-container ${className}`}>
        <button 
          ref={buttonRef}
          onClick={handleButtonClick}
          className="profile-avatar-button"
          style={{
            width: avatarSize.width,
            height: avatarSize.height,
            fontSize: avatarSize.fontSize,
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            margin: '0'
          }}
          title={`${getDisplayName()}'s profile`}
          aria-expanded={profileOpen}
          aria-haspopup="true"
        >
          {getProfileImage() ? (
            <img 
              src={getProfileImage()} 
              alt="Profile" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                display: 'block'
              }}
              onLoad={() => {
                console.log('✅ Profile image loaded successfully');
              }}
              onError={(e) => {
                console.log('❌ Profile image failed to load:', e.target.src);
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
          ) : null}
          
          <div 
            className="profile-initials" 
            style={{ 
              display: getProfileImage() ? 'none' : 'flex',
              fontSize: avatarSize.fontSize
            }}
          >
            {getInitials(getDisplayName())}
          </div>
        </button>

        {/* Profile Dropdown - Rendered as Portal */}
        {profileOpen && createPortal(
          <div 
            className="profile-dropdown fixed"
            style={{
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              width: '280px',
              minWidth: '280px'
            }}
          >
            {/* User Info Header */}
            <div className="profile-header">
              <div className="flex items-center gap-3">
                <div 
                  className="profile-avatar-button"
                  style={{
                    width: '48px',
                    height: '48px',
                    fontSize: '14px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    margin: '0'
                  }}
                >
                  {getProfileImage() ? (
                    <img 
                      src={getProfileImage()} 
                      alt="Profile" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div className="profile-initials" style={{ fontSize: '14px' }}>
                      {getInitials(getDisplayName())}
                    </div>
                  )}
                </div>
                <div>
                  <div className="profile-name">
                    {getDisplayName()}
                  </div>
                  <div className="profile-email">
                    {getDisplayEmail()}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link 
                to="/profile" 
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <User size={18} />
                View Profile
              </Link>
              
              <Link 
                to="/settings" 
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={18} />
                Settings
              </Link>
              
              <div className="profile-menu-divider" />
              
              <button 
                onClick={handleLogout}
                className="profile-menu-item logout"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>,
          document.body
        )}

        {/* Click outside to close - Rendered as Portal */}
        {profileOpen && createPortal(
          <div 
            className="fixed inset-0" 
            style={{ zIndex: 99998 }}
            onClick={() => setProfileOpen(false)}
          />,
          document.body
        )}
      </div>
    </>
  );
};

export default ProfileAvatar;