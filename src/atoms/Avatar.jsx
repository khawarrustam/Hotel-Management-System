import React from 'react';
import './Avatar.scss';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'medium',
  shape = 'circle', // 'circle' for people, 'rounded' for rooms
  fallback,
  className = '',
  ...props 
}) => {
  const handleImageError = (e) => {
    if (fallback) {
      e.target.src = fallback;
    } else {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }
  };
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className={`avatar avatar--${size} avatar--${shape} ${className}`} {...props}>
      {src ? (
        <>
          <img 
            src={src} 
            alt={alt} 
            onError={handleImageError}
            className="avatar-image"
          />
          <div className="avatar-fallback" style={{ display: 'none' }}>
            {getInitials(alt)}
          </div>
        </>
      ) : (
        <div className="avatar-fallback">
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
