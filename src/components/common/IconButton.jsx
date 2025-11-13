import React from 'react';

const IconButton = ({ onClick, children, className = '', ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className={`icon-button ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;