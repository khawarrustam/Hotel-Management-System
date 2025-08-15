import apiClient from './apiClient';

export const usersApi = {
  // Authentication
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  logout: () => {
    return apiClient.post('/auth/logout');
  },

  // Password management
  forgotPassword: (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },

  changePassword: (currentPassword, newPassword) => {
    return apiClient.patch('/auth/change-password', {
      currentPassword,
      newPassword
    });
  },

  // User profile
  getProfile: () => {
    return apiClient.get('/users/profile');
  },

  updateProfile: (profileData) => {
    return apiClient.patch('/users/profile', profileData);
  },

  uploadAvatar: (formData) => {
    return apiClient.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Admin user management
  getAllUsers: (params = {}) => {
    return apiClient.get('/users', { params });
  },

  getUserById: (id) => {
    return apiClient.get(`/users/${id}`);
  },

  updateUser: (id, userData) => {
    return apiClient.put(`/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return apiClient.delete(`/users/${id}`);
  },

  // Role management
  updateUserRole: (id, role) => {
    return apiClient.patch(`/users/${id}/role`, { role });
  },

  // Account verification
  verifyEmail: (token) => {
    return apiClient.post('/auth/verify-email', { token });
  },

  resendVerification: (email) => {
    return apiClient.post('/auth/resend-verification', { email });
  },

  // Token validation
  validateToken: () => {
    return apiClient.get('/auth/validate-token');
  },

  // Refresh token
  refreshToken: () => {
    return apiClient.post('/auth/refresh-token');
  },
};
