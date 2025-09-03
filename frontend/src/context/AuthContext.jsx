import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          console.warn('⚠️ Token expired, removing from localStorage');
          localStorage.removeItem("token");
          return null;
        }
        return decoded;
      } catch (error) {
        console.error('❌ Invalid token, removing from localStorage:', error);
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCheckedQuestionnaire, setHasCheckedQuestionnaire] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  });

  const checkQuestionnaireCompletion = useCallback(async () => {
    if (!user || hasCheckedQuestionnaire) return;
    
    try {
      setLoading(true);
      console.log('🔍 Checking questionnaire completion for user:', user.email);
      const response = await api.get('/questionnaire/completion');
      console.log('✅ Questionnaire completion response:', response.data);
      setQuestionnaireCompleted(response.data.completed);
      setHasCheckedQuestionnaire(true);
    } catch (error) {
      console.error('❌ Error checking questionnaire completion:', error);
      if (error.response?.status === 401) {
        console.log('🚫 401 error - user needs to re-authenticate');
        // Don't set questionnaireCompleted to false on 401, let the user re-login
        setHasCheckedQuestionnaire(false);
      } else {
        setQuestionnaireCompleted(false);
        setHasCheckedQuestionnaire(true);
      }
    } finally {
      setLoading(false);
    }
  }, [user, hasCheckedQuestionnaire]);

  useEffect(() => {
    if (user && !hasCheckedQuestionnaire) {
      checkQuestionnaireCompletion();
    }
  }, [user, hasCheckedQuestionnaire]);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const logout = () => {
    setUser(null);
    setQuestionnaireCompleted(null);
    setHasCheckedQuestionnaire(false);
    localStorage.removeItem("token");
  };

  const markQuestionnaireCompleted = () => {
    setQuestionnaireCompleted(true);
  };

  const updateUserProfile = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  };

  const getAvatarData = () => {
    if (userProfile?.avatar) {
      return { type: 'image', data: userProfile.avatar };
    }
    
    const name = userProfile?.fullName || user?.name;
    if (name) {
      const names = name.trim().split(' ');
      if (names.length > 1) {
        return { type: 'initial', data: `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase() };
      }
      return { type: 'initial', data: name.charAt(0).toUpperCase() };
    }
    
    return { type: 'initial', data: 'U' };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      questionnaireCompleted, 
      loading,
      markQuestionnaireCompleted,
      checkQuestionnaireCompletion,
      userProfile,
      updateUserProfile,
      getAvatarData
    }}>
      {children}
    </AuthContext.Provider>
  );
};