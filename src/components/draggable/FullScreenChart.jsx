import React, { useEffect } from 'react';
import '../../styles/modal.css';

const FullScreenChart = ({ isOpen, onClose, chartComponent, title, description }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-header">
        <div>
          <h2 className="fullscreen-title">{title}</h2>
          <p className="fullscreen-description">{description}</p>
        </div>
        <button className="fullscreen-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      <div className="fullscreen-content">
        {chartComponent}
      </div>
    </div>
  );
};

export default FullScreenChart;