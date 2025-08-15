import { useState, useEffect } from 'react';
import './Reviews.scss';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review: "Absolutely stunning hotel! The service was impeccable, the rooms were luxurious, and the staff went above and beyond to make our stay memorable. The spa was divine and the restaurant served the most delicious food. Would definitely stay here again!",
    date: "2024-08-10",
    stayDuration: "3 nights"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review: "Exceptional experience from start to finish. The concierge team helped us plan the perfect itinerary for our anniversary trip. The room had a breathtaking view of the city skyline. Every detail was perfect!",
    date: "2024-08-08",
    stayDuration: "2 nights"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 4,
    review: "Beautiful hotel with excellent amenities. The pool area was fantastic and the breakfast buffet had amazing variety. The only minor issue was the check-in process took a bit longer than expected, but overall a wonderful stay.",
    date: "2024-08-05",
    stayDuration: "4 nights"
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "d.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review: "This hotel exceeded all our expectations! The Presidential Suite was magnificent, and the personal butler service made us feel like royalty. The location is perfect for both business and leisure. Highly recommend!",
    date: "2024-08-03",
    stayDuration: "5 nights"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=80&h=80&fit=crop&crop=face",
    rating: 4,
    review: "Lovely stay at this luxury hotel. The spa treatments were incredibly relaxing and the staff was very attentive. The room was spacious and beautifully decorated. Would love to come back for a longer stay next time.",
    date: "2024-08-01",
    stayDuration: "2 nights"
  },
  {
    id: 6,
    name: "James Thompson",
    email: "j.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    review: "Outstanding hotel with world-class service. The business center was well-equipped for my meetings, and the rooftop bar provided the perfect setting for client entertainment. Every aspect of this hotel screams luxury and excellence.",
    date: "2024-07-30",
    stayDuration: "3 nights"
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new review to the list
      const newReview = {
        id: Date.now(),
        ...formData,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face`,
        date: new Date().toISOString().split('T')[0],
        stayDuration: "Recent stay"
      };
      
      setReviews(prev => [newReview, ...prev]);
      setSubmitMessage('Thank you! Your review has been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        rating: 0,
        review: ''
      });
      setShowForm(false);
    } catch (_error) {
      setSubmitMessage('Sorry, there was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, size = 'medium') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''} ${size}`}
          onClick={interactive ? () => handleRatingClick(i) : undefined}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Guest Reviews</h1>
          <p className="hero-subtitle">
            See what our guests say about their stay with us
          </p>
          {reviews.length > 0 && (
            <div className="hero-stats">
              <div className="rating-summary">
                <div className="stars-large">
                  {renderStars(Math.round(averageRating), false, 'large')}
                </div>
                <span className="rating-number">{averageRating}</span>
                <span className="review-count">({reviews.length} reviews)</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="reviews-content">
        <div className="container">
          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {/* Add Review Form */}
          {showForm && (
            <section className="review-form-section">
              <div className="form-card">
                <h2>Share Your Experience</h2>
                <p className="form-subtitle">
                  We'd love to hear about your stay. Your feedback helps us improve our service.
                </p>

                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your Rating *</label>
                    <div className="rating-input">
                      {renderStars(formData.rating, true)}
                      <span className="rating-text">
                        {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'Click to rate'}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="review">Your Review *</label>
                    <textarea
                      id="review"
                      name="review"
                      value={formData.review}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your experience..."
                      rows="6"
                      minLength="10"
                    ></textarea>
                    <div className="character-count">
                      {formData.review.length} characters
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting || formData.rating === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Submitting Review...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>

                  {submitMessage && (
                    <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </section>
          )}

          {/* Reviews Grid */}
          <section className="reviews-section">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner large"></div>
                <p>Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              <>
                <div className="section-header">
                  <h2>What Our Guests Say</h2>
                  <p>Real experiences from real guests who stayed with us</p>
                </div>
                
                <div className="reviews-grid">
                  {reviews.map((review, index) => (
                    <div 
                      key={review.id} 
                      className="review-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="review-header">
                        <div className="guest-info">
                          <img 
                            src={review.avatar} 
                            alt={review.name}
                            className="guest-avatar"
                          />
                          <div className="guest-details">
                            <h3 className="guest-name">{review.name}</h3>
                            <p className="stay-info">{review.stayDuration}</p>
                            <p className="review-date">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <div className="review-content">
                        <p className="review-text">
                          {truncateText(review.review, 200)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h2>No reviews yet</h2>
                <p>Be the first to share your experience!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  Write a Review
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
