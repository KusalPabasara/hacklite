import { useState, useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { t } = useTranslation();
<<<<<<< HEAD
  const { user, userProfile, updateUserProfile, getAvatarData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || user?.name || '',
    email: userProfile?.email || user?.email || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    avatar: userProfile?.avatar || ''
  });

  // Update form data when userProfile changes
  useEffect(() => {
    setFormData({
      fullName: userProfile?.fullName || user?.name || '',
      email: userProfile?.email || user?.email || '',
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      avatar: userProfile?.avatar || ''
    });
  }, [userProfile, user]);
=======
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    bio: '',
    avatar: ''
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setFormData(parsedProfile);
    } else {
      // Initialize with user data if available
      setFormData({
        fullName: user?.name || '',
        email: user?.email || '',
        location: '',
        bio: '',
        avatar: ''
      });
    }
  }, [user]);
>>>>>>> c2fbe43 (Initial commit)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
<<<<<<< HEAD
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveMessage('Image size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveMessage('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        setSaveMessage('');
=======
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
>>>>>>> c2fbe43 (Initial commit)
      };
      reader.readAsDataURL(file);
    }
  };

<<<<<<< HEAD
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        setSaveMessage('Full name is required');
        setIsSaving(false);
        return;
      }

      if (!formData.email.trim()) {
        setSaveMessage('Email is required');
        setIsSaving(false);
        return;
      }

      // Update profile in context and localStorage
      updateUserProfile(formData);
      
      setSaveMessage('Profile saved successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('Error saving profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to saved values
    setFormData({
      fullName: userProfile?.fullName || user?.name || '',
      email: userProfile?.email || user?.email || '',
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      avatar: userProfile?.avatar || ''
    });
    setIsEditing(false);
    setSaveMessage('');
  };

  // Get avatar data for display
  const avatarData = getAvatarData();
=======
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    
    // Trigger a custom event to notify navbar about profile update
    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: formData }));
    
    setIsEditing(false);
    // Show success message
    alert('Profile saved successfully!');
  };

  const handleCancel = () => {
    // Reload from localStorage to discard changes
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    }
    setIsEditing(false);
  };

  // Get first letter of full name for avatar fallback
  const getInitial = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length > 1) {
      // Return first letter of first name and last name
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };
>>>>>>> c2fbe43 (Initial commit)

  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <div className="min-h-screen bg-slate-50 pt-16">
=======
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-16 transition-all duration-300">
>>>>>>> c2fbe43 (Initial commit)
        <style>{`
          /* Professional Profile Styling */
          
          .profile-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
<<<<<<< HEAD
=======
            transition: all 0.3s ease;
          }

          .dark .profile-card {
            background: rgba(30, 41, 59, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Ensure input text is visible */
          input, textarea {
            color: #111 !important;
            background-color: #fff !important;
            caret-color: #3b82f6;
            transition: all 0.3s ease;
          }

          input:disabled, textarea:disabled {
            color: #444 !important;
            background-color: #f3f4f6 !important;
          }

          /* Dark mode input styling */
          .dark input, .dark textarea {
            color: #e2e8f0 !important;
            background-color: #374151 !important;
            border-color: #4b5563 !important;
          }

          .dark input:disabled, .dark textarea:disabled {
            color: #9ca3af !important;
            background-color: #1f2937 !important;
          }

          /* Avatar styling */
          .avatar-wrapper {
            position: relative;
            width: 128px;
            height: 128px;
            margin: 0 auto;
          }

          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .avatar-initial {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 48px;
            font-weight: bold;
            border: 4px solid white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .avatar-upload-btn {
            position: absolute;
            bottom: 8px;
            right: 8px;
            background: white;
            border-radius: 50%;
            padding: 8px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }

          .avatar-upload-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
>>>>>>> c2fbe43 (Initial commit)
          }
        `}</style>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
<<<<<<< HEAD
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {avatarData.type === 'image' ? (
                    <img src={avatarData.data} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                      {avatarData.data}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
=======
              <div className="avatar-wrapper mb-6">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="avatar-initial">
                    {getInitial(formData.fullName)}
                  </div>
                )}
                <label htmlFor="avatarUpload" className="avatar-upload-btn">
>>>>>>> c2fbe43 (Initial commit)
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
<<<<<<< HEAD
              </div>
              <h1 className="text-heading-1 text-white mb-2">{formData.fullName || user?.name}</h1>
              <p className="text-body text-purple-200">{formData.email || user?.email}</p>
              {formData.location && (
                <p className="text-body-small text-purple-300 mt-1">📍 {formData.location}</p>
              )}
=======
                <input
                  id="avatarUpload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {formData.fullName || user?.name || 'Your Profile'}
              </h1>
              <p className="text-purple-200">{formData.email || user?.email}</p>
>>>>>>> c2fbe43 (Initial commit)
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Profile Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          <div className="professional-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-heading-2 text-gray-900">Personal Information</h2>
=======
        {/* Profile Form Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          <div className="profile-card rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{t('profile.personalInfo')}</h2>
>>>>>>> c2fbe43 (Initial commit)
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
<<<<<<< HEAD
                      className="professional-button px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="professional-button px-4 py-2 gradient-primary text-white hover:opacity-90 disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
=======
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                    >
                      {t('profile.cancel')}
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      {t('profile.save')}
>>>>>>> c2fbe43 (Initial commit)
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
<<<<<<< HEAD
                    className="professional-button px-4 py-2 gradient-primary text-white hover:opacity-90"
                  >
                    Edit Profile
=======
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    {t('profile.edit')}
>>>>>>> c2fbe43 (Initial commit)
                  </button>
                )}
              </div>
            </div>

<<<<<<< HEAD
            {/* Save Message */}
            {saveMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                saveMessage.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {saveMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
=======
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.name')}</label>
>>>>>>> c2fbe43 (Initial commit)
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
<<<<<<< HEAD
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
=======
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
>>>>>>> c2fbe43 (Initial commit)
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
=======
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.email')}</label>
>>>>>>> c2fbe43 (Initial commit)
                <input
                  type="email"
                  name="email"
                  value={formData.email}
<<<<<<< HEAD
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
=======
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
>>>>>>> c2fbe43 (Initial commit)
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
=======
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.location')}</label>
>>>>>>> c2fbe43 (Initial commit)
                <input
                  type="text"
                  name="location"
                  value={formData.location}
<<<<<<< HEAD
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                        {avatarData.data}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="professional-button px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                      📷 Upload Photo
                    </label>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
                  placeholder="Tell us about yourself, your interests, and career goals..."
=======
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={t('profile.locationPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.bio')}</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder={t('profile.bioPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
>>>>>>> c2fbe43 (Initial commit)
                />
              </div>
            </div>

<<<<<<< HEAD
            {/* Profile Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-heading-3 text-gray-900 mb-4">Profile Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Quizzes Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Career Goals Set</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Mentors Connected</div>
=======
            {/* Profile Stats Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Quizzes Completed</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Career Goals Set</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Mentor Connections</div>
>>>>>>> c2fbe43 (Initial commit)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;