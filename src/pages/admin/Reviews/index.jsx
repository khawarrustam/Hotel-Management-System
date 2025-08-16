import React, { useState, useMemo } from 'react';
import { 
  FaSearch, 
  FaFilter,
  FaStar,
  FaRegStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaBed,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaThumbsUp,
  FaThumbsDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaInfoCircle
} from 'react-icons/fa';
import './AdminReviewsSimple.scss';

// Enhanced sample reviews data for luxury hotel
const sampleReviews = [
  {
    id: 1,
    guestName: "Sarah Johnson",
    guestEmail: "sarah.johnson@email.com",
    guestAvatar: "/images/customers/customer1.svg",
    roomName: "Royal Executive Suite",
    roomImage: "/images/room-1.jpeg",
    rating: 5,
    reviewText: "Absolutely stunning suite with breathtaking city views! The marble bathroom and premium amenities exceeded all expectations. The concierge service was impeccable and made our anniversary truly special. Would definitely recommend this hotel to anyone looking for luxury accommodation.",
    dateSubmitted: "2024-08-15T14:30:00Z",
    status: "approved",
    helpful: 24,
    reported: 0
  },
  {
    id: 2,
    guestName: "Michael Chen",
    guestEmail: "michael.chen@email.com",
    guestAvatar: "/images/customers/customer2.svg",
    roomName: "Premium Ocean View",
    roomImage: "/images/room-2.jpeg",
    rating: 4,
    reviewText: "Great ocean view and spacious room. The bed was very comfortable and the amenities were top-notch. Only minor complaint was the WiFi connection which was a bit slow during peak hours. Overall, a wonderful stay!",
    dateSubmitted: "2024-08-14T09:15:00Z",
    status: "pending",
    helpful: 12,
    reported: 1
  },
  {
    id: 3,
    guestName: "Emily Rodriguez",
    guestEmail: "emily.rodriguez@email.com",
    guestAvatar: "/images/customers/customer3.svg",
    roomName: "Garden Villa Single",
    roomImage: "/images/room-3.jpeg",
    rating: 3,
    reviewText: "The room was clean and the garden view was nice. However, the room was smaller than expected and the air conditioning was quite noisy. The staff was friendly and helpful though.",
    dateSubmitted: "2024-08-13T16:45:00Z",
    status: "approved",
    helpful: 8,
    reported: 0
  },
  {
    id: 4,
    guestName: "David Thompson",
    guestEmail: "david.thompson@email.com",
    guestAvatar: "/images/customers/customer4.svg",
    roomName: "Presidential Penthouse",
    roomImage: "/images/room-4.jpeg",
    rating: 5,
    reviewText: "Exceptional service and luxury beyond compare! The penthouse suite was absolutely magnificent with panoramic views and world-class amenities. The private butler service was outstanding. This is definitely a 5-star experience that I'll never forget.",
    dateSubmitted: "2024-08-12T11:20:00Z",
    status: "approved",
    helpful: 45,
    reported: 0
  },
  {
    id: 5,
    guestName: "Jennifer Wilson",
    guestEmail: "jennifer.wilson@email.com",
    guestAvatar: "/images/customers/customer1.svg",
    roomName: "Business Class Double",
    roomImage: "/images/room-5.jpeg",
    rating: 2,
    reviewText: "Room was outdated and not worth the price. The bathroom had some maintenance issues and the service was slow. Expected much better for a supposed luxury hotel.",
    dateSubmitted: "2024-08-11T13:30:00Z",
    status: "pending",
    helpful: 5,
    reported: 3
  },
  {
    id: 6,
    guestName: "Robert Kim",
    guestEmail: "robert.kim@email.com",
    guestAvatar: "/images/customers/customer2.svg",
    roomName: "Deluxe King Suite",
    roomImage: "/images/room-6.jpeg",
    rating: 4,
    reviewText: "Very comfortable stay with excellent amenities. The spa services were particularly impressive. Would have been 5 stars but the check-in process took longer than expected.",
    dateSubmitted: "2024-08-10T18:45:00Z",
    status: "rejected",
    helpful: 15,
    reported: 0
  },
  {
    id: 7,
    guestName: "Lisa Martinez",
    guestEmail: "lisa.martinez@email.com",
    guestAvatar: "/images/customers/customer3.svg",
    roomName: "Standard Double Room",
    roomImage: "/images/room-7.jpeg",
    rating: 4,
    reviewText: "Great value for money! Clean, comfortable room with all necessary amenities. The location is perfect and the staff was very accommodating to our special requests.",
    dateSubmitted: "2024-08-09T08:30:00Z",
    status: "approved",
    helpful: 18,
    reported: 0
  },
  {
    id: 8,
    guestName: "James Anderson",
    guestEmail: "james.anderson@email.com",
    guestAvatar: "/images/customers/customer4.svg",
    roomName: "Superior Ocean View",
    roomImage: "/images/room-8.jpeg",
    rating: 5,
    reviewText: "Perfect honeymoon destination! The room was beautifully decorated and the ocean view was breathtaking. The romantic dinner package was an amazing touch. Highly recommended for couples!",
    dateSubmitted: "2024-08-08T20:15:00Z",
    status: "pending",
    helpful: 32,
    reported: 0
  }
];

const AdminReviews = () => {
  const [reviews] = useState(sampleReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailReview, setDetailReview] = useState(null);
  const [reviewsPerPage] = useState(6);

  // Filter and search reviews
  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = 
        review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.roomName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort reviews
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.dateSubmitted) - new Date(b.dateSubmitted));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [reviews, searchTerm, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render star rating
  const renderStars = (rating, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${interactive ? 'interactive' : ''}`}
        >
          {i <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'approved';
      case 'pending': return 'pending';
      case 'rejected': return 'rejected';
      default: return '';
    }
  };

  // Handle actions
  const handleViewDetails = (review) => {
    setDetailReview(review);
    setShowDetailModal(true);
  };

  const handleAction = (action, reviewId) => {
    setConfirmAction({ action, reviewId });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    const { action, reviewId } = confirmAction;
    console.log(`${action} review with ID: ${reviewId}`);
    // Here you would implement the actual API calls
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  return (
    <div className="admin-reviews">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-title">
          <h1>Manage Reviews</h1>
          <p>Monitor and manage guest reviews to maintain quality standards</p>
        </div>
        
        <div className="header-actions">
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredReviews.length}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredReviews.filter(r => r.status === 'pending').length}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="controls-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by guest name or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-controls">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Reviews</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        <div className="results-info">
          Showing <span className="count">{currentReviews.length}</span> of <span className="count">{filteredReviews.length}</span> reviews
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="reviews-cards-container">
        {currentReviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No Reviews Found</h3>
            <p>No reviews match your current search criteria.<br />Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {currentReviews.map(review => (
              <div key={review.id} className="review-card">
                {/* Status indicator */}
                <div className={`card-status ${review.status}`}>
                  {review.status}
                </div>

                {/* Enhanced Header */}
                <div className="review-header-content">
                  <div className="guest-info">
                    <h3>{review.guestName}</h3>
                    <p>{formatDate(review.dateSubmitted)}</p>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      {renderStars(review.rating)}
                    </div>
                    <span className="rating-number">{review.rating}</span>
                    <span className="rating-text">
                      {review.rating >= 4.5 ? 'Excellent' : 
                       review.rating >= 3.5 ? 'Good' : 
                       review.rating >= 2.5 ? 'Fair' : 'Poor'}
                    </span>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="review-content">
                  <div className="review-text">
                    {review.reviewText}
                  </div>
                  
                  <div className="review-meta">
                    <div className="room-info">
                      {review.roomName}
                    </div>
                    <div className="review-date">
                      {formatDate(review.dateSubmitted)}
                    </div>
                  </div>

                  {/* Review tags based on content */}
                  <div className="review-tags">
                    {review.rating >= 4 && <span className="tag">Recommended</span>}
                    {review.helpful > 10 && <span className="tag">Popular</span>}
                    {review.reviewText.length > 200 && <span className="tag">Detailed</span>}
                  </div>
                </div>

                {/* Enhanced Actions */}
                <div className="review-actions">
                  {review.status !== 'approved' && (
                    <button 
                      className="approve-btn"
                      onClick={() => handleAction('approve', review.id)}
                      title="Approve Review"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                  
                  {review.status !== 'rejected' && (
                    <button 
                      className="reject-btn"
                      onClick={() => handleAction('reject', review.id)}
                      title="Reject Review"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                  
                  <button 
                    className="edit-btn"
                    onClick={() => handleViewDetails(review)}
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </button>
                  
                  <button 
                    className="delete-btn"
                    onClick={() => handleAction('delete', review.id)}
                    title="Delete Review"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
            Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Review Detail Modal */}
      {showModal && selectedReview && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="review-details-grid">
                <div className="guest-section">
                  <h3>Guest Information</h3>
                  <div className="guest-profile">
                    <img 
                      src={selectedReview.guestAvatar} 
                      alt={selectedReview.guestName}
                      className="guest-avatar-large"
                    />
                    <div className="guest-info">
                      <div className="guest-name">{selectedReview.guestName}</div>
                      <div className="guest-email">{selectedReview.guestEmail}</div>
                      <div className="guest-date">
                        <FaCalendarAlt /> {formatDate(selectedReview.dateSubmitted)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="room-section">
                  <h3>Room Information</h3>
                  <div className="room-profile">
                    <img 
                      src={selectedReview.roomImage} 
                      alt={selectedReview.roomName}
                      className="room-image"
                    />
                    <div className="room-info">
                      <div className="room-name">{selectedReview.roomName}</div>
                      <div className="room-rating">
                        {renderStars(selectedReview.rating, true)}
                        <span className="rating-number">({selectedReview.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Review Content</h3>
                  <div className="review-content">
                    <p className="review-full-text">{selectedReview.reviewText}</p>
                    <div className="review-meta">
                      <span className="helpful">
                        <FaThumbsUp /> {selectedReview.helpful} found this helpful
                      </span>
                      {selectedReview.reported > 0 && (
                        <span className="reported">
                          <FaExclamationTriangle /> {selectedReview.reported} reports
                        </span>
                      )}
                      <span className={`status-badge ${getStatusClass(selectedReview.status)}`}>
                        {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedReview.status !== 'approved' && (
                <button 
                  className="primary approve-btn"
                  onClick={() => {
                    handleAction('approve', selectedReview.id);
                    setShowModal(false);
                  }}
                >
                  <FaCheck /> Approve Review
                </button>
              )}
              {selectedReview.status !== 'rejected' && (
                <button 
                  className="danger reject-btn"
                  onClick={() => {
                    handleAction('reject', selectedReview.id);
                    setShowModal(false);
                  }}
                >
                  <FaTimes /> Reject Review
                </button>
              )}
              <button 
                className="secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="action-icon">
                {confirmAction.action === 'approve' && <FaCheckCircle className="approve-icon" />}
                {confirmAction.action === 'reject' && <FaTimesCircle className="reject-icon" />}
                {confirmAction.action === 'delete' && <FaTrash className="delete-icon" />}
              </div>
              <div className="header-content">
                <h2>Confirm {confirmAction.action.charAt(0).toUpperCase() + confirmAction.action.slice(1)} Action</h2>
                <p>This action will affect the review status</p>
              </div>
              <button 
                className="close-btn"
                onClick={() => setShowConfirmModal(false)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="confirm-modal-body">
              <div className="confirmation-content">
                <div className="action-description">
                  <h3>Are you sure you want to {confirmAction.action} this review?</h3>
                  <div className="action-details">
                    {confirmAction.action === 'approve' && (
                      <div className="detail-item approve">
                        <FaCheckCircle />
                        <div>
                          <strong>Approve Review</strong>
                          <p>This review will be visible to all customers and will contribute to overall ratings.</p>
                        </div>
                      </div>
                    )}
                    {confirmAction.action === 'reject' && (
                      <div className="detail-item reject">
                        <FaTimesCircle />
                        <div>
                          <strong>Reject Review</strong>
                          <p>This review will be hidden from customers and marked as rejected in the system.</p>
                        </div>
                      </div>
                    )}
                    {confirmAction.action === 'delete' && (
                      <div className="detail-item delete">
                        <FaExclamationTriangle />
                        <div>
                          <strong>Delete Review</strong>
                          <p>This review will be permanently removed from the system. <span className="warning-text">This action cannot be undone.</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="confirm-modal-footer">
              <div className="action-buttons">
                <button 
                  className={`btn-confirm ${confirmAction.action}`}
                  onClick={confirmActionHandler}
                >
                  {confirmAction.action === 'approve' && <FaCheckCircle />}
                  {confirmAction.action === 'reject' && <FaTimesCircle />}
                  {confirmAction.action === 'delete' && <FaTrash />}
                  Confirm {confirmAction.action.charAt(0).toUpperCase() + confirmAction.action.slice(1)}
                </button>
                <button 
                  className="btn-cancel"
                  onClick={() => setShowConfirmModal(false)}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Detail Modal */}
      {showDetailModal && detailReview && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="detail-modal-header">
              <div className="header-content">
                <div className="guest-avatar-section">
                  <div className="avatar-placeholder">
                    <FaUser />
                  </div>
                  <div className="guest-details">
                    <h2>{detailReview.guestName}</h2>
                    <p>{detailReview.guestEmail}</p>
                    <span className="submission-date">
                      <FaCalendarAlt />
                      Submitted on {new Date(detailReview.dateSubmitted).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <div className="header-actions">
                  <div className={`status-indicator ${detailReview.status}`}>
                    {detailReview.status === 'approved' && <FaCheckCircle />}
                    {detailReview.status === 'pending' && <FaInfoCircle />}
                    {detailReview.status === 'rejected' && <FaTimesCircle />}
                    {detailReview.status.charAt(0).toUpperCase() + detailReview.status.slice(1)}
                  </div>
                  <button 
                    className="close-btn"
                    onClick={() => setShowDetailModal(false)}
                    title="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            <div className="detail-modal-body">
              <div className="review-details-grid">
                <div className="review-section">
                  <div className="section-header">
                    <h3><FaStar /> Review Details</h3>
                  </div>
                  <div className="section-content">
                    <div className="rating-display">
                      <div className="stars-large">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className={index < detailReview.rating ? 'filled' : 'empty'}>
                            {index < detailReview.rating ? <FaStar /> : <FaRegStar />}
                          </span>
                        ))}
                      </div>
                      <div className="rating-info">
                        <span className="rating-number">{detailReview.rating}.0</span>
                        <span className="rating-text">
                          {detailReview.rating >= 4.5 ? 'Excellent' : 
                           detailReview.rating >= 3.5 ? 'Very Good' : 
                           detailReview.rating >= 2.5 ? 'Good' : 
                           detailReview.rating >= 1.5 ? 'Fair' : 'Poor'}
                        </span>
                      </div>
                    </div>
                    <div className="review-text-full">
                      <h4>Guest Review</h4>
                      <p>{detailReview.reviewText}</p>
                    </div>
                  </div>
                </div>

                <div className="room-section">
                  <div className="section-header">
                    <h3><FaBed /> Room Information</h3>
                  </div>
                  <div className="section-content">
                    <div className="room-card-detail">
                      <div className="room-image">
                        <img src={detailReview.roomImage} alt={detailReview.roomName} />
                      </div>
                      <div className="room-info-detail">
                        <h4>{detailReview.roomName}</h4>
                        <div className="room-stats">
                          <span className="stat">
                            <FaThumbsUp />
                            {detailReview.helpful} found helpful
                          </span>
                          {detailReview.reported > 0 && (
                            <span className="stat reported">
                              <FaExclamationTriangle />
                              {detailReview.reported} reported
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-modal-footer">
              <div className="action-buttons">
                {detailReview.status !== 'approved' && (
                  <button 
                    className="btn-approve"
                    onClick={() => {
                      handleAction('approve', detailReview.id);
                      setShowDetailModal(false);
                    }}
                  >
                    <FaCheckCircle />
                    Approve Review
                  </button>
                )}
                
                {detailReview.status !== 'rejected' && (
                  <button 
                    className="btn-reject"
                    onClick={() => {
                      handleAction('reject', detailReview.id);
                      setShowDetailModal(false);
                    }}
                  >
                    <FaTimesCircle />
                    Reject Review
                  </button>
                )}
                
                <button 
                  className="btn-delete"
                  onClick={() => {
                    handleAction('delete', detailReview.id);
                    setShowDetailModal(false);
                  }}
                >
                  <FaTrash />
                  Delete Review
                </button>
                
                <button 
                  className="btn-close"
                  onClick={() => setShowDetailModal(false)}
                >
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

export default AdminReviews;
