import React, { useState, useEffect } from 'react';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      // API call to fetch rooms
      setRooms([]); // Placeholder
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        // API call to delete room
        console.log('Deleting room:', roomId);
        fetchRooms(); // Refresh list
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  if (loading) return <div>Loading rooms...</div>;

  return (
    <div className="admin-rooms">
      <div className="page-header">
        <h1>Room Management</h1>
        <button onClick={handleAddRoom} className="add-btn">
          Add New Room
        </button>
      </div>

      <div className="rooms-table">
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="6">No rooms found</td>
              </tr>
            ) : (
              rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.number}</td>
                  <td>{room.type}</td>
                  <td>${room.price}</td>
                  <td>{room.status}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <button onClick={() => handleEditRoom(room)}>Edit</button>
                    <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="room-form-modal">
            <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
            {/* Add room form here */}
            <div className="form-actions">
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
