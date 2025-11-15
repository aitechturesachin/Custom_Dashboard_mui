import React, { useState } from 'react';
import '../../styles/modal.css';

const ChartFiltersPanel = ({ isOpen, onClose, onApplyFilters, chartType }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [valueRange, setValueRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Others'];

  const handleApply = () => {
    onApplyFilters({
      dateRange,
      valueRange,
      selectedCategories,
    });
    onClose();
  };

  const handleReset = () => {
    setDateRange({ start: '', end: '' });
    setValueRange({ min: '', max: '' });
    setSelectedCategories([]);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chart Filters</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {/* Date Range Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Date Range</h3>
            <div className="filter-row">
              <div className="filter-col">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div className="filter-col">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Value Range Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Value Range</h3>
            <div className="filter-row">
              <div className="filter-col">
                <label className="form-label">Minimum</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Min value"
                  value={valueRange.min}
                  onChange={(e) => setValueRange({ ...valueRange, min: e.target.value })}
                />
              </div>
              <div className="filter-col">
                <label className="form-label">Maximum</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Max value"
                  value={valueRange.max}
                  onChange={(e) => setValueRange({ ...valueRange, max: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          {chartType === 'category' && (
            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <div className="checkbox-group">
                {categories.map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartFiltersPanel;