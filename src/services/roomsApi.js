import apiClient from './apiClient';
import { DEV_FLAGS } from '../config/development';
import mockApi from './mockApi';

export const roomsApi = {
  // Get all rooms with optional filters
  getAll: async (params = {}) => {
    try {
      if (DEV_FLAGS.useMockData) {
        console.log('🚧 Using mock data for rooms');
        return await mockApi.rooms.getAll(params);
      }
      return apiClient.get('/rooms', { params });
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  // Get room by ID
  getById: async (id) => {
    try {
      if (DEV_FLAGS.useMockData) {
        console.log('🚧 Using mock data for room details');
        return await mockApi.rooms.getById(id);
      }
      return apiClient.get(`/rooms/${id}`);
    } catch (error) {
      console.error('Error fetching room details:', error);
      throw error;
    }
  },

  // Search rooms with specific criteria
  search: async (searchParams) => {
    try {
      if (DEV_FLAGS.useMockData) {
        console.log('🚧 Using mock data for room search');
        return await mockApi.rooms.search(searchParams);
      }
      return apiClient.post('/rooms/search', searchParams);
    } catch (error) {
      console.error('Error searching rooms:', error);
      throw error;
    }
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
