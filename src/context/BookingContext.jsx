import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  currentBooking: null,
  bookingHistory: [],
  selectedRoom: null,
  selectedDates: {
    checkIn: null,
    checkOut: null,
  },
  guests: {
    adults: 1,
    children: 0,
  },
  isLoading: false,
  error: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SELECT_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'SET_DATES':
      return { ...state, selectedDates: action.payload };
    case 'SET_GUESTS':
      return { ...state, guests: action.payload };
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        bookingHistory: [...state.bookingHistory, action.payload],
      };
    case 'SET_BOOKING_HISTORY':
      return { ...state, bookingHistory: action.payload };
    case 'CLEAR_BOOKING':
      return {
        ...state,
        currentBooking: null,
        selectedRoom: null,
        selectedDates: { checkIn: null, checkOut: null },
        guests: { adults: 1, children: 0 },
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const selectRoom = (room) => {
    dispatch({ type: 'SELECT_ROOM', payload: room });
  };

  const setDates = (dates) => {
    dispatch({ type: 'SET_DATES', payload: dates });
  };

  const setGuests = (guests) => {
    dispatch({ type: 'SET_GUESTS', payload: guests });
  };

  const createBooking = async (bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // API call to create booking
      // const response = await bookingAPI.create(bookingData);
      // dispatch({ type: 'SET_CURRENT_BOOKING', payload: response.data });
      // dispatch({ type: 'ADD_TO_HISTORY', payload: response.data });
      
      // Placeholder implementation
      throw new Error('Booking API not implemented');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getBookingHistory = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // API call to get booking history
      // const response = await bookingAPI.getHistory();
      // dispatch({ type: 'SET_BOOKING_HISTORY', payload: response.data });
      
      // Placeholder implementation
      dispatch({ type: 'SET_BOOKING_HISTORY', payload: [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const cancelBooking = async (bookingId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // API call to cancel booking
      // await bookingAPI.cancel(bookingId);
      // Update booking history
      
      // Placeholder implementation
      throw new Error('Cancel booking API not implemented');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearBooking = () => {
    dispatch({ type: 'CLEAR_BOOKING' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    selectRoom,
    setDates,
    setGuests,
    createBooking,
    getBookingHistory,
    cancelBooking,
    clearBooking,
    clearError,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};
