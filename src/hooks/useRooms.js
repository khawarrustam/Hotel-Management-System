import { useState, useEffect } from 'react';
import { roomsApi } from '../services/roomsApi';

export const useRooms = (filters = {}) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchRooms = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomsApi.getAll({ ...filters, ...params });
      setRooms(response.data.rooms);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoomById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomsApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchRooms = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomsApi.search(searchParams);
      setRooms(response.data.rooms);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
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
