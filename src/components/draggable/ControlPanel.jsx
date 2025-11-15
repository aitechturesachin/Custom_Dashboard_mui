import React from 'react';
import '../../styles/draggable-dashboard.css';

const ControlPanel = ({ removedCharts, onRestore, onReset }) => {
  return (
    <div className="dashboard-control-panel">
      <div className="control-panel-left">
        <h3 className="control-panel-title">Dashboard Charts</h3>
        <p className="control-panel-description">
          Drag and drop to rearrange, resize corners to adjust size
        </p>
      </div>
      <div className="control-panel-right">
        {removedCharts.length > 0 && (
          <div className="add-chart-dropdown">
            <button className="control-panel-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Chart
            </button>
            <div className="dropdown-menu">
              {removedCharts.map(chartId => (
                <button
                  key={chartId}
                  onClick={() => onRestore(chartId)}
                  className="dropdown-item"
                >
                  Restore {chartId.charAt(0).toUpperCase() + chartId.slice(1)} Chart
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={onReset} className="control-panel-btn reset-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 3v5h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21v-5h5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reset Layout
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;