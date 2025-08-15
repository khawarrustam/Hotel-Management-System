import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './RoomDetails.scss';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "Absolutely stunning room with incredible views. The service was impeccable and every detail was perfect. Will definitely stay here again!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      comment: "The Presidential Suite exceeded all expectations. The amenities were top-notch and the staff went above and beyond to make our stay memorable.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 4,
      comment: "Beautiful room with luxurious amenities. The spa access was a wonderful touch. Only minor issue was the check-in process took a bit longer than expected.",
      date: "2 weeks ago"
    }
  ];

  const relatedRooms = [
    {
      id: 2,
      name: "Executive Suite",
      price: 399,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Deluxe Room",
      price: 299,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Royal Villa",
      price: 799,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Mock room data - replace with API call
    const mockRoom = {
      id: parseInt(id),
      name: "Presidential Suite",
      subtitle: "Experience unmatched comfort & luxury",
      price: 599,
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop"
      ],
      description: "Indulge in the ultimate luxury experience with our Presidential Suite. This magnificent accommodation features a spacious living area, separate bedroom, marble bathroom with jacuzzi, and a private balcony overlooking the city skyline. Every detail has been carefully curated to provide an unforgettable stay.",
      amenities: [
        { icon: "🏊‍♂️", name: "Pool Access", description: "Private pool access" },
        { icon: "🍳", name: "Breakfast", description: "Complimentary breakfast" },
        { icon: "📶", name: "Free Wi-Fi", description: "High-speed internet" },
        { icon: "📺", name: "Smart TV", description: "75\" 4K Smart TV" },
        { icon: "❄️", name: "Air Conditioning", description: "Climate control" },
        { icon: "🚗", name: "Parking", description: "Valet parking included" },
        { icon: "🛎️", name: "Room Service", description: "24/7 room service" },
        { icon: "🧖‍♀️", name: "Spa Access", description: "Complimentary spa" },
        { icon: "🥂", name: "Mini Bar", description: "Premium minibar" },
        { icon: "👔", name: "Concierge", description: "Personal concierge" },
        { icon: "🏋️‍♂️", name: "Gym Access", description: "Fitness center" },
        { icon: "☕", name: "Coffee Machine", description: "Nespresso machine" }
      ],
      rating: 4.9,
      reviewCount: 127,
      available: true
    };

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setRoom(mockRoom);
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff > 0) {
        setNights(daysDiff);
        setTotalPrice(daysDiff * room.price);
      }
    }
  }, [checkIn, checkOut, room]);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    // Navigate to booking page with details
    navigate('/booking', {
      state: {
        room,
        checkIn,
        checkOut,
        adults,
        children,
        nights,
        totalPrice
      }
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star empty">★</span>
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="room-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-details-error">
        <h2>Room not found</h2>
        <Link to="/rooms" className="btn btn-primary">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <div className="room-details">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/rooms" className="breadcrumb-link">Rooms</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{room.name}</span>
        </nav>
      </div>

      {/* Page Title */}
      <div className="page-header">
        <h1 className="page-title">{room.name}</h1>
        <p className="page-subtitle">{room.subtitle}</p>
        <div className="room-rating">
          <div className="stars">
            {renderStars(room.rating)}
          </div>
          <span className="rating-text">
            {room.rating} ({room.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="room-content">
        {/* Left Side - Images and Details */}
        <div className="room-main">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img 
                src={room.images[selectedImage]} 
                alt={room.name}
                className="main-room-img"
              />
            </div>
            <div className="image-thumbnails">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="room-info">
            <div className="room-header">
              <h2 className="room-title">{room.name}</h2>
              <div className="room-price">
                <span className="price">${room.price}</span>
                <span className="price-unit">/ night</span>
              </div>
            </div>

            <div className="room-description">
              <p>{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h3>Room Amenities</h3>
              <div className="amenities-grid">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <div className="amenity-content">
                      <span className="amenity-name">{amenity.name}</span>
                      <span className="amenity-description">{amenity.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Widget */}
        <div className="booking-widget-container">
          <div className="booking-widget">
            <div className="widget-header">
              <h3>Book Your Stay</h3>
              <div className="widget-price">
                <span className="price">${room.price}</span>
                <span className="price-unit">/ night</span>
              </div>
            </div>

            <div className="booking-form">
              <div className="date-inputs">
                <div className="input-group">
                  <label htmlFor="checkin">Check-in</label>
                  <input
                    type="date"
                    id="checkin"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="checkout">Check-out</label>
                  <input
                    type="date"
                    id="checkout"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="guest-inputs">
                <div className="input-group">
                  <label htmlFor="adults">Adults</label>
                  <select
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="children">Children</label>
                  <select
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="price-summary">
                  <div className="summary-row">
                    <span>${room.price} × {nights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span className="total-price">${totalPrice}</span>
                  </div>
                </div>
              )}

              <div className="booking-actions">
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={() => alert('Checking availability...')}
                >
                  Check Availability
                </button>
                <button 
                  className="btn btn-primary btn-block"
                  onClick={handleBooking}
                  disabled={!room.available}
                >
                  {room.available ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="section-title">Guest Reviews</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="reviewer-avatar"
                />
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{review.name}</h4>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Rooms */}
      <div className="related-rooms-section">
        <h2 className="section-title">You May Also Like</h2>
        <div className="related-rooms-grid">
          {relatedRooms.map(relatedRoom => (
            <Link 
              key={relatedRoom.id}
              to={`/rooms/${relatedRoom.id}`}
              className="related-room-card"
            >
              <img 
                src={relatedRoom.image} 
                alt={relatedRoom.name}
                className="related-room-image"
              />
              <div className="related-room-info">
                <h4 className="related-room-name">{relatedRoom.name}</h4>
                <p className="related-room-price">
                  <span className="price">${relatedRoom.price}</span>
                  <span className="price-unit">/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
