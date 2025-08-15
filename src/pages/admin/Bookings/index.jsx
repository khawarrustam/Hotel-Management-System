import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaEye, FaSearch, FaFilter, FaTimes, FaCalendarAlt, FaUser, FaBed, FaCreditCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSort, FaSortUp, FaSortDown, FaDownload, FaCheck, FaClock, FaBan } from 'react-icons/fa';
import './AdminBookings.scss';

const AdminBookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      guestName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      roomName: 'Ocean View Suite',
      roomType: 'Deluxe Suite',
      roomImage: '/src/images/room-1.jpeg',
      checkIn: '2025-08-20',
      checkOut: '2025-08-25',
      totalNights: 5,
      totalPrice: '$2,500',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      bookingDate: '2025-08-10',
      adults: 2,
      children: 1,
      specialRequests: 'Late check-in requested'
    },
    {
      id: 'BK002',
      guestName: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      roomName: 'Presidential Suite',
      roomType: 'Presidential',
      roomImage: '/src/images/room-2.jpeg',
      checkIn: '2025-08-22',
      checkOut: '2025-08-27',
      totalNights: 5,
      totalPrice: '$4,500',
      status: 'Pending',
      paymentStatus: 'Pending',
      bookingDate: '2025-08-12',
      adults: 2,
      children: 0,
      specialRequests: 'Airport transfer needed'
    },
    {
      id: 'BK003',
      guestName: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      roomName: 'Garden View Room',
      roomType: 'Standard',
      roomImage: '/src/images/room-3.jpeg',
      checkIn: '2025-08-18',
      checkOut: '2025-08-21',
      totalNights: 3,
      totalPrice: '$750',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      bookingDate: '2025-08-05',
      adults: 1,
      children: 0,
      specialRequests: 'Ground floor room preferred'
    },
    {
      id: 'BK004',
      guestName: 'David Thompson',
      email: 'david.thompson@email.com',
      phone: '+1 (555) 456-7890',
      roomName: 'Luxury Family Suite',
      roomType: 'Family Suite',
      roomImage: '/src/images/room-4.jpeg',
      checkIn: '2025-08-25',
      checkOut: '2025-08-30',
      totalNights: 5,
      totalPrice: '$3,250',
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      bookingDate: '2025-08-08',
      adults: 2,
      children: 2,
      specialRequests: 'Crib needed for infant'
    },
    {
      id: 'BK005',
      guestName: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 567-8901',
      roomName: 'Spa Wellness Suite',
      roomType: 'Spa Suite',
      roomImage: '/src/images/room-5.jpeg',
      checkIn: '2025-08-28',
      checkOut: '2025-09-02',
      totalNights: 5,
      totalPrice: '$3,750',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      bookingDate: '2025-08-15',
      adults: 2,
      children: 0,
      specialRequests: 'Spa package included'
    },
    {
      id: 'BK006',
      guestName: 'Robert Smith',
      email: 'robert.smith@email.com',
      phone: '+1 (555) 678-9012',
      roomName: 'Business Executive',
      roomType: 'Executive',
      roomImage: '/src/images/room-6.jpeg',
      checkIn: '2025-08-19',
      checkOut: '2025-08-22',
      totalNights: 3,
      totalPrice: '$1,200',
      status: 'Pending',
      paymentStatus: 'Pending',
      bookingDate: '2025-08-14',
      adults: 1,
      children: 0,
      specialRequests: 'Business center access needed'
    },
    {
      id: 'BK007',
      guestName: 'Jennifer Martinez',
      email: 'jennifer.martinez@email.com',
      phone: '+1 (555) 789-0123',
      roomName: 'Romantic Honeymoon',
      roomType: 'Honeymoon Suite',
      roomImage: '/src/images/room-7.jpeg',
      checkIn: '2025-09-01',
      checkOut: '2025-09-05',
      totalNights: 4,
      totalPrice: '$2,800',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      bookingDate: '2025-08-11',
      adults: 2,
      children: 0,
      specialRequests: 'Honeymoon package with champagne'
    },
    {
      id: 'BK008',
      guestName: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 890-1234',
      roomName: 'Penthouse Luxury',
      roomType: 'Penthouse',
      roomImage: '/src/images/room-8.jpeg',
      checkIn: '2025-09-05',
      checkOut: '2025-09-10',
      totalNights: 5,
      totalPrice: '$6,250',
      status: 'Pending',
      paymentStatus: 'Partial',
      bookingDate: '2025-08-16',
      adults: 3,
      children: 1,
      specialRequests: 'VIP airport transfer required'
    }
  ]);

  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState({ checkIn: '', checkOut: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'bookingDate', direction: 'desc' });

  // Form state for editing
  const [editForm, setEditForm] = useState({
    status: '',
    checkIn: '',
    checkOut: '',
    paymentStatus: ''
  });

  const statuses = ['All', 'Confirmed', 'Pending', 'Cancelled'];
  const paymentStatuses = ['Pending', 'Paid', 'Partial', 'Refunded'];

  // Filter and search functionality
  useEffect(() => {
    let filtered = bookings.filter(booking => {
      const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.roomName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter.checkIn) {
        matchesDate = matchesDate && new Date(booking.checkIn) >= new Date(dateFilter.checkIn);
      }
      if (dateFilter.checkOut) {
        matchesDate = matchesDate && new Date(booking.checkOut) <= new Date(dateFilter.checkOut);
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'checkIn' || sortConfig.key === 'checkOut' || sortConfig.key === 'bookingDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig.key === 'totalPrice') {
          aValue = parseFloat(aValue.replace(/[$,]/g, ''));
          bValue = parseFloat(bValue.replace(/[$,]/g, ''));
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [bookings, searchTerm, statusFilter, dateFilter, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="sort-icon active" />
      : <FaSortDown className="sort-icon active" />;
  };

  // Modal functions
  const openViewModal = (booking) => {
    setModalMode('view');
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const openEditModal = (booking) => {
    setModalMode('edit');
    setSelectedBooking(booking);
    setEditForm({
      status: booking.status,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      paymentStatus: booking.paymentStatus
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setEditForm({
      status: '',
      checkIn: '',
      checkOut: '',
      paymentStatus: ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    // Calculate new total nights if dates changed
    const checkInDate = new Date(editForm.checkIn);
    const checkOutDate = new Date(editForm.checkOut);
    const totalNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    setBookings(prev => prev.map(booking => 
      booking.id === selectedBooking.id 
        ? { 
            ...booking, 
            ...editForm,
            totalNights: totalNights > 0 ? totalNights : booking.totalNights
          } 
        : booking
    ));
    
    closeModal();
  };

  const openDeleteModal = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  const handleDelete = () => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingToDelete.id));
    closeDeleteModal();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFilter({ checkIn: '', checkOut: '' });
    setSortConfig({ key: 'bookingDate', direction: 'desc' });
  };

  // Export functionality
  const exportToCSV = () => {
    const headers = ['Booking ID', 'Guest Name', 'Room', 'Check-in', 'Check-out', 'Nights', 'Total Price', 'Status', 'Payment Status'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(booking => [
        booking.id,
        `"${booking.guestName}"`,
        `"${booking.roomName}"`,
        booking.checkIn,
        booking.checkOut,
        booking.totalNights,
        booking.totalPrice,
        booking.status,
        booking.paymentStatus
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <FaCheck />;
      case 'Pending':
        return <FaClock />;
      case 'Cancelled':
        return <FaBan />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-bookings">
      {/* Header */}
      <div className="bookings-header">
        <div className="header-left">
          <h1 className="page-title">Manage Bookings</h1>
          <p className="page-subtitle">Oversee hotel reservations and guest bookings</p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{bookings.filter(b => b.status === 'Confirmed').length}</span>
              <span className="stat-label">Confirmed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{bookings.filter(b => b.status === 'Pending').length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="export-btn" onClick={exportToCSV}>
            <FaDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bookings-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by guest name or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filters-section">
          <button 
            className={`filters-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>Filters</span>
          </button>

          <div className={`filters-container ${showFilters ? 'show' : ''}`}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <div className="date-filters">
              <input
                type="date"
                value={dateFilter.checkIn}
                onChange={(e) => setDateFilter(prev => ({ ...prev, checkIn: e.target.value }))}
                className="date-input"
                placeholder="Check-in from"
              />
              <input
                type="date"
                value={dateFilter.checkOut}
                onChange={(e) => setDateFilter(prev => ({ ...prev, checkOut: e.target.value }))}
                className="date-input"
                placeholder="Check-out to"
              />
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table/Cards */}
      <div className="bookings-content">
        {/* Desktop Table View */}
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="sortable">
                  Booking ID {getSortIcon('id')}
                </th>
                <th onClick={() => handleSort('guestName')} className="sortable">
                  Guest {getSortIcon('guestName')}
                </th>
                <th onClick={() => handleSort('roomName')} className="sortable">
                  Room {getSortIcon('roomName')}
                </th>
                <th onClick={() => handleSort('checkIn')} className="sortable">
                  Check-in {getSortIcon('checkIn')}
                </th>
                <th onClick={() => handleSort('checkOut')} className="sortable">
                  Check-out {getSortIcon('checkOut')}
                </th>
                <th onClick={() => handleSort('totalPrice')} className="sortable">
                  Total {getSortIcon('totalPrice')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {getSortIcon('status')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr 
                  key={booking.id} 
                  className="booking-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="booking-id">
                    <span className="id-badge">{booking.id}</span>
                  </td>
                  <td className="guest-info">
                    <div className="guest-details">
                      <span className="guest-name">{booking.guestName}</span>
                      <span className="guest-contact">{booking.email}</span>
                    </div>
                  </td>
                  <td className="room-info">
                    <div className="room-details">
                      <span className="room-name">{booking.roomName}</span>
                      <span className="room-type">{booking.roomType}</span>
                    </div>
                  </td>
                  <td className="check-date">
                    <div className="date-info">
                      <FaCalendarAlt className="date-icon" />
                      <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="check-date">
                    <div className="date-info">
                      <FaCalendarAlt className="date-icon" />
                      <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="booking-price">
                    <span className="price-amount">{booking.totalPrice}</span>
                    <span className="nights-count">{booking.totalNights} nights</span>
                  </td>
                  <td className="booking-status">
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </td>
                  <td className="booking-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => openViewModal(booking)}
                        title="View Booking Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit"
                        onClick={() => openEditModal(booking)}
                        title="Edit Booking"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => openDeleteModal(booking)}
                        title="Delete Booking"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="bookings-cards">
          {currentBookings.map((booking, index) => (
            <div 
              key={booking.id} 
              className="booking-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <div className="booking-info">
                  <span className="booking-id">{booking.id}</span>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </span>
                </div>
                <span className="price-amount">{booking.totalPrice}</span>
              </div>
              
              <div className="card-body">
                <div className="guest-section">
                  <h3 className="guest-name">{booking.guestName}</h3>
                  <p className="guest-email">{booking.email}</p>
                </div>
                
                <div className="room-section">
                  <div className="room-info">
                    <FaBed className="room-icon" />
                    <div>
                      <span className="room-name">{booking.roomName}</span>
                      <span className="room-type">{booking.roomType}</span>
                    </div>
                  </div>
                </div>
                
                <div className="dates-section">
                  <div className="date-range">
                    <div className="date-item">
                      <FaCalendarAlt className="date-icon" />
                      <div>
                        <span className="date-label">Check-in</span>
                        <span className="date-value">{new Date(booking.checkIn).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="date-item">
                      <FaCalendarAlt className="date-icon" />
                      <div>
                        <span className="date-label">Check-out</span>
                        <span className="date-value">{new Date(booking.checkOut).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className="nights-count">{booking.totalNights} nights</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  className="action-btn view"
                  onClick={() => openViewModal(booking)}
                >
                  <FaEye />
                  <span>View</span>
                </button>
                <button 
                  className="action-btn edit"
                  onClick={() => openEditModal(booking)}
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => openDeleteModal(booking)}
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="empty-state">
            <FaCalendarAlt className="empty-icon" />
            <h3>No bookings found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} bookings
          </div>
          <div className="pagination-controls">
            <button 
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Booking Detail/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalMode === 'view' ? 'Booking Details' : 'Edit Booking'}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            {modalMode === 'view' ? (
              // View Mode
              <div className="booking-details-view">
                <div className="booking-header">
                  <div className="booking-id-section">
                    <h3>Booking #{selectedBooking?.id}</h3>
                    <span className={`status-badge large ${selectedBooking?.status.toLowerCase()}`}>
                      {getStatusIcon(selectedBooking?.status)}
                      {selectedBooking?.status}
                    </span>
                  </div>
                  <div className="booking-price-section">
                    <span className="total-price">{selectedBooking?.totalPrice}</span>
                    <span className="price-breakdown">{selectedBooking?.totalNights} nights</span>
                  </div>
                </div>

                <div className="details-grid">
                  <div className="detail-section">
                    <h4><FaUser /> Guest Information</h4>
                    <div className="detail-row">
                      <span className="label">Name:</span>
                      <span className="value">{selectedBooking?.guestName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span className="value">{selectedBooking?.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{selectedBooking?.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Adults:</span>
                      <span className="value">{selectedBooking?.adults}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Children:</span>
                      <span className="value">{selectedBooking?.children}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><FaBed /> Room Information</h4>
                    <div className="room-display">
                      <img 
                        src={selectedBooking?.roomImage} 
                        alt={selectedBooking?.roomName}
                        className="room-image"
                        onError={(e) => {
                          e.target.src = '/src/images/defaultBcg.jpeg';
                        }}
                      />
                      <div className="room-details">
                        <span className="room-name">{selectedBooking?.roomName}</span>
                        <span className="room-type">{selectedBooking?.roomType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><FaCalendarAlt /> Booking Details</h4>
                    <div className="detail-row">
                      <span className="label">Check-in:</span>
                      <span className="value">{new Date(selectedBooking?.checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Check-out:</span>
                      <span className="value">{new Date(selectedBooking?.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total Nights:</span>
                      <span className="value">{selectedBooking?.totalNights}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Booking Date:</span>
                      <span className="value">{new Date(selectedBooking?.bookingDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><FaCreditCard /> Payment Information</h4>
                    <div className="detail-row">
                      <span className="label">Payment Status:</span>
                      <span className={`payment-status ${selectedBooking?.paymentStatus.toLowerCase()}`}>
                        {selectedBooking?.paymentStatus}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total Amount:</span>
                      <span className="value">{selectedBooking?.totalPrice}</span>
                    </div>
                    {selectedBooking?.specialRequests && (
                      <div className="detail-row">
                        <span className="label">Special Requests:</span>
                        <span className="value">{selectedBooking?.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal(selectedBooking)}
                  >
                    <FaEdit />
                    Edit Booking
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleEditSubmit} className="booking-form">
                <div className="form-section">
                  <h4>Booking Status</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="paymentStatus">Payment Status</label>
                      <select
                        id="paymentStatus"
                        name="paymentStatus"
                        value={editForm.paymentStatus}
                        onChange={handleEditChange}
                        required
                      >
                        {paymentStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Booking Dates</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="checkIn">Check-in Date</label>
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={editForm.checkIn}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkOut">Check-out Date</label>
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={editForm.checkOut}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    <FaCheck />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeDeleteModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete booking <strong>{bookingToDelete?.id}</strong> for <strong>{bookingToDelete?.guestName}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
