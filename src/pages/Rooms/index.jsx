import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRooms } from '../../hooks/useRooms';
import { usePagination } from '../../hooks/usePagination';
import { useDebounce } from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateForInput } from '../../utils/dateMath';
import './Rooms.scss';

// Mock room data for demonstration
const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    type: 'Double',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'spa'],
    capacity: { adults: 2, children: 1 },
    description: 'Spacious room with stunning ocean views and premium amenities.'
  },
  {
    id: 2,
    name: 'Presidential Suite',
    type: 'Suite',
    price: 799,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'spa', 'balcony', 'minibar'],
    capacity: { adults: 4, children: 2 },
    description: 'Ultimate luxury suite with panoramic views and exclusive services.'
  },
  {
    id: 3,
    name: 'Classic Single',
    type: 'Single',
    price: 149,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast'],
    capacity: { adults: 1, children: 0 },
    description: 'Comfortable single room perfect for business travelers.'
  },
  {
    id: 4,
    name: 'Family Paradise',
    type: 'Double',
    price: 399,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'pool', 'playground'],
    capacity: { adults: 2, children: 3 },
    description: 'Spacious family room with connecting children\'s area.'
  },
  {
    id: 5,
    name: 'Business Executive',
    type: 'Single',
    price: 229,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'workdesk', 'minibar'],
    capacity: { adults: 1, children: 0 },
    description: 'Modern business room with premium work facilities.'
  },
  {
    id: 6,
    name: 'Romantic Getaway',
    type: 'Double',
    price: 349,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop',
    amenities: ['wifi', 'breakfast', 'spa', 'balcony', 'minibar'],
    capacity: { adults: 2, children: 0 },
    description: 'Intimate room designed for couples with romantic ambiance.'
  }
];

const Rooms = () => {
  const [filters, setFilters] = useState({
    roomType: '',
    adults: 1,
    children: 0,
    priceRange: [0, 1000],
    checkIn: '',
    checkOut: '',
  });
  
  const [sortBy, setSortBy] = useState('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedFilters = useDebounce(filters, 300);
  const { loading, error } = useRooms();
  const { currentPage, paginate, goToPage, getPaginationInfo } = usePagination(1, 12);

  const [filteredRooms, setFilteredRooms] = useState(mockRooms);

  // Filter and sort rooms
  useEffect(() => {
    let filtered = [...mockRooms];

    // Apply filters
    if (debouncedFilters.roomType) {
      filtered = filtered.filter(room => room.type === debouncedFilters.roomType);
    }

    filtered = filtered.filter(room => 
      room.capacity.adults >= debouncedFilters.adults &&
      room.capacity.adults + room.capacity.children >= debouncedFilters.adults + debouncedFilters.children
    );

    filtered = filtered.filter(room => 
      room.price >= debouncedFilters.priceRange[0] && 
      room.price <= debouncedFilters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredRooms(filtered);
  }, [debouncedFilters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      roomType: '',
      adults: 1,
      children: 0,
      priceRange: [0, 1000],
      checkIn: '',
      checkOut: '',
    });
  };

  const paginatedRooms = paginate(filteredRooms);
  const paginationInfo = getPaginationInfo(filteredRooms.length);

  const amenityIcons = {
    wifi: '📶',
    breakfast: '🍳',
    pool: '🏊',
    spa: '💆',
    balcony: '🌅',
    minibar: '🍷',
    workdesk: '💼',
    playground: '🎪'
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <span key={i} className="star empty">☆</span>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="rooms-page">
      {/* Hero Section */}
      <section className="rooms-hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=600&fit=crop" 
            alt="Luxury Hotel Room" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Our Rooms</h1>
          <p className="hero-subtitle">Find the perfect stay for your visit</p>
        </div>
      </section>

      <div className="rooms-container">
        {/* Filter & Sort Bar */}
        <section className="filters-section">
          <div className="filters-header">
            <h2 className="section-title">
              {filteredRooms.length} Room{filteredRooms.length !== 1 ? 's' : ''} Available
            </h2>
            <div className="filters-controls">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filters</span>
                <span className="filter-icon">⚙️</span>
              </button>
              <div className="sort-control">
                <label htmlFor="sort">Sort by:</label>
                <select 
                  id="sort"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`filters-panel ${showFilters ? 'expanded' : ''}`}>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="roomType">Room Type</label>
                <select 
                  id="roomType"
                  value={filters.roomType} 
                  onChange={(e) => handleFilterChange('roomType', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="adults">Adults</label>
                <select 
                  id="adults"
                  value={filters.adults} 
                  onChange={(e) => handleFilterChange('adults', parseInt(e.target.value))}
                  className="filter-select"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="children">Children</label>
                <select 
                  id="children"
                  value={filters.children} 
                  onChange={(e) => handleFilterChange('children', parseInt(e.target.value))}
                  className="filter-select"
                >
                  {[0, 1, 2, 3].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="checkIn">Check-in</label>
                <input 
                  type="date" 
                  id="checkIn"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                  min={formatDateForInput(new Date())}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="checkOut">Check-out</label>
                <input 
                  type="date" 
                  id="checkOut"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                  min={filters.checkIn || formatDateForInput(new Date())}
                  className="filter-input"
                />
              </div>

              <div className="filter-group price-range">
                <label htmlFor="priceRange">
                  Price Range: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
                </label>
                <div className="range-inputs">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                    className="range-slider"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="range-slider"
                  />
                </div>
              </div>
            </div>

            <div className="filters-actions">
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="rooms-grid-section">
          {paginatedRooms.length > 0 ? (
            <>
              <div className="rooms-grid">
                {paginatedRooms.map(room => (
                  <div key={room.id} className="room-card">
                    <div className="room-image-container">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="room-image"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <Link to={`/rooms/${room.id}`} className="view-details-overlay">
                          View Details
                        </Link>
                      </div>
                    </div>
                    
                    <div className="room-content">
                      <div className="room-header">
                        <h3 className="room-name">{room.name}</h3>
                        {renderStars(room.rating)}
                      </div>
                      
                      <p className="room-description">{room.description}</p>
                      
                      <div className="room-amenities">
                        {room.amenities.slice(0, 4).map(amenity => (
                          <span key={amenity} className="amenity" title={amenity}>
                            {amenityIcons[amenity] || '✨'}
                          </span>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="amenity-more">+{room.amenities.length - 4}</span>
                        )}
                      </div>
                      
                      <div className="room-capacity">
                        <span>👥 {room.capacity.adults} adults</span>
                        {room.capacity.children > 0 && (
                          <span>👶 {room.capacity.children} children</span>
                        )}
                      </div>
                      
                      <div className="room-footer">
                        <div className="room-price">
                          <span className="price">{formatCurrency(room.price)}</span>
                          <span className="price-period">/night</span>
                        </div>
                        <Link to={`/rooms/${room.id}`} className="view-details-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {paginationInfo.totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={!paginationInfo.hasPreviousPage}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!paginationInfo.hasNextPage}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="empty-state">
              <div className="empty-icon">🏨</div>
              <h3 className="empty-title">No rooms available</h3>
              <p className="empty-description">
                No rooms match your current selection. Try adjusting your filters.
              </p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Rooms;
