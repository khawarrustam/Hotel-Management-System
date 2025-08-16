import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaUsers,
  FaBed,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import './AdminRooms.scss';

// Simple room data
const initialRooms = [
  {
    id: 1,
    name: "Royal Executive Suite",
    type: "Suite",
    price: 450,
    status: "Available",
    capacity: { adults: 2, children: 1 },
    size: 65,
    description: "Luxurious executive suite with panoramic city views.",
    image: "/images/room-1.jpeg",
    amenities: ["wifi", "tv", "ac"],
    floor: 12,
    bedType: "King Size",
    view: "City View"
  },
  {
    id: 2,
    name: "Premium Ocean View",
    type: "Double",
    price: 320,
    status: "Occupied",
    capacity: { adults: 2, children: 2 },
    size: 45,
    description: "Spacious double room with stunning ocean views.",
    image: "/images/room-2.jpeg",
    amenities: ["wifi", "tv", "ac"],
    floor: 8,
    bedType: "Queen Size",
    view: "Ocean View"
  },
  {
    id: 3,
    name: "Garden Villa Single",
    type: "Single",
    price: 180,
    status: "Available",
    capacity: { adults: 1, children: 0 },
    size: 30,
    description: "Cozy single room overlooking beautiful gardens.",
    image: "/images/room-3.jpeg",
    amenities: ["wifi", "tv"],
    floor: 3,
    bedType: "Single",
    view: "Garden View"
  }
];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    status: 'Available',
    description: ''
  });

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setFormData({
      name: '',
      type: '',
      price: '',
      status: 'Available',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      price: room.price.toString(),
      status: room.status,
      description: room.description
    });
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const roomData = {
      ...formData,
      id: selectedRoom ? selectedRoom.id : Date.now(),
      price: parseFloat(formData.price),
      capacity: { adults: 2, children: 1 },
      size: 40,
      image: "/images/room-1.jpeg",
      amenities: ["wifi", "tv"],
      floor: 5,
      bedType: "Queen Size",
      view: "City View"
    };

    if (selectedRoom) {
      setRooms(rooms.map(room => room.id === selectedRoom.id ? roomData : room));
    } else {
      setRooms([...rooms, roomData]);
    }

    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Occupied': return 'primary';
      case 'Maintenance': return 'warning';
      default: return 'secondary';
    }
  };



  return (
    <div className="admin-rooms">
      {/* Header Section */}
      <div className="rooms-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">Manage Rooms</h1>
            <p className="page-subtitle">Luxury Hotel Room Management System</p>
            
            <div className="stats-overview">
              <div className="stat-card">
                <span className="stat-number">{rooms.length}</span>
                <span className="stat-label">Total Rooms</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{rooms.filter(r => r.status === 'Available').length}</span>
                <span className="stat-label">Available</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{rooms.filter(r => r.status === 'Occupied').length}</span>
                <span className="stat-label">Occupied</span>
              </div>
            </div>
          </div>
          
          <button className="add-room-btn" onClick={handleAddRoom}>
            <FaPlus />
            Add New Room
          </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by room name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>Status</label>
            <select 
              className="filter-select"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      {filteredRooms.length === 0 ? (
        <div className="no-results">
          <FaBed size={48} />
          <h3>No rooms found</h3>
          <p>Try adjusting your search criteria or add a new room.</p>
        </div>
      ) : (
        <div className="rooms-table-container">
          <table className="rooms-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Type</th>
                <th>Price/Night</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => (
                <tr key={room.id} className="room-row">
                  <td className="room-info">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="room-thumbnail"
                      onError={(e) => {
                        e.target.src = '/images/defaultBcg.jpeg';
                      }}
                    />
                    <div className="room-details">
                      <h4>{room.name}</h4>
                      <span>Floor {room.floor} • {room.size}m²</span>
                    </div>
                  </td>
                  <td className="room-type">{room.type}</td>
                  <td className="room-price">{room.price}</td>
                  <td className="room-capacity">
                    <span><FaUsers /> {room.capacity.adults} Adults</span>
                    {room.capacity.children > 0 && (
                      <span><FaBed /> {room.capacity.children} Children</span>
                    )}
                  </td>
                  <td className="room-status">
                    <span className={`status-badge ${getStatusBadgeClass(room.status)}`}>
                      {room.status === 'Available' && <FaCheck />}
                      {room.status === 'Occupied' && <FaUsers />}
                      {room.status === 'Maintenance' && <FaTimes />}
                      {room.status}
                    </span>
                  </td>
                  <td className="room-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditRoom(room)}
                      title="Edit Room"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteRoom(room.id)}
                      title="Delete Room"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal add-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <FaBed />
                {selectedRoom ? 'Edit Room' : 'Add New Room'}
              </h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Room Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Room Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suite">Suite</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Price per Night ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {selectedRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
