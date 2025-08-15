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
  FaSnowflake,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaCheck,
  FaStar,
  FaInfo,
  FaPencilAlt,
  FaTrashAlt,
  FaExternalLinkAlt
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
  },
  {
    id: 7,
    name: 'Business Suite 202',
    type: 'Business Suite',
    price: 520,
    status: 'available',
    capacity: 2,
    description: 'Professional business suite with workspace and meeting area.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 55,
    floor: 2
  },
  {
    id: 8,
    name: 'Luxury Room 305',
    type: 'Luxury Room',
    price: 750,
    status: 'maintenance',
    capacity: 2,
    description: 'Premium luxury room with high-end finishes and exclusive amenities.',
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 60,
    floor: 3
  },
  {
    id: 9,
    name: 'Standard Plus 103',
    type: 'Standard Room',
    price: 320,
    status: 'available',
    capacity: 2,
    description: 'Enhanced standard room with upgraded amenities and modern decor.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac'],
    size: 38,
    floor: 1
  },
  {
    id: 10,
    name: 'Penthouse 601',
    type: 'Presidential Suite',
    price: 1200,
    status: 'available',
    capacity: 8,
    description: 'Exclusive penthouse suite with private terrace and panoramic views.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    amenities: ['wifi', 'tv', 'ac', 'minibar'],
    size: 180,
    floor: 6
  }
];

const roomTypes = ['All Types', 'Standard Room', 'Superior Room', 'Executive Room', 'Deluxe Suite', 'Family Suite', 'Presidential Suite'];
const statusOptions = ['All Status', 'available', 'occupied', 'maintenance'];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  // Table sorting state
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [viewingRoom, setViewingRoom] = useState(null);
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

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (sortField === 'price' || sortField === 'capacity') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, selectedType, selectedStatus, priceRange, rooms, sortField, sortDirection]);

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

  // Sorting functions
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Row selection functions
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRooms.map(room => room.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (roomId) => {
    if (selectedRows.includes(roomId)) {
      setSelectedRows(selectedRows.filter(id => id !== roomId));
    } else {
      setSelectedRows([...selectedRows, roomId]);
    }
  };

  // Bulk actions
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} rooms?`)) {
      setRooms(rooms.filter(room => !selectedRows.includes(room.id)));
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedRows.length === 0) return;
    
    setRooms(rooms.map(room => 
      selectedRows.includes(room.id) 
        ? { ...room, status: newStatus }
        : room
    ));
    setSelectedRows([]);
    setSelectAll(false);
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

  const handleViewRoom = (room) => {
    setViewingRoom(room);
    setShowViewModal(true);
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

  // Remove unused loading state check since we're using mock data
  // if (_loading) {
  //   return (
  //     <div className="admin-rooms loading">
  //       <div className="loading-spinner">
  //         <div className="spinner"></div>
  //         <p>Loading rooms...</p>
  //       </div>
  //     </div>
  //   );
  // }

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
          {/* Bulk Actions Bar */}
          {selectedRows.length > 0 && (
            <div className="bulk-actions-bar">
              <div className="bulk-info">
                <FaCheck />
                <span>{selectedRows.length} room{selectedRows.length > 1 ? 's' : ''} selected</span>
              </div>
              <div className="bulk-actions">
                <button 
                  className="bulk-btn status available"
                  onClick={() => handleBulkStatusChange('available')}
                  title="Mark as Available"
                >
                  <FaCheckCircle /> Available
                </button>
                <button 
                  className="bulk-btn status maintenance"
                  onClick={() => handleBulkStatusChange('maintenance')}
                  title="Mark as Maintenance"
                >
                  <FaTimesCircle /> Maintenance
                </button>
                <button 
                  className="bulk-btn delete"
                  onClick={handleBulkDelete}
                  title="Delete Selected"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          )}

          <table className="rooms-table enhanced">
            <thead>
              <tr>
                <th className="select-column">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th className="sortable" onClick={() => handleSort('name')}>
                  <div className="header-content">
                    <span>Room</span>
                    <span className="sort-icon">{getSortIcon('name')}</span>
                  </div>
                </th>
                <th className="sortable" onClick={() => handleSort('type')}>
                  <div className="header-content">
                    <span>Type</span>
                    <span className="sort-icon">{getSortIcon('type')}</span>
                  </div>
                </th>
                <th className="sortable" onClick={() => handleSort('price')}>
                  <div className="header-content">
                    <span>Price/Night</span>
                    <span className="sort-icon">{getSortIcon('price')}</span>
                  </div>
                </th>
                <th className="sortable" onClick={() => handleSort('capacity')}>
                  <div className="header-content">
                    <span>Capacity</span>
                    <span className="sort-icon">{getSortIcon('capacity')}</span>
                  </div>
                </th>
                <th className="sortable" onClick={() => handleSort('status')}>
                  <div className="header-content">
                    <span>Status</span>
                    <span className="sort-icon">{getSortIcon('status')}</span>
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <span>Rating</span>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">
                    <div className="no-results-content">
                      <FaBed className="no-results-icon" />
                      <h3>No rooms found</h3>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentRooms.map((room, index) => (
                  <tr 
                    key={room.id} 
                    className={`room-row ${selectedRows.includes(room.id) ? 'selected' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`}
                  >
                    <td className="select-column">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(room.id)}
                          onChange={() => handleSelectRow(room.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td className="room-info">
                      <div className="room-thumbnail">
                        <img src={room.image} alt={room.name} />
                        <div className="room-number">#{room.id}</div>
                      </div>
                      <div className="room-details">
                        <h4>{room.name}</h4>
                        <span className="room-size">{room.size} m² • Floor {room.floor}</span>
                      </div>
                    </td>
                    <td className="room-type">
                      <span className="type-badge">{room.type}</span>
                    </td>
                    <td className="room-price">
                      <div className="price-container">
                        <span className="price">${room.price}</span>
                        <span className="price-label">per night</span>
                      </div>
                    </td>
                    <td className="room-capacity">
                      <div className="capacity-info">
                        <FaUsers />
                        <span>{room.capacity} guests</span>
                      </div>
                    </td>
                    <td className="room-status">
                      {getStatusBadge(room.status)}
                    </td>
                    <td className="room-rating">
                      <div className="rating-display">
                        <span className="rating-number">4.{Math.floor(Math.random() * 5) + 5}</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="star filled" />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="room-actions">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view"
                          onClick={() => handleViewRoom(room)}
                          title="View Room Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditRoom(room)}
                          title="Edit Room"
                        >
                          <FaPencilAlt />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteRoom(room)}
                          title="Delete Room"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
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
                      onClick={() => handleViewRoom(room)}
                      title="View Room Details"
                    >
                      <FaEye />
                      <span className="btn-text">View</span>
                    </button>
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditRoom(room)}
                      title="Edit Room"
                    >
                      <FaPencilAlt />
                      <span className="btn-text">Edit</span>
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteRoom(room)}
                      title="Delete Room"
                    >
                      <FaTrashAlt />
                      <span className="btn-text">Delete</span>
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

      {/* View Room Details Modal */}
      {showViewModal && viewingRoom && (
        <div className="modal-overlay">
          <div className="room-details-modal">
            <div className="modal-header">
              <h2>
                <FaInfo />
                Room Details
              </h2>
              <button 
                className="close-modal"
                onClick={() => setShowViewModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="room-details-content">
              <div className="room-image-section">
                <img src={viewingRoom.image} alt={viewingRoom.name} />
                <div className="room-status-overlay">
                  {getStatusBadge(viewingRoom.status)}
                </div>
              </div>

              <div className="room-info-grid">
                <div className="info-card">
                  <h3>
                    <FaBed />
                    Basic Information
                  </h3>
                  <div className="info-details">
                    <div className="info-row">
                      <span className="label">Room Name:</span>
                      <span className="value">{viewingRoom.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Room Type:</span>
                      <span className="value type-badge">{viewingRoom.type}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Floor:</span>
                      <span className="value">Floor {viewingRoom.floor}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Size:</span>
                      <span className="value">{viewingRoom.size} m²</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3>
                    <FaDollarSign />
                    Pricing & Capacity
                  </h3>
                  <div className="info-details">
                    <div className="info-row">
                      <span className="label">Price per Night:</span>
                      <span className="value price">${viewingRoom.price}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Maximum Capacity:</span>
                      <span className="value">
                        <FaUsers /> {viewingRoom.capacity} guests
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Current Status:</span>
                      <span className="value">{getStatusBadge(viewingRoom.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card amenities-card">
                  <h3>
                    <FaStar />
                    Amenities
                  </h3>
                  <div className="amenities-grid">
                    {viewingRoom.amenities.map(amenity => (
                      <div key={amenity} className="amenity-item">
                        {getAmenityIcon(amenity)}
                        <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-card description-card">
                  <h3>
                    <FaInfo />
                    Description
                  </h3>
                  <p className="description-text">{viewingRoom.description}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn edit primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditRoom(viewingRoom);
                  }}
                >
                  <FaPencilAlt />
                  Edit Room
                </button>
                <button 
                  className="action-btn view secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  <FaTimes />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
