import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import { useAuth } from '../hooks/useAuth';

// Public Pages
import Home from '../pages/Home/index';
import Rooms from '../pages/Rooms/index';
import RoomDetails from '../pages/RoomDetails/index';
import Booking from '../pages/Booking/index';
import Contact from '../pages/Contact/index';
import Reviews from '../pages/Reviews/index';
import Auth from '../pages/Auth/index';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard/index';
import AdminRooms from '../pages/admin/Rooms/index';
import AdminEmployees from '../pages/admin/Employees/index';
import AdminBookings from '../pages/admin/Bookings/index';
import AdminReviews from '../pages/admin/Reviews/index';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="auth" element={<Auth />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
