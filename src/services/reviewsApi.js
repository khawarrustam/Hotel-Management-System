import apiClient from './apiClient';

export const reviewsApi = {
  // Get all reviews
  getAll: (params = {}) => {
    return apiClient.get('/reviews', { params });
  },

  // Get reviews for a specific room
  getByRoom: (roomId, params = {}) => {
    return apiClient.get(`/reviews/room/${roomId}`, { params });
  },

  // Get review by ID
  getById: (id) => {
    return apiClient.get(`/reviews/${id}`);
  },

  // Create a new review
  create: (reviewData) => {
    return apiClient.post('/reviews', reviewData);
  },

  // Update review
  update: (id, reviewData) => {
    return apiClient.put(`/reviews/${id}`, reviewData);
  },

  // Delete review
  delete: (id) => {
    return apiClient.delete(`/reviews/${id}`);
  },

  // Get user's reviews
  getByUser: (userId) => {
    return apiClient.get(`/reviews/user/${userId}`);
  },

  // Admin endpoints
  
  // Approve review
  approve: (id) => {
    return apiClient.patch(`/reviews/${id}/approve`);
  },

  // Reject review
  reject: (id, reason = '') => {
    return apiClient.patch(`/reviews/${id}/reject`, { reason });
  },

  // Get pending reviews
  getPending: () => {
    return apiClient.get('/reviews/pending');
  },

  // Get review statistics
  getStats: () => {
    return apiClient.get('/reviews/stats');
  },

  // Get average rating for a room
  getRoomRating: (roomId) => {
    return apiClient.get(`/reviews/room/${roomId}/rating`);
  },

  // Get featured reviews
  getFeatured: (limit = 6) => {
    return apiClient.get('/reviews/featured', {
      params: { limit }
    });
  },

  // Report review
  report: (id, reason) => {
    return apiClient.post(`/reviews/${id}/report`, { reason });
  },

  // Like/Unlike review
  toggleLike: (id) => {
    return apiClient.patch(`/reviews/${id}/toggle-like`);
  },

  // Reply to review (admin/management)
  reply: (id, replyText) => {
    return apiClient.post(`/reviews/${id}/reply`, { reply: replyText });
  },
};
