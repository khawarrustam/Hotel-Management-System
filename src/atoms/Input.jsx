import React from 'react';
import './Input.scss';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className={`input-label ${required ? 'input-label--required' : ''}`}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
