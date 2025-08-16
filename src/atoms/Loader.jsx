import React from 'react';
import './Loader.scss';

const Loader = ({ 
  size = 'medium', 
  variant = 'spinner',
  color = 'primary',
  className = '',
  ...props 
}) => {
  if (variant === 'dots') {
    return (
      <div className={`loader loader--dots loader--${size} loader--${color} ${className}`} {...props}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`loader loader--pulse loader--${size} loader--${color} ${className}`} {...props}>
        <div className="pulse-circle"></div>
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`loader loader--bars loader--${size} loader--${color} ${className}`} {...props}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`loader loader--spinner loader--${size} loader--${color} ${className}`} {...props}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
