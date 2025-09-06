import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
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
=======
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
  withCredentials: true
});

// ✅ Automatically attach token to each request (except auth endpoints)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // Don't attach token for register/login endpoints
  if (token && !config.url.includes("/auth/register") && !config.url.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token attached to request:', token.substring(0, 20) + '...');
  } else if (!token && !config.url.includes("/auth/register") && !config.url.includes("/auth/login")) {
    console.warn('⚠️ No token found in localStorage for protected endpoint');
>>>>>>> c2fbe43 (Initial commit)
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