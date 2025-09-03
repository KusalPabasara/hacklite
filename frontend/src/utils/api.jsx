import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000
});

// ✅ Automatically attach token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token attached to request:', token.substring(0, 20) + '...');
  } else {
    console.warn('⚠️ No token found in localStorage');
  }
  return config;
});

// ✅ Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('🚫 401 Unauthorized - Token may be expired or invalid');
      // Clear invalid token
      localStorage.removeItem("token");
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;