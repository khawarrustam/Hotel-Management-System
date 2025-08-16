import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaFilter,
  FaUsers,
  FaBed,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCoffee,
  FaCar,
  FaSwimmingPool,
  FaConciergeBell,
  FaSpa,
  FaDumbbell,
  FaUtensils,
  FaEye,
  FaRulerCombined,
  FaStar,
  FaCalendarCheck,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaImage,
  FaUpload
} from 'react-icons/fa';
import './AdminRooms.scss';

const AdminRooms = () => {
  // Sample room data with luxury hotel rooms
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Royal Presidential Suite',
      type: 'Presidential Suite',
      price: 1200,
      status: 'available',
      guests: 4,
      beds: 2,
      description: 'Luxurious presidential suite with panoramic city views, private terrace, and premium amenities including butler service.',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'spa', 'gym', 'concierge'],
      size: 120,
      floor: 15
    },
    {
      id: 2,
      name: 'Executive Business Suite',
      type: 'Business Suite',
      price: 650,
      status: 'occupied',
      guests: 2,
      beds: 1,
      description: 'Modern business suite with dedicated workspace, high-speed internet, and city skyline views.',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'concierge'],
      size: 65,
      floor: 12
    },
    {
      id: 3,
      name: 'Deluxe Ocean View',
      type: 'Deluxe Room',
      price: 450,
      status: 'maintenance',
      guests: 2,
      beds: 1,
      description: 'Elegant deluxe room with floor-to-ceiling windows overlooking the ocean and modern amenities.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar'],
      size: 45,
      floor: 8
    },
    {
      id: 4,
      name: 'Premium King Room',
      type: 'Premium Room',
      price: 320,
      status: 'available',
      guests: 2,
      beds: 1,
      description: 'Comfortable premium room with king-size bed, marble bathroom, and modern furnishings.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar'],
      size: 35,
      floor: 6
    },
    {
      id: 5,
      name: 'Family Garden Suite',
      type: 'Family Suite',
      price: 850,
      status: 'available',
      guests: 6,
      beds: 3,
      description: 'Spacious family suite with separate living area, kitchenette, and private garden access.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'kitchen', 'pool'],
      size: 95,
      floor: 3
    },
    {
      id: 6,
      name: 'Luxury Penthouse',
      type: 'Penthouse',
      price: 2500,
      status: 'occupied',
      guests: 8,
      beds: 4,
      description: 'Ultimate luxury penthouse with private elevator, rooftop terrace, and 360-degree city views.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'spa', 'gym', 'pool', 'concierge'],
      size: 180,
      floor: 20
    },
    {
      id: 7,
      name: 'Classic Double Room',
      type: 'Standard Room',
      price: 280,
      status: 'available',
      guests: 2,
      beds: 1,
      description: 'Classic double room with comfortable furnishings and essential amenities for a pleasant stay.',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac'],
      size: 28,
      floor: 4
    },
    {
      id: 8,
      name: 'Junior Suite Deluxe',
      type: 'Junior Suite',
      price: 520,
      status: 'available',
      guests: 3,
      beds: 1,
      description: 'Sophisticated junior suite with separate seating area and upgraded amenities.',
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'spa'],
      size: 55,
      floor: 10
    }
  ]);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    guests: '',
    beds: '',
    size: '',
    floor: '',
    status: 'available',
    amenities: [],
    image: ''
  });

  const itemsPerPage = 8;
  const roomTypes = ['Presidential Suite', 'Business Suite', 'Penthouse', 'Family Suite', 'Junior Suite', 'Deluxe Room', 'Premium Room', 'Standard Room'];
  const availableAmenities = ['wifi', 'tv', 'ac', 'minibar', 'kitchen', 'spa', 'gym', 'pool', 'concierge'];

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <FaWifi />,
      tv: <FaTv />,
      ac: <FaSnowflake />,
      minibar: <FaCoffee />,
      kitchen: <FaUtensils />,
      spa: <FaSpa />,
      gym: <FaDumbbell />,
      pool: <FaSwimmingPool />,
      concierge: <FaConciergeBell />
    };
    return icons[amenity] || <FaCheck />;
  };

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
    
    return matchesSearch && matchesStatus && matchesType && matchesPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const currentRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get status color and display
  const getStatusInfo = (status) => {
    const statusMap = {
      available: { color: 'success', label: 'Available', icon: <FaCheck /> },
      occupied: { color: 'primary', label: 'Occupied', icon: <FaUsers /> },
      maintenance: { color: 'warning', label: 'Maintenance', icon: <FaConciergeBell /> },
      cleaning: { color: 'info', label: 'Cleaning', icon: <FaSpa /> }
    };
    return statusMap[status] || { color: 'secondary', label: status, icon: <FaCheck /> };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing room
      setRooms(prev => prev.map(room => 
        room.id === selectedRoom.id 
          ? { ...formData, id: selectedRoom.id, price: Number(formData.price) }
          : room
      ));
    } else {
      // Add new room
      const newRoom = {
        ...formData,
        id: Math.max(...rooms.map(r => r.id)) + 1,
        price: Number(formData.price)
      };
      setRooms(prev => [...prev, newRoom]);
    }
    
    resetModal();
  };

  // Handle delete
  const handleDelete = () => {
    setRooms(prev => prev.filter(room => room.id !== selectedRoom.id));
    setShowDeleteModal(false);
    setSelectedRoom(null);
  };

  // Modal management
  const resetModal = () => {
    setShowAddEditModal(false);
    setSelectedRoom(null);
    setIsEditing(false);
    setFormData({
      name: '',
      type: '',
      price: '',
      description: '',
      guests: '',
      beds: '',
      size: '',
      floor: '',
      status: 'available',
      amenities: [],
      image: ''
    });
  };

  const openAddModal = () => {
    resetModal();
    setShowAddEditModal(true);
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData(room);
    setIsEditing(true);
    setShowAddEditModal(true);
  };

  const openDeleteModal = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  // Handle amenity toggle
  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="admin-rooms">
      {/* Header Section */}
      <div className="rooms-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">Manage Rooms</h1>
            <p className="page-subtitle">
              Comprehensive room management for your luxury hotel
            </p>
            <div className="stats-overview">
              <div className="stat-card">
                <span className="stat-number">{rooms.filter(r => r.status === 'available').length}</span>
                <span className="stat-label">Available</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{rooms.filter(r => r.status === 'occupied').length}</span>
                <span className="stat-label">Occupied</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{rooms.filter(r => r.status === 'maintenance').length}</span>
                <span className="stat-label">Maintenance</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">${Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length)}</span>
                <span className="stat-label">Avg. Price</span>
              </div>
            </div>
          </div>
          <button className="add-room-btn" onClick={openAddModal}>
            <FaPlus /> Add New Room
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="controls-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by room name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Room Type</label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="price-slider"
            />
          </div>

          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Display */}
      {viewMode === 'table' ? (
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
              {currentRooms.map((room) => {
                const statusInfo = getStatusInfo(room.status);
                return (
                  <tr key={room.id} className="room-row">
                    <td className="room-info">
                      <img src={room.image} alt={room.name} className="room-thumbnail" />
                      <div className="room-details">
                        <h4>{room.name}</h4>
                        <span>Floor {room.floor} • {room.size}m²</span>
                      </div>
                    </td>
                    <td className="room-type">{room.type}</td>
                    <td className="room-price">${room.price}</td>
                    <td className="room-capacity">
                      <FaUsers /> {room.guests} guests • <FaBed /> {room.beds} beds
                    </td>
                    <td className="room-status">
                      <span className={`status-badge ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="room-actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => openDetailsModal(room)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => openEditModal(room)}
                        title="Edit Room"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => openDeleteModal(room)}
                        title="Delete Room"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rooms-grid">
          {currentRooms.map((room) => {
            const statusInfo = getStatusInfo(room.status);
            return (
              <div key={room.id} className="room-card">
                <div className="card-image">
                  <img src={room.image} alt={room.name} />
                  <span className={`status-badge ${statusInfo.color}`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </span>
                </div>
                <div className="card-content">
                  <h3>{room.name}</h3>
                  <p className="room-type">{room.type}</p>
                  <p className="room-description">{room.description.substring(0, 100)}...</p>
                  
                  <div className="room-specs">
                    <span><FaUsers /> {room.guests}</span>
                    <span><FaBed /> {room.beds}</span>
                    <span><FaRulerCombined /> {room.size}m²</span>
                  </div>
                  
                  <div className="room-amenities">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="amenity-icon">
                        {getAmenityIcon(amenity)}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="more-amenities">+{room.amenities.length - 4}</span>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <div className="price">${room.price}/night</div>
                    <div className="actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => openDetailsModal(room)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => openEditModal(room)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => openDeleteModal(room)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {filteredRooms.length === 0 && (
        <div className="no-results">
          <FaSearch size={48} />
          <h3>No rooms found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn prev-btn"
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn next-btn"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Add/Edit Room Modal */}
      {showAddEditModal && (
        <div className="modal-overlay">
          <div className="modal add-edit-modal">
            <div className="modal-header">
              <h3>{isEditing ? 'Edit Room' : 'Add New Room'}</h3>
              <button onClick={resetModal} className="close-btn">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Room Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Room Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                  >
                    <option value="">Select Type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Price per Night ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>Max Guests</label>
                  <input
                    type="number"
                    value={formData.guests}
                    onChange={(e) => setFormData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                    required
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Number of Beds</label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData(prev => ({ ...prev, beds: Number(e.target.value) }))}
                    required
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Room Size (m²)</label>
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: Number(e.target.value) }))}
                    required
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Floor</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData(prev => ({ ...prev, floor: Number(e.target.value) }))}
                    required
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  placeholder="Enter room description..."
                />
              </div>
              
              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/room-image.jpg"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Amenities</label>
                <div className="amenities-grid">
                  {availableAmenities.map(amenity => (
                    <label key={amenity} className="amenity-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      <span className="checkmark">{getAmenityIcon(amenity)}</span>
                      <span className="amenity-label">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
            
            <div className="modal-footer">
              <button type="button" onClick={resetModal} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" onClick={handleSubmit} className="save-btn">
                {isEditing ? 'Update Room' : 'Add Room'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Details Modal */}
      {showDetailsModal && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal details-modal">
            <div className="modal-header">
              <h3><FaEye /> Room Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body details-body">
              <div className="details-grid">
                <div className="image-section">
                  <img src={selectedRoom.image} alt={selectedRoom.name} />
                  <span className={`status-badge ${getStatusInfo(selectedRoom.status).color}`}>
                    {getStatusInfo(selectedRoom.status).icon}
                    {getStatusInfo(selectedRoom.status).label}
                  </span>
                </div>
                
                <div className="info-section">
                  <h2>{selectedRoom.name}</h2>
                  <p className="room-type">{selectedRoom.type}</p>
                  <div className="price-display">${selectedRoom.price}/night</div>
                  
                  <p className="description">{selectedRoom.description}</p>
                  
                  <div className="specifications">
                    <h4>Specifications</h4>
                    <div className="spec-items">
                      <div className="spec-item">
                        <FaUsers /> {selectedRoom.guests} guests
                      </div>
                      <div className="spec-item">
                        <FaBed /> {selectedRoom.beds} beds
                      </div>
                      <div className="spec-item">
                        <FaRulerCombined /> {selectedRoom.size}m²
                      </div>
                      <div className="spec-item">
                        <FaBuilding /> Floor {selectedRoom.floor}
                      </div>
                    </div>
                  </div>
                  
                  <div className="amenities-section">
                    <h4>Amenities</h4>
                    <div className="amenities-list">
                      {selectedRoom.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(selectedRoom);
                }}
                className="edit-btn"
              >
                <FaEdit /> Edit Room
              </button>
              <button onClick={() => setShowDetailsModal(false)} className="cancel-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{selectedRoom.name}</strong>?</p>
              <p className="warning">This action cannot be undone.</p>
            </div>
            
            <div className="modal-footer">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
