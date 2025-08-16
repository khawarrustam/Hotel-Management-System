import React from 'react';
import './Badge.scss';

const Badge = ({ 
  type = 'info', 
  children, 
  size = 'medium',
  className = '',
  ...props 
}) => {
  return (
    <span
      className={`badge badge--${type} badge--${size} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
