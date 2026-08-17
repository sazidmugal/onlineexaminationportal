import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9000',
});

// Attach JWT token automatically, EXCEPT for auth endpoints (/api/auth/)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token && !config.url?.includes('/api/auth/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired or invalid tokens globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config.url?.includes('/api/auth/')) {
      localStorage.clear();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;