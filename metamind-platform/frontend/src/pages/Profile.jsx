import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { User, Mail, MapPin, Edit3, Save, X, Camera, Upload } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const { user, updateUserData } = useAuth();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    bio: "",
    phone: "",
    education: "",
    interests: "",
    profile_pic: ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Load profile data from user context
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.name || user?.username || "",
        email: user?.email || "",
        location: user?.location || "",
        bio: user?.bio || "",
        phone: user?.phone || "",
        education: user?.education || "",
        interests: user?.interests || "",
        profile_pic: user?.profile_picture ? `http://localhost:5000${user.profile_picture}` : user?.profile_pic || ""
      });
    }
  }, [user]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      // Store the file reference (don't convert to Base64)
      setFormData((prev) => ({ ...prev, profile_pic: previewUrl }));
    }
  };

  // Handle text changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Check if a new file is being uploaded
      const hasNewFile = fileInputRef.current?.files?.[0];
      
      let response;
      
      if (hasNewFile) {
        // Use FormData for file upload - filter out undefined values
        const formDataToSend = new FormData();
        if (formData.fullName && formData.fullName !== 'undefined') formDataToSend.append('username', formData.fullName);
        if (formData.email && formData.email !== 'undefined') formDataToSend.append('email', formData.email);
        if (formData.location && formData.location !== 'undefined') formDataToSend.append('location', formData.location);
        if (formData.bio && formData.bio !== 'undefined') formDataToSend.append('bio', formData.bio);
        if (formData.phone && formData.phone !== 'undefined') formDataToSend.append('phone', formData.phone);
        if (formData.education && formData.education !== 'undefined') formDataToSend.append('education', formData.education);
        if (formData.interests && formData.interests !== 'undefined') formDataToSend.append('interests', formData.interests);
        formDataToSend.append('profile_picture', hasNewFile);

        response = await axios.put(
          "http://localhost:5000/api/profile/update",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        // Use JSON for text-only updates - filter out undefined values
        const updateData = {};
        if (formData.fullName && formData.fullName !== 'undefined') updateData.username = formData.fullName;
        if (formData.email && formData.email !== 'undefined') updateData.email = formData.email;
        if (formData.location && formData.location !== 'undefined') updateData.location = formData.location;
        if (formData.bio && formData.bio !== 'undefined') updateData.bio = formData.bio;
        if (formData.phone && formData.phone !== 'undefined') updateData.phone = formData.phone;
        if (formData.education && formData.education !== 'undefined') updateData.education = formData.education;
        if (formData.interests && formData.interests !== 'undefined') updateData.interests = formData.interests;

        response = await axios.put(
          "http://localhost:5000/api/profile/update-json",
          updateData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      const updatedUser = response.data.user;

      // Update user data in AuthContext
      updateUserData(updatedUser);

      // Save backup
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));

      // Notify navbar
      window.dispatchEvent(new CustomEvent("profileUpdated", { detail: updatedUser }));

      setFormData({
        fullName: updatedUser.name || updatedUser.username || "",
        email: updatedUser.email || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
        phone: updatedUser.phone || "",
        education: updatedUser.education || "",
        interests: updatedUser.interests || "",
        profile_pic: updatedUser.profile_picture ? `http://localhost:5000${updatedUser.profile_picture}` : ""
      });
      
      // Clear the file input after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsEditing(false);
      alert("✅ Profile saved successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      
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
    }
  };

  const handleCancel = () => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    }
    setIsEditing(false);
  };

  // Avatar fallback
  const getInitial = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className={`h-full w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8 text-center`}>Personal Information</h1>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl p-8`}>
        {/* Profile Picture */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative mb-4 md:mb-0">
            <div 
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden border-4 ${isDarkMode ? 'border-gray-600 ring-4 ring-white/20' : 'border-gray-300 ring-4 ring-gray-200/50'}`}
              style={{ 
                borderRadius: '50%',
                aspectRatio: '1/1'
              }}
            >
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%' }}
                />
              ) : formData.profile_pic ? (
                <img 
                  src={formData.profile_pic} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <span className="text-4xl font-bold text-white">{getInitial(formData.fullName)}</span>
              )}
            </div>

            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Upload size={20} />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="md:ml-8 text-center md:text-left">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{formData.fullName || user?.name || user?.username}</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>{formData.email || user?.email}</p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{formData.location || "Location not set"}</p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Full Name */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center`}>
              <User size={16} className="mr-2" /> Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors`}
                placeholder="Enter your full name"
              />
            ) : (
              <p className={`p-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg min-h-[3rem] flex items-center`}>{formData.fullName || "Not set"}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center`}>
              <Mail size={16} className="mr-2" /> Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors`}
                placeholder="Enter your email"
              />
            ) : (
              <p className={`p-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg min-h-[3rem] flex items-center`}>{formData.email || "Not set"}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="mb-8">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center`}>
            <MapPin size={16} className="mr-2" /> Location
          </label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors`}
              placeholder="Enter your location"
            />
          ) : (
            <p className={`p-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg min-h-[3rem] flex items-center`}>{formData.location || "Not set"}</p>
          )}
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Bio</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors resize-none`}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className={`p-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg min-h-[5rem] flex items-start`}>{formData.bio || "No bio available"}</p>
          )}
        </div>

        {/* Extra fields (only in edit mode) */}
        {isEditing && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors`}
                placeholder="Enter your phone"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Education</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors`}
              >
                <option value="">Select education level</option>
                <option value="ol">O/L</option>
                <option value="al_science">A/L Science</option>
                <option value="al_arts">A/L Arts</option>
                <option value="diploma">Diploma</option>
                <option value="degree">Degree</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Interests</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows="3"
                className={`w-full p-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors resize-none`}
                placeholder="What are your interests?"
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className={`flex justify-center gap-4 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel} 
                className={`px-8 py-3 ${isDarkMode ? 'text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white' : 'text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900'} border rounded-lg flex items-center transition-colors`}
              >
                <X size={20} className="mr-2" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg flex items-center hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Save size={20} className="mr-2" /> Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 bg-orange-600 text-white rounded-lg flex items-center hover:bg-orange-700 transition-colors shadow-lg"
            >
              <Edit3 size={20} className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;