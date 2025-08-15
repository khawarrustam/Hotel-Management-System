import { useState, useEffect } from 'react';
// import { roomsApi } from '../services/roomsApi';

// Mock data for development
const mockRoomsData = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    type: 'Double',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'spa'],
    capacity: { adults: 2, children: 1 },
    description: 'Spacious room with stunning ocean views and premium amenities.'
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
    description: 'Ultimate luxury suite with panoramic views and exclusive services.'
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
    description: 'Comfortable single room perfect for business travelers.'
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
    description: 'Spacious family room with connecting children\'s area.'
  }
];

export const useRooms = (_filters = {}) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchRooms = async (_params = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setRooms(mockRoomsData);
        setPagination({
          page: 1,
          limit: 10,
          total: mockRoomsData.length,
          totalPages: Math.ceil(mockRoomsData.length / 10),
        });
        setLoading(false);
      }, 500);

      // TODO: Replace with actual API call when backend is available
      // const response = await roomsApi.getAll({ ...filters, ...params });
      // setRooms(response.data.rooms);
      // setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getRoomById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call with mock data
      const room = mockRoomsData.find(r => r.id === parseInt(id));
      setLoading(false);
      return room || null;

      // TODO: Replace with actual API call when backend is available
      // const response = await roomsApi.getById(id);
      // return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const searchRooms = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate search with mock data
      setTimeout(() => {
        let filteredRooms = [...mockRoomsData];
        
        // Apply basic filtering based on searchParams
        if (searchParams.type) {
          filteredRooms = filteredRooms.filter(room => room.type === searchParams.type);
        }
        if (searchParams.maxPrice) {
          filteredRooms = filteredRooms.filter(room => room.price <= searchParams.maxPrice);
        }
        if (searchParams.minPrice) {
          filteredRooms = filteredRooms.filter(room => room.price >= searchParams.minPrice);
        }

        setRooms(filteredRooms);
        setPagination({
          page: 1,
          limit: 10,
          total: filteredRooms.length,
          totalPages: Math.ceil(filteredRooms.length / 10),
        });
        setLoading(false);
      }, 500);

      // TODO: Replace with actual API call when backend is available
      // const response = await roomsApi.search(searchParams);
      // setRooms(response.data.rooms);
      // setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    pagination,
    fetchRooms,
    getRoomById,
    searchRooms,
  };
};
