import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    guestName: '',
  });

  useEffect(() => {
    // Fetch reviews
    const fetchReviews = async () => {
      try {
        // API call to get reviews
        // const response = await reviewsApi.getAll();
        // setReviews(response.data);
        setReviews([]); // Placeholder
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      // API call to submit review
      // await reviewsApi.create(newReview);
      console.log('Review submitted:', newReview);
      
      // Reset form
      setNewReview({
        rating: 5,
        title: '',
        comment: '',
        guestName: '',
      });
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>Guest Reviews</h1>
        <p>See what our guests are saying about their stay.</p>
      </div>

      <div className="reviews-stats">
        <div className="average-rating">
          <span className="rating-number">4.8</span>
          <div className="stars">★★★★★</div>
          <p>Based on {reviews.length} reviews</p>
        </div>
      </div>

      <div className="reviews-content">
        <div className="reviews-list">
          <h2>Recent Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3>{review.title}</h3>
                  <div className="rating">
                    {'★'.repeat(review.rating)}
                  </div>
                </div>
                <p>{review.comment}</p>
                <div className="review-footer">
                  <span className="guest-name">{review.guestName}</span>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="review-form-section">
          <h2>Leave a Review</h2>
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-group">
              <label htmlFor="guestName">Your Name *</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={newReview.guestName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <select
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                required
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Good</option>
                <option value={2}>2 Stars - Fair</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Review Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review *</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
