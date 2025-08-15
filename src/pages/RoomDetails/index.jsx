import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';

const RoomDetails = () => {
  const { id } = useParams();
  const { getRoomById } = useRooms();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      const roomData = await getRoomById(id);
      setRoom(roomData);
      setLoading(false);
    };

    fetchRoom();
  }, [id, getRoomById]);

  if (loading) return <div>Loading room details...</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="room-details-page">
      <h1>{room.name}</h1>
      <div className="room-images">
        {/* Add image gallery */}
      </div>
      <div className="room-info">
        <p>{room.description}</p>
        <p>Price: ${room.price}/night</p>
        <p>Capacity: {room.capacity} guests</p>
        <div className="amenities">
          <h3>Amenities</h3>
          {/* List amenities */}
        </div>
      </div>
      <div className="booking-section">
        {/* Add booking form */}
      </div>
    </div>
  );
};

export default RoomDetails;
