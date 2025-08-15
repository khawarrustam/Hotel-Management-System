import React from 'react';
import { useBooking } from '../../hooks/useBooking';

const Booking = () => {
  const {
    selectedRoom,
    selectedDates,
    guests,
    currentBooking,
    createBooking,
    clearBooking
  } = useBooking();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // Handle booking submission
    const bookingData = {
      roomId: selectedRoom?.id,
      checkIn: selectedDates.checkIn,
      checkOut: selectedDates.checkOut,
      guests,
    };
    await createBooking(bookingData);
  };

  return (
    <div className="booking-page">
      <h1>Complete Your Booking</h1>
      
      {selectedRoom && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <p>Room: {selectedRoom.name}</p>
          <p>Check-in: {selectedDates.checkIn}</p>
          <p>Check-out: {selectedDates.checkOut}</p>
          <p>Guests: {guests.adults} adults, {guests.children} children</p>
        </div>
      )}

      <form onSubmit={handleBookingSubmit} className="booking-form">
        {/* Add booking form fields */}
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={clearBooking}>Cancel</button>
      </form>

      {currentBooking && (
        <div className="booking-confirmation">
          <h2>Booking Confirmed!</h2>
          <p>Confirmation Number: {currentBooking.confirmationNumber}</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
