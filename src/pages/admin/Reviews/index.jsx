import React, { useState, useEffect } from 'react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // API call to fetch reviews
      setReviews([]); // Placeholder
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      // API call to approve review
      console.log('Approving review:', reviewId);
      fetchReviews(); // Refresh list
    } catch (error) {
      console.error('Failed to approve review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        // API call to delete review
        console.log('Deleting review:', reviewId);
        fetchReviews(); // Refresh list
      } catch (error) {
        console.error('Failed to delete review:', error);
      }
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="admin-reviews">
      <div className="page-header">
        <h1>Review Management</h1>
        <div className="review-stats">
          <span>Total Reviews: {reviews.length}</span>
          <span>Average Rating: 4.8/5</span>
        </div>
      </div>

      <div className="reviews-table">
        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Rating</th>
              <th>Title</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="7">No reviews found</td>
              </tr>
            ) : (
              reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.guestName}</td>
                  <td>
                    <span className="rating">
                      {'★'.repeat(review.rating)}
                    </span>
                  </td>
                  <td>{review.title}</td>
                  <td className="comment-cell">
                    {review.comment.length > 100 
                      ? `${review.comment.substring(0, 100)}...`
                      : review.comment
                    }
                  </td>
                  <td>{review.date}</td>
                  <td>
                    <span className={`status ${review.status}`}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    {review.status === 'pending' && (
                      <button 
                        onClick={() => handleApproveReview(review.id)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteReview(review.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
