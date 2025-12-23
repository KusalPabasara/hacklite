import React, { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import { supabase, getCurrentUser, getCurrentSession } from '../lib/supabase';
import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

// Session timeout in milliseconds (15 minutes)
const SESSION_TIMEOUT = 15 * 60 * 1000;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Load user data from Supabase session
  const loadUserFromSession = async (session) => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    try {
      const supabaseUser = session.user;
      console.log('🔐 Loading user from Supabase session:', supabaseUser.email);

      // Get user profile from database
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      // Get questionnaire status
      let questionnaireCompleted = false;
      try {
        const questionnaireRes = await axios.get(`${API_BASE_URL}/questionnaire/status`, {
          headers: { 
            Authorization: `Bearer ${session.access_token}` 
          }
        });
        questionnaireCompleted = questionnaireRes.data?.questionnaireCompleted || false;
      } catch (error) {
        console.log('Questionnaire status not available:', error.message);
      }

      // Combine all user data
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email,
        role: supabaseUser.user_metadata?.role || 'user',
        questionnaireCompleted: profileData?.questionnaire_completed || questionnaireCompleted,
        // Profile data
        full_name: profileData?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email,
        name: profileData?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email,
        username: profileData?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email,
        language: profileData?.language || 'en',
        location: profileData?.location,
        bio: profileData?.bio,
        phone: profileData?.phone,
        education: profileData?.education,
        interests: profileData?.interests,
        profile_picture: profileData?.profile_picture,
        profileImage: profileData?.profile_picture,
        created_at: profileData?.created_at,
        updated_at: profileData?.updated_at,
      });
      
      console.log('✅ User loaded successfully');
    } catch (error) {
      console.error('❌ Error loading user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        // Check for email confirmation token in URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        
        if (accessToken && type === 'email') {
          console.log('📧 Email confirmation token detected in URL');
          // Supabase will automatically handle this via onAuthStateChange
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          await loadUserFromSession(session);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes (including email confirmation)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await loadUserFromSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED') {
        await loadUserFromSession(session);
      } else if (event === 'USER_CONFIRMED') {
        // Email confirmation successful
        console.log('✅ Email confirmed successfully');
        if (session) {
          await loadUserFromSession(session);
        }
        // Redirect to login page with success message
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?confirmed=true';
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        await loadUserFromSession(data.session);
        return { success: true, session: data.session };
      }

      return { success: false, error: 'No session returned' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, fullName) => {
    try {
      // Get the current origin for email confirmation redirect
      const redirectUrl = `${window.location.origin}/login?confirmed=true`;
      
      // Register with Supabase - email confirmation enabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          // Set redirect URL for email confirmation
          emailRedirectTo: redirectUrl,
        },
      });

      // Handle errors from Supabase
      if (error) {
        console.error('Supabase signup error:', error);
        
        // Check if it's a 500 error or email sending error - user might still be created
        if (error.status === 500 || error.message?.includes('500') || error.message?.includes('server') || error.message?.includes('Error sending')) {
          console.log('⚠️ Supabase returned error (likely email sending issue), checking if user was created...');
          
          // Wait a moment for user creation to complete
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Check if user exists by trying to sign in
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (signInData?.session) {
            // User was created and can sign in (email confirmation might not be required)
            console.log('✅ User was created, signing in...');
            await loadUserFromSession(signInData.session);
            return { 
              success: true, 
              session: signInData.session,
              warning: 'Account created successfully! You are now signed in. (Note: Email confirmation may not have been sent due to SMTP configuration)'
            };
          }
          
          // If sign-in fails due to email confirmation
          if (signInError?.message?.includes('Email not confirmed') || signInError?.message?.includes('not confirmed')) {
            // User was created but needs email confirmation
            console.log('📧 User created but email confirmation required');
            return {
              success: true,
              requiresEmailConfirmation: true,
              message: 'Account created! However, the confirmation email may not have been sent due to SMTP configuration. Please check your email (including spam folder), or contact support for assistance.'
            };
          }
          
          // If sign-in fails with invalid credentials, user might not have been created
          if (signInError?.message?.includes('Invalid login') || signInError?.message?.includes('Invalid')) {
            return {
              success: false,
              error: 'Registration may have failed. Please try again, or contact support if the issue persists.'
            };
          }
          
          // Unknown error - assume user might have been created
          return {
            success: true,
            requiresEmailConfirmation: true,
            message: 'Account may have been created, but we encountered an issue sending the confirmation email. Please check your email (including spam folder), or try signing in to see if your account was created.'
          };
        }
        
        // Handle email confirmation errors
        if (error.message?.includes('confirmation email') || error.message?.includes('Error sending')) {
          // Check if user was actually created despite email error
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { data: checkData, error: checkError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (checkData?.session) {
            // User was created, just email failed - allow them to proceed
            await loadUserFromSession(checkData.session);
            return { 
              success: true, 
              session: checkData.session,
              warning: 'Account created! Email confirmation may not have been sent, but you can sign in now.'
            };
          }
          
          // If user exists but needs confirmation
          if (checkError?.message?.includes('Email not confirmed')) {
            return {
              success: true,
              requiresEmailConfirmation: true,
              message: 'Account created! Please check your email to confirm your account, or try signing in directly.'
            };
          }
        }
        
        // Handle duplicate email
        if (error.message?.includes('already registered') || error.message?.includes('already exists') || error.message?.includes('User already registered')) {
          return {
            success: false,
            error: 'This email is already registered. Please sign in instead.'
          };
        }
        
        // Handle password errors
        if (error.message?.includes('Password')) {
          return {
            success: false,
            error: 'Password does not meet requirements. Please use a stronger password.'
          };
        }
        
        // Generic error
        return {
          success: false,
          error: error.message || 'Registration failed. Please try again.'
        };
      }

      // Success case: User was created
      if (data.user) {
        // If we have a session, email confirmation is not required (or was bypassed)
        if (data.session) {
          await loadUserFromSession(data.session);
          return { success: true, session: data.session };
        }
        
        // No session - email confirmation is required
        console.log('📧 Email confirmation required - no session returned');
        return { 
          success: true, 
          requiresEmailConfirmation: true,
          message: 'Account created successfully! Please check your email inbox (and spam folder) for a confirmation link. Click the link to verify your email address, then you can sign in.',
          user: data.user
        };
      }

      // No user data returned - registration failed
      return { 
        success: false, 
        error: 'Registration failed. Please check your information and try again.' 
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide user-friendly error messages
      let errorMessage = error.message || 'Registration failed. Please try again.';
      
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.message.includes('password')) {
        errorMessage = 'Password does not meet requirements. Please use a stronger password.';
      } else if (error.message.includes('email')) {
        errorMessage = 'Invalid email address. Please check and try again.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (reason = 'user_initiated') => {
    try {
      // Clear inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      // Clear any local storage items
      localStorage.removeItem("googleLang");
      localStorage.removeItem("preferredLang");
      localStorage.removeItem("language");
      localStorage.removeItem("fallback_questionnaire_results");
      
      if (reason === 'inactivity') {
        console.log('🔒 Session expired due to inactivity');
      }
      
      return { success: true, reason };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Reset inactivity timer on user activity
  const resetInactivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Only set timer if user is logged in
    if (user) {
      inactivityTimerRef.current = setTimeout(() => {
        console.log('⏰ Session timeout - logging out due to inactivity');
        logout('inactivity');
      }, SESSION_TIMEOUT);
    }
  }, [user]);

  // Set up activity listeners for session timeout
  useEffect(() => {
    if (!user) {
      // Clear timer if no user
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      return;
    }

    // Activity events to track
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Throttled activity handler (only reset every 30 seconds to avoid too many resets)
    let lastReset = 0;
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastReset > 30000) { // Only reset every 30 seconds
        lastReset = now;
        resetInactivityTimer();
      }
    };

    // Add event listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Start initial timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [user, resetInactivityTimer]);
  
  // Update user data when profile is updated
  const updateUserData = async (updatedUserData) => {
    try {
      const session = await getCurrentSession();
      if (!session?.user) {
        throw new Error('No active session');
      }

      // Update profile in database
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updatedUserData)
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local user state
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUserData,
        profileImage: updatedUserData.profile_picture || updatedUserData.profileImage || prevUser?.profileImage
      }));

      return { success: true, data };
    } catch (error) {
      console.error('Update user data error:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Refresh user status
  const refreshUserStatus = async () => {
    setLoading(true);
    try {
      const session = await getCurrentSession();
      if (session) {
        // Force reload user from session and database
        await loadUserFromSession(session);
        
        // Also explicitly check questionnaire status from backend
        try {
          const questionnaireRes = await axios.get(`${API_BASE_URL}/questionnaire/status`, {
            headers: { 
              Authorization: `Bearer ${session.access_token}` 
            }
          });
          const questionnaireCompleted = questionnaireRes.data?.questionnaireCompleted || questionnaireRes.data?.completed || false;
          
          // Update user state with latest questionnaire status
          setUser(prevUser => ({
            ...prevUser,
            questionnaireCompleted: questionnaireCompleted
          }));
          
          console.log('✅ Questionnaire status refreshed:', questionnaireCompleted);
        } catch (error) {
          console.log('⚠️ Could not fetch questionnaire status:', error.message);
        }
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get current access token for API calls
  const getAccessToken = async () => {
    try {
      const session = await getCurrentSession();
      return session?.access_token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };

  const value = { 
    user, 
    login, 
    register,
    logout, 
    loading, 
    refreshUserStatus, 
    updateUserData,
    getAccessToken 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};