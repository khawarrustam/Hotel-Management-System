// Mock API service for development
import { MOCK_CONFIG } from '../config/development';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock room data
const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    type: 'Double',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'spa'],
    capacity: { adults: 2, children: 1 },
    description: 'Spacious room with stunning ocean views and premium amenities.',
    available: true
  },
  {
    id: 2,
    name: 'Presidential Suite',
    type: 'Suite',
    price: 799,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'spa', 'balcony', 'minibar'],
    capacity: { adults: 4, children: 2 },
    description: 'Ultimate luxury suite with panoramic views and exclusive services.',
    available: true
  },
  {
    id: 3,
    name: 'Classic Single',
    type: 'Single',
    price: 149,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast'],
    capacity: { adults: 1, children: 0 },
    description: 'Comfortable single room perfect for business travelers.',
    available: true
  },
  {
    id: 4,
    name: 'Family Paradise',
    type: 'Double',
    price: 399,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'playground'],
    capacity: { adults: 2, children: 3 },
    description: 'Spacious family room with connecting children\'s area.',
    available: true
  },
  {
    id: 5,
    name: 'Business Executive',
    type: 'Single',
    price: 229,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'workdesk', 'minibar'],
    capacity: { adults: 1, children: 0 },
    description: 'Modern business room with premium work facilities.',
    available: true
  },
  {
    id: 6,
    name: 'Romantic Getaway',
    type: 'Double',
    price: 349,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'spa', 'balcony', 'minibar'],
    capacity: { adults: 2, children: 0 },
    description: 'Intimate room designed for couples with romantic ambiance.',
    available: true
  }
];

// Mock user data
const mockUser = {
  id: 1,
  email: 'demo@hotel.com',
  firstName: 'Demo',
  lastName: 'User',
  role: 'guest'
};

export const mockApi = {
  // Rooms API
  rooms: {
    getAll: async (params = {}) => {
      await delay(MOCK_CONFIG.apiDelay);
      
      let filtered = [...mockRooms];
      
      // Apply filters
      if (params.type) {
        filtered = filtered.filter(room => room.type === params.type);
      }
      if (params.minPrice) {
        filtered = filtered.filter(room => room.price >= params.minPrice);
      }
      if (params.maxPrice) {
        filtered = filtered.filter(room => room.price <= params.maxPrice);
      }
      if (params.adults) {
        filtered = filtered.filter(room => room.capacity.adults >= params.adults);
      }
      
      return {
        data: {
          rooms: filtered,
          pagination: {
            page: params.page || 1,
            limit: params.limit || 10,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / (params.limit || 10))
          }
        }
      };
    },

    getById: async (id) => {
      await delay(MOCK_CONFIG.apiDelay);
      const room = mockRooms.find(r => r.id === parseInt(id));
      
      if (!room) {
        throw new Error('Room not found');
      }
      
      return { data: room };
    },

    search: async (searchParams) => {
      await delay(MOCK_CONFIG.apiDelay);
      
      let filtered = [...mockRooms];
      
      if (searchParams.checkIn && searchParams.checkOut) {
        // Simulate availability check
        filtered = filtered.filter(room => room.available);
      }
      
      return {
        data: {
          rooms: filtered,
          pagination: {
            page: 1,
            limit: 10,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / 10)
          }
        }
      };
    }
  },

  // Auth API
  auth: {
    login: async (credentials) => {
      await delay(MOCK_CONFIG.apiDelay);
      
      // Simple mock validation
      if (credentials.email && credentials.password) {
        const token = 'mock-jwt-token-' + Date.now();
        return {
          data: {
            user: mockUser,
            token: token
          }
        };
      }
      
      throw new Error('Invalid credentials');
    },

    register: async (userData) => {
      await delay(MOCK_CONFIG.apiDelay);
      
      const token = 'mock-jwt-token-' + Date.now();
      const newUser = {
        ...mockUser,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      return {
        data: {
          user: newUser,
          token: token
        }
      };
    },

    validateToken: async () => {
      await delay(MOCK_CONFIG.apiDelay);
      return {
        data: {
          user: mockUser,
          valid: true
        }
      };
    }
  },

  // Bookings API
  bookings: {
    create: async (bookingData) => {
      await delay(MOCK_CONFIG.apiDelay);
      
      const booking = {
        id: Date.now(),
        ...bookingData,
        status: 'confirmed',
        confirmationNumber: 'HTL' + Date.now(),
        createdAt: new Date().toISOString()
      };
      
      return { data: booking };
    },

    getHistory: async () => {
      await delay(MOCK_CONFIG.apiDelay);
      return { data: [] };
    }
  }
};

export default mockApi;
