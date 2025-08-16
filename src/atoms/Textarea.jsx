import React from 'react';
import './Textarea.scss';

const Textarea = ({ 
  label, 
  placeholder, 
  rows = 4, 
  value, 
  onChange, 
  error,
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label htmlFor={textareaId} className={`textarea-label ${required ? 'textarea-label--required' : ''}`}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`textarea ${error ? 'textarea--error' : ''} ${disabled ? 'textarea--disabled' : ''}`}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="textarea-error">{error}</span>}
    </div>
  );
};

export default Textarea;
