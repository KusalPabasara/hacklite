import axios from 'axios';
import { supabase, getCurrentSession } from '../lib/supabase';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// ✅ Automatically attach Supabase token to each request
api.interceptors.request.use(async (config) => {
  try {
    const session = await getCurrentSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
      console.log('🔑 Supabase token attached to request');
    } else {
      console.warn('⚠️ No Supabase session found');
    }
  } catch (error) {
    console.error('❌ Error getting Supabase session:', error);
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('🚫 401 Unauthorized - Token may be expired or invalid');
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && 
          window.location.pathname !== '/register' && 
          window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;