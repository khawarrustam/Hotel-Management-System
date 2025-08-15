import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  // Sample data for featured rooms
  const featuredRooms = [
    {
      id: 1,
      name: "Presidential Suite",
      price: 899,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      amenities: ["Ocean View", "King Bed", "Balcony", "Spa Access"]
    },
    {
      id: 2,
      name: "Deluxe Ocean Room",
      price: 499,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      amenities: ["Sea View", "Queen Bed", "Mini Bar", "WiFi"]
    },
    {
      id: 3,
      name: "Garden Villa",
      price: 699,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
      amenities: ["Garden View", "King Bed", "Private Pool", "Terrace"]
    },
    {
      id: 4,
      name: "Executive Suite",
      price: 799,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      amenities: ["City View", "King Bed", "Work Area", "Lounge Access"]
    }
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely stunning hotel! The service was impeccable and the rooms were luxurious. Can't wait to return!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Perfect location with breathtaking views. The staff went above and beyond to make our stay memorable.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      text: "The attention to detail is incredible. From the moment we arrived, we felt like royalty. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Why choose us features
  const features = [
    {
      icon: "🏆",
      title: "Award-Winning Service",
      description: "Recognized globally for our exceptional hospitality and attention to detail."
    },
    {
      icon: "🌟",
      title: "Luxury Amenities",
      description: "World-class facilities including spa, fine dining, and exclusive lounges."
    },
    {
      icon: "📍",
      title: "Prime Location",
      description: "Located in the heart of the city with easy access to major attractions."
    },
    {
      icon: "🔒",
      title: "Safe & Secure",
      description: "24/7 security and safety protocols ensuring peace of mind during your stay."
    }
  ];

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/src/images/logo.svg" alt="Hotel Logo" className="logo-img" />
            <span className="logo-text">Luxury Resort</span>
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/rooms" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Rooms
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Reviews
            </Link>
            <Link to="/auth" className="nav-link nav-auth" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </div>

          <div className="nav-hamburger" onClick={toggleMenu}>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop" 
            alt="Luxury Hotel"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Experience <span className="highlight">Luxury</span> Like Never Before
          </h1>
          <p className="hero-subtitle">
            Indulge in world-class amenities, breathtaking views, and unparalleled service 
            at our award-winning resort destination.
          </p>
          <div className="hero-buttons">
            <Link to="/rooms" className="btn btn-primary">
              Book Now
            </Link>
            <Link to="/rooms" className="btn btn-outline">
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="featured-rooms">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Featured Rooms</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="rooms-grid">
            {featuredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-image-container">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="room-image"
                  />
                </div>
                <div className="room-content">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-price">
                    <span className="price-amount">${room.price}</span>
                    <span className="price-period">/night</span>
                  </p>
                  <div className="room-amenities">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Link to={`/rooms/${room.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              Discover what makes our hotel the perfect choice for your next getaway
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <span className="icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          
          <div className="reviews-carousel">
            <div className="review-container">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`review-card ${index === currentReview ? 'active' : ''}`}
                >
                  <div className="review-content">
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <div className="review-author">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="author-avatar"
                      />
                      <span className="author-name">{review.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="carousel-indicators">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentReview ? 'active' : ''}`}
                  onClick={() => setCurrentReview(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready for your next stay?</h2>
            <p className="cta-subtitle">Book now and experience luxury at its finest</p>
            <Link to="/rooms" className="btn btn-gold">
              Book Your Room
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Luxury Resort</h3>
              <p className="footer-description">
                Experience the epitome of luxury and comfort at our world-class resort.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-subtitle">Contact Info</h4>
              <div className="contact-info">
                <p>📍 123 Resort Boulevard, Paradise City</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ info@luxuryresort.com</p>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-subtitle">Services</h4>
              <ul className="footer-links">
                <li><a href="#">Spa & Wellness</a></li>
                <li><a href="#">Fine Dining</a></li>
                <li><a href="#">Event Planning</a></li>
                <li><a href="#">Concierge</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Luxury Resort. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
