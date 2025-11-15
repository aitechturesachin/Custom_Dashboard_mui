import React, { useState } from 'react';
import ChartFiltersPanel from './ChartFiltersPanel';
import ChartSettingsModal from './ChartSettingsModal';
import FullScreenChart from './FullScreenChart';
import '../../styles/draggable-dashboard.css';

const DraggableChartCard = ({ 
  title, 
  description, 
  children, 
  onRemove, 
  id,
  chartType,
  onFilterChange,
  onSettingsChange
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  
  // Initialize with default settings instead of null
  const [activeSettings, setActiveSettings] = useState({
    primaryColor: '#4dabf7',
    secondaryColor: '#51cf66',
    showLegend: true,
    showGrid: true,
    animationEnabled: true,
    fontSize: 12,
  });

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    if (onFilterChange) {
      onFilterChange(id, filters);
    }
    setShowFilters(false);
  };

  const handleApplySettings = (settings) => {
    setActiveSettings(settings);
    if (onSettingsChange) {
      onSettingsChange(id, settings);
    }
    setShowSettings(false);
  };

  const hasActiveFilters = activeFilters && (
    activeFilters.dateRange?.start || 
    activeFilters.dateRange?.end || 
    activeFilters.valueRange?.min || 
    activeFilters.valueRange?.max ||
    activeFilters.selectedCategories?.length > 0
  );

  // Check if settings differ from defaults
  const hasActiveSettings = 
    activeSettings.primaryColor !== '#4dabf7' ||
    activeSettings.secondaryColor !== '#51cf66' ||
    !activeSettings.showLegend ||
    !activeSettings.showGrid ||
    !activeSettings.animationEnabled ||
    activeSettings.fontSize !== 12;

  return (
    <>
      <div className="draggable-chart-card">
        <div className="draggable-chart-header">
          <div className="chart-header-left">
            <div className="drag-handle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="5" r="2"/>
                <circle cx="9" cy="12" r="2"/>
                <circle cx="9" cy="19" r="2"/>
                <circle cx="15" cy="5" r="2"/>
                <circle cx="15" cy="12" r="2"/>
                <circle cx="15" cy="19" r="2"/>
              </svg>
            </div>
            <div className="chart-title-wrapper">
              <h3 className="draggable-chart-title">{title}</h3>
              {description && <p className="draggable-chart-description">{description}</p>}
              <div className="chart-badges">
                {hasActiveFilters && (
                  <span className="filter-badge">Filtered</span>
                )}
                {hasActiveSettings && (
                  <span className="filter-badge settings-badge">Custom</span>
                )}
              </div>
            </div>
          </div>
          <div className="chart-actions">
            <button 
              className={`chart-action-icon-btn ${hasActiveFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(true)}
              title="Filter data"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className={`chart-action-icon-btn ${hasActiveSettings ? 'active' : ''}`}
              onClick={() => setShowSettings(true)}
              title="Chart settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                <path d="M12 1v6m0 6v6" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className="chart-action-icon-btn"
              onClick={() => setIsFullScreen(true)}
              title="Full screen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className="chart-remove-btn"
              onClick={() => onRemove && onRemove(id)}
              title="Remove chart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="draggable-chart-content">
          {children}
        </div>
      </div>

      {/* Modals */}
      <ChartFiltersPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        chartType={chartType}
        currentFilters={activeFilters}
      />
      
      <ChartSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onApplySettings={handleApplySettings}
        currentSettings={activeSettings}
      />

      <FullScreenChart
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        chartComponent={children}
        title={title}
        description={description}
      />
    </>
  );
};

export default DraggableChartCard;