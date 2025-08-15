import axios from 'axios';
import { DEV_FLAGS } from '../config/development';
import mockApi from './mockApi';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and fallback to mock data
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If we're in development mode and using mock data, intercept network errors
    if (DEV_FLAGS.useMockData && error.code === 'ERR_NETWORK') {
      console.warn('🚧 Network error detected, falling back to mock data');
      
      // Try to handle the request with mock API
      const { method, url, data: requestData } = error.config;
      
      try {
        // Parse the URL to determine which mock API to call
        if (url.includes('/rooms')) {
          if (method === 'get' && url.includes('/rooms/')) {
            const id = url.split('/rooms/')[1];
            return await mockApi.rooms.getById(id);
          } else if (method === 'get') {
            return await mockApi.rooms.getAll();
          } else if (method === 'post' && url.includes('/search')) {
            return await mockApi.rooms.search(requestData);
          }
        } else if (url.includes('/auth/login')) {
          return await mockApi.auth.login(requestData);
        } else if (url.includes('/auth/register')) {
          return await mockApi.auth.register(requestData);
        } else if (url.includes('/bookings')) {
          if (method === 'post') {
            return await mockApi.bookings.create(requestData);
          } else if (method === 'get') {
            return await mockApi.bookings.getHistory();
          }
        }
      } catch (mockError) {
        console.error('Mock API error:', mockError);
      }
    }
    
    // Handle other error responses
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
    
    if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
