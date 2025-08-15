import apiClient from './apiClient';

export const roomsApi = {
  // Get all rooms with optional filters
  getAll: (params = {}) => {
    return apiClient.get('/rooms', { params });
  },

  // Get room by ID
  getById: (id) => {
    return apiClient.get(`/rooms/${id}`);
  },

  // Search rooms with specific criteria
  search: (searchParams) => {
    return apiClient.post('/rooms/search', searchParams);
  },

  // Get available rooms for specific dates
  getAvailable: (checkIn, checkOut, guests = 1) => {
    return apiClient.get('/rooms/available', {
      params: { checkIn, checkOut, guests }
    });
  },

  // Admin endpoints
  create: (roomData) => {
    return apiClient.post('/rooms', roomData);
  },

  update: (id, roomData) => {
    return apiClient.put(`/rooms/${id}`, roomData);
  },

  delete: (id) => {
    return apiClient.delete(`/rooms/${id}`);
  },

  // Upload room images
  uploadImages: (id, formData) => {
    return apiClient.post(`/rooms/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get room amenities
  getAmenities: () => {
    return apiClient.get('/rooms/amenities');
  },

  // Get room types
  getTypes: () => {
    return apiClient.get('/rooms/types');
  },
};
