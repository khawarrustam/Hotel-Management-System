import React from 'react';
import './Button.scss';

const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  children, 
  type = 'button',
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${disabled ? 'btn--disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
