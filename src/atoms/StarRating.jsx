import React, { useState } from 'react';
import './StarRating.scss';

const StarRating = ({ 
  rating = 0, 
  maxRating = 5,
  size = 'medium',
  interactive = false,
  onChange,
  className = '',
  ...props 
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleStarClick = (starRating) => {
    if (interactive && onChange) {
      onChange(starRating);
    }
  };
  
  const handleStarHover = (starRating) => {
    if (interactive) {
      setHoveredRating(starRating);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };
  
  const getStarClass = (starIndex) => {
    const currentRating = interactive ? (hoveredRating || rating) : rating;
    const isFilled = starIndex <= currentRating;
    const isPartial = starIndex - 0.5 <= currentRating && starIndex > currentRating;
    
    return `star ${isFilled ? 'star--filled' : isPartial ? 'star--partial' : 'star--empty'}`;
  };
  
  return (
    <div 
      className={`star-rating star-rating--${size} ${interactive ? 'star-rating--interactive' : ''} ${className}`}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            key={starIndex}
            type="button"
            className={getStarClass(starIndex)}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarHover(starIndex)}
            disabled={!interactive}
            aria-label={`Rate ${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="star-icon"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>
        );
      })}
      {rating > 0 && (
        <span className="star-rating-text">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
