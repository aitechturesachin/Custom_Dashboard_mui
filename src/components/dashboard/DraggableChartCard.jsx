import React from 'react';
// import '../../styles/draggable.css';
import '../../styles/draggable-dashboard.css';


const DraggableChartCard = ({ title, description, children, onRemove, id }) => {
  return (
    <div 
    className="draggable-chart-card"
    >
      <div className="chart-header">
        <div className="chart-header-left">
          <div 
          className="drag-handle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="2"/>
              <circle cx="9" cy="12" r="2"/>
              <circle cx="9" cy="19" r="2"/>
              <circle cx="15" cy="5" r="2"/>
              <circle cx="15" cy="12" r="2"/>
              <circle cx="15" cy="19" r="2"/>
            </svg>
          </div>
          <div>
            <h3 className="chart-title">{title}</h3>
            {description && <p className="chart-description">{description}</p>}
          </div>
        </div>
        <div className="chart-actions">
          <button 
            className="chart-action-btn"
            onClick={() => onRemove && onRemove(id)}
            aria-label="Remove chart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
};

export default DraggableChartCard;