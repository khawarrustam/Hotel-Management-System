// Development configuration
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retries: 3,
};

// Development flags
export const DEV_FLAGS = {
  useMockData: true, // Set to false when backend is available
  bypassAuth: true,  // Set to false for production
  enableLogging: isDevelopment,
};

// Mock data configuration
export const MOCK_CONFIG = {
  apiDelay: 500, // Simulate API response time
  enableErrors: false, // Simulate API errors for testing
};

console.log('🚀 Development Mode:', isDevelopment);
console.log('📡 API Base URL:', API_CONFIG.baseURL);
console.log('🎭 Using Mock Data:', DEV_FLAGS.useMockData);
