import { useState, useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { t } = useTranslation();
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-16">
        <style>{`
          /* Professional Profile Styling */
          
          .profile-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
          }
        `}</style>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
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
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
              <h1 className="text-heading-1 text-white mb-2">{formData.fullName || user?.name}</h1>
              <p className="text-body text-purple-200">{formData.email || user?.email}</p>
              {formData.location && (
                <p className="text-body-small text-purple-300 mt-1">📍 {formData.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
          <div className="professional-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-heading-2 text-gray-900">Personal Information</h2>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
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
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="professional-button px-4 py-2 gradient-primary text-white hover:opacity-90"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

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
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="professional-input w-full px-4 py-3 disabled:bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
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
                />
              </div>
            </div>

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