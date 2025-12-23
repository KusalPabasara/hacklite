import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const profileImage = getProfileImage();

  return (
    <div className="user-info flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center ring-2 ring-white/20"
        style={{ 
          borderRadius: '50%',
          aspectRatio: '1/1'
        }}
      >
        {profileImage ? (
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span 
          className={`text-white font-bold text-sm ${profileImage ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
        >
          {getInitials(user?.firstName || user?.username || user?.name)}
        </span>
      </div>
      <span className="username text-white font-medium">{user.username || user.name}</span>
    </div>
  );
};

export default UserProfile;
