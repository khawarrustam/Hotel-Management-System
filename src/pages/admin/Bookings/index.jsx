import React, { useState, useEffect } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      // API call to fetch bookings
      setBookings([]); // Placeholder
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // API call to update booking status
      console.log('Updating booking status:', bookingId, newStatus);
      fetchBookings(); // Refresh list
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="admin-bookings">
      <div className="page-header">
        <h1>Booking Management</h1>
        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8">No bookings found</td>
              </tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>${booking.total}</td>
                  <td>
                    <button>View Details</button>
                    <button>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
