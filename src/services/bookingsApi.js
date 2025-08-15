import apiClient from './apiClient';

export const bookingsApi = {
  // Create a new booking
  create: (bookingData) => {
    return apiClient.post('/bookings', bookingData);
  },

  // Get user's booking history
  getHistory: (userId) => {
    return apiClient.get(`/bookings/user/${userId}`);
  },

  // Get all bookings (admin)
  getAll: (params = {}) => {
    return apiClient.get('/bookings', { params });
  },

  // Get booking by ID
  getById: (id) => {
    return apiClient.get(`/bookings/${id}`);
  },

  // Update booking
  update: (id, bookingData) => {
    return apiClient.put(`/bookings/${id}`, bookingData);
  },

  // Cancel booking
  cancel: (id, reason = '') => {
    return apiClient.patch(`/bookings/${id}/cancel`, { reason });
  },

  // Confirm booking
  confirm: (id) => {
    return apiClient.patch(`/bookings/${id}/confirm`);
  },

  // Check-in guest
  checkIn: (id) => {
    return apiClient.patch(`/bookings/${id}/check-in`);
  },

  // Check-out guest
  checkOut: (id) => {
    return apiClient.patch(`/bookings/${id}/check-out`);
  },

  // Get booking statistics
  getStats: (startDate, endDate) => {
    return apiClient.get('/bookings/stats', {
      params: { startDate, endDate }
    });
  },

  // Send booking confirmation email
  sendConfirmation: (id) => {
    return apiClient.post(`/bookings/${id}/send-confirmation`);
  },

  // Get available time slots for booking
  getAvailableSlots: (roomId, date) => {
    return apiClient.get(`/bookings/available-slots`, {
      params: { roomId, date }
    });
  },
};
