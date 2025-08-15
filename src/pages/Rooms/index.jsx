import React from 'react';
import { useRooms } from '../../hooks/useRooms';

const Rooms = () => {
  const { rooms, loading, error } = useRooms();

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rooms-page">
      <h1>Our Rooms</h1>
      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}/night</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
