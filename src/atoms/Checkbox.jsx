import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  disabled = false,
  indeterminate = false,
  size = 'medium',
  className = '',
  ...props 
}) => {
  const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`checkbox-wrapper checkbox-wrapper--${size} ${className}`}>
      <div className="checkbox-container">
        <input
          id={checkboxId}
          type="checkbox"
          className={`checkbox-input ${disabled ? 'checkbox-input--disabled' : ''}`}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <div className={`checkbox-custom ${checked || indeterminate ? 'checkbox-custom--checked' : ''} ${indeterminate ? 'checkbox-custom--indeterminate' : ''}`}>
          {checked && !indeterminate && (
            <svg className="checkbox-checkmark" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {indeterminate && (
            <svg className="checkbox-indeterminate" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <label htmlFor={checkboxId} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
