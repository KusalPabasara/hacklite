import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfileUpdate = ({ onClose, onUpdate }) => {
  const { user, updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || user?.name || '',
    email: user?.email || '',
    location: user?.location || ''
  });
  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState(user?.profile_picture || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('username', formData.username);
      submitData.append('email', formData.email);
      submitData.append('location', formData.location);
      
      if (profileFile) {
        submitData.append('profile_picture', profileFile);
      }

      const response = await axios.put('/api/profile/update', submitData, {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update user data in AuthContext
      updateUserData(response.data.user);
      
      if (onUpdate) {
        onUpdate(response.data.user);
      }
      
      if (onClose) {
        onClose();
      }
      
    } catch (error) {
      console.error('Profile update failed:', error);
      
      // Handle specific error cases
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes('Email is already in use')) {
          alert('❌ This email is already registered to another account. Please use a different email address.');
        } else if (errorMessage.includes('Email already in use')) {
          alert('❌ This email is already registered to another account. Please use a different email address.');
        } else {
          alert(`❌ Profile update failed: ${errorMessage}`);
        }
      } else if (error.response?.status === 400) {
        alert('❌ Invalid data provided. Please check your information and try again.');
      } else if (error.response?.status === 401) {
        alert('❌ Session expired. Please log in again.');
      } else if (error.response?.status === 500) {
        alert('❌ Server error. Please try again later.');
      } else {
        alert('❌ Failed to update profile. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfileFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="profile-update-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-picture-section">
            <div className="current-photo">
              <img 
                src={preview || '/images/default-avatar.png'} 
                alt="Profile Preview"
                className="profile-preview"
              />
            </div>
            
            <div className="photo-controls">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                id="profile-picture"
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-picture" className="file-input-label">
                Choose Photo
              </label>
              {preview && (
                <button 
                  type="button" 
                  onClick={handleRemovePhoto}
                  className="remove-photo-btn"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Colombo, Sri Lanka"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
