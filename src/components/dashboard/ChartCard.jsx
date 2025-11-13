import React from 'react';
import '../../styles/charts.css';

const ChartCard = ({ title, description, children }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title}</h3>
          {description && <p className="chart-description">{description}</p>}
        </div>
      </div>
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;