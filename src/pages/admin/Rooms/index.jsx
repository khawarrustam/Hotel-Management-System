import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaBed,
  FaDollarSign,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaUpload,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaWifi,
  FaCoffee,
  FaTv,
  FaSnowflake
} from 'react-icons/fa';
import './AdminRooms.scss';

// Mock room data
const mockRooms = [
  {
    id: 1,
    name: 'Royal Suite 101',
    type: 'Presidential Suite',
    price: 850,
    status: 'available',
    capacity: 4,
    description: 'Luxurious presidential suite with panoramic city views, marble bathroom, and private balcony.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 120,
    floor: 1
  },
  {
    id: 2,
    name: 'Executive Room 205',
    type: 'Executive Room',
    price: 450,
    status: 'occupied',
    capacity: 2,
    description: 'Elegant executive room with modern amenities and city view.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac'],
    size: 45,
    floor: 2
  },
  {
    id: 3,
    name: 'Deluxe Suite 301',
    type: 'Deluxe Suite',
    price: 650,
    status: 'available',
    capacity: 3,
    description: 'Spacious deluxe suite with separate living area and luxury bathroom.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 75,
    floor: 3
  },
  {
    id: 4,
    name: 'Standard Room 102',
    type: 'Standard Room',
    price: 280,
    status: 'maintenance',
    capacity: 2,
    description: 'Comfortable standard room with essential amenities.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv'],
    size: 35,
    floor: 1
  },
  {
    id: 5,
    name: 'Superior Room 403',
    type: 'Superior Room',
    price: 380,
    status: 'available',
    capacity: 2,
    description: 'Superior room with enhanced comfort and modern design.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac'],
    size: 40,
    floor: 4
  },
  {
    id: 6,
    name: 'Family Suite 504',
    type: 'Family Suite',
    price: 720,
    status: 'occupied',
    capacity: 6,
    description: 'Spacious family suite with two bedrooms and connecting living area.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 95,
    floor: 5
  }
];

const roomTypes = ['All Types', 'Standard Room', 'Superior Room', 'Executive Room', 'Deluxe Suite', 'Family Suite', 'Presidential Suite'];
const statusOptions = ['All Status', 'available', 'occupied', 'maintenance'];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [_loading, _setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'Standard Room',
    price: '',
    capacity: 2,
    description: '',
    status: 'available',
    size: '',
    floor: 1,
    amenities: [],
    image: ''
  });

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);

  useEffect(() => {
    filterRooms();
  }, [searchQuery, selectedType, selectedStatus, priceRange, rooms]);

  const filterRooms = () => {
    let filtered = [...rooms];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(room => room.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(room => room.status === selectedStatus);
    }

    // Price range filter
    filtered = filtered.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      type: 'Standard Room',
      price: '',
      capacity: 2,
      description: '',
      status: 'available',
      size: '',
      floor: 1,
      amenities: [],
      image: ''
    });
    setShowForm(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      description: room.description,
      status: room.status,
      size: room.size,
      floor: room.floor,
      amenities: room.amenities || [],
      image: room.image
    });
    setShowForm(true);
  };

  const handleDeleteRoom = (room) => {
    setDeletingRoom(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingRoom) {
      setRooms(rooms.filter(room => room.id !== deletingRoom.id));
      setShowDeleteModal(false);
      setDeletingRoom(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editingRoom) {
      // Update existing room
      setRooms(rooms.map(room => 
        room.id === editingRoom.id 
          ? { ...room, ...formData }
          : room
      ));
    } else {
      // Add new room
      const newRoom = {
        ...formData,
        id: Date.now(), // Simple ID generation
        price: parseFloat(formData.price),
        size: parseFloat(formData.size)
      };
      setRooms([...rooms, newRoom]);
    }
    
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'amenities') {
        const amenity = value;
        setFormData(prev => ({
          ...prev,
          amenities: checked 
            ? [...prev.amenities, amenity]
            : prev.amenities.filter(a => a !== amenity)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'success', icon: <FaCheckCircle />, label: 'Available' },
      occupied: { color: 'warning', icon: <FaTimesCircle />, label: 'Occupied' },
      maintenance: { color: 'error', icon: <FaTimesCircle />, label: 'Maintenance' }
    };

    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`status-badge ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <FaWifi />,
      tv: <FaTv />,
      ac: <FaSnowflake />,
      minibar: <FaCoffee />
    };
    return icons[amenity] || <FaCheckCircle />;
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="admin-rooms loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-rooms">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-title">
          <h1>Manage Rooms</h1>
          <p>Manage your hotel's room inventory and pricing</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="add-room-btn primary"
            onClick={handleAddRoom}
          >
            <FaPlus />
            Add New Room
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by room name or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            Filters
          </button>

          <div className="view-toggle">
            <button 
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button 
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Room Type</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <span className="price-display">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          </div>

          <div className="filter-actions">
            <button 
              className="clear-filters"
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All Types');
                setSelectedStatus('All Status');
                setPriceRange([0, 1000]);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        <span>Showing {currentRooms.length} of {filteredRooms.length} rooms</span>
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
              {currentRooms.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-results">
                    <div className="no-results-content">
                      <FaBed className="no-results-icon" />
                      <h3>No rooms found</h3>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentRooms.map(room => (
                  <tr key={room.id} className="room-row">
                    <td className="room-info">
                      <div className="room-thumbnail">
                        <img src={room.image} alt={room.name} />
                      </div>
                      <div className="room-details">
                        <h4>{room.name}</h4>
                        <span className="room-size">{room.size} m²</span>
                      </div>
                    </td>
                    <td className="room-type">{room.type}</td>
                    <td className="room-price">
                      <span className="price">${room.price}</span>
                      <span className="price-label">per night</span>
                    </td>
                    <td className="room-capacity">
                      <FaUsers />
                      {room.capacity} guests
                    </td>
                    <td className="room-status">
                      {getStatusBadge(room.status)}
                    </td>
                    <td className="room-actions">
                      <button 
                        className="action-btn view"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit"
                        onClick={() => handleEditRoom(room)}
                        title="Edit Room"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteRoom(room)}
                        title="Delete Room"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rooms-cards-container">
          {currentRooms.length === 0 ? (
            <div className="no-results-card">
              <FaBed className="no-results-icon" />
              <h3>No rooms found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="rooms-grid">
              {currentRooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-image">
                    <img src={room.image} alt={room.name} />
                    <div className="room-status-overlay">
                      {getStatusBadge(room.status)}
                    </div>
                  </div>
                  
                  <div className="room-content">
                    <div className="room-header">
                      <h3>{room.name}</h3>
                      <span className="room-type">{room.type}</span>
                    </div>
                    
                    <div className="room-meta">
                      <div className="meta-item">
                        <FaDollarSign />
                        <span>${room.price}/night</span>
                      </div>
                      <div className="meta-item">
                        <FaUsers />
                        <span>{room.capacity} guests</span>
                      </div>
                      <div className="meta-item">
                        <FaBed />
                        <span>{room.size} m²</span>
                      </div>
                    </div>

                    <div className="room-amenities">
                      {room.amenities.map(amenity => (
                        <span key={amenity} className="amenity">
                          {getAmenityIcon(amenity)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="room-actions">
                    <button 
                      className="action-btn view"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditRoom(room)}
                      title="Edit Room"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteRoom(room)}
                      title="Delete Room"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn prev"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className="page-btn next"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Add/Edit Room Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="room-form-modal">
            <div className="modal-header">
              <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="room-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Room Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Royal Suite 101"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Room Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    {roomTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price per Night ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="capacity">Capacity (guests)</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="size">Room Size (m²)</label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="floor">Floor</label>
                  <input
                    type="number"
                    id="floor"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the room features and amenities..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amenities</label>
                <div className="amenities-checkboxes">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="amenities"
                      value="wifi"
                      checked={formData.amenities.includes('wifi')}
                      onChange={handleInputChange}
                    />
                    <FaWifi /> WiFi
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="amenities"
                      value="tv"
                      checked={formData.amenities.includes('tv')}
                      onChange={handleInputChange}
                    />
                    <FaTv /> TV
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="amenities"
                      value="ac"
                      checked={formData.amenities.includes('ac')}
                      onChange={handleInputChange}
                    />
                    <FaSnowflake /> Air Conditioning
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="amenities"
                      value="minibar"
                      checked={formData.amenities.includes('minibar')}
                      onChange={handleInputChange}
                    />
                    <FaCoffee /> Mini Bar
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Room Image URL</label>
                <div className="image-input-container">
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/room-image.jpg"
                  />
                  <button type="button" className="upload-btn">
                    <FaUpload />
                    Upload
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">
              <FaTrash />
            </div>
            <h3>Delete Room</h3>
            <p>
              Are you sure you want to delete <strong>{deletingRoom?.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="delete-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={confirmDelete}
              >
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