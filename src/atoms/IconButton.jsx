import React, { useState } from 'react';
import './IconButton.scss';

const IconButton = ({ 
  icon: Icon, 
  tooltip, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="icon-button-wrapper">
      <button
        className={`icon-btn icon-btn--${variant} icon-btn--${size} ${disabled ? 'icon-btn--disabled' : ''} ${className}`}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...props}
      >
        {Icon && <Icon />}
      </button>
      {tooltip && showTooltip && (
        <div className="icon-btn-tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default IconButton;
