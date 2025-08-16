import React from 'react';
import './Label.scss';

const Label = ({ 
  text, 
  required = false, 
  htmlFor,
  size = 'medium',
  variant = 'default',
  className = '',
  children,
  ...props 
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`label label--${size} label--${variant} ${required ? 'label--required' : ''} ${className}`}
      {...props}
    >
      {text || children}
    </label>
  );
};

export default Label;
