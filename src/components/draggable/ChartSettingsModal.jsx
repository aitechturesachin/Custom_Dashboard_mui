import React, { useState } from 'react';
import '../../styles/modal.css';

const ChartSettingsModal = ({ isOpen, onClose, onApplySettings, currentSettings = {} }) => {
  const [settings, setSettings] = useState({
    primaryColor: currentSettings.primaryColor || '#4dabf7',
    secondaryColor: currentSettings.secondaryColor || '#51cf66',
    showLegend: currentSettings.showLegend !== false,
    showGrid: currentSettings.showGrid !== false,
    animationEnabled: currentSettings.animationEnabled !== false,
    fontSize: currentSettings.fontSize || 12,
    ...currentSettings,
  });

  const handleApply = () => {
    onApplySettings(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chart Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {/* Colors */}
          <div className="filter-section">
            <h3 className="filter-title">Colors</h3>
            <div className="filter-row">
              <div className="filter-col">
                <label className="form-label">Primary Color</label>
                <input
                  type="color"
                  className="form-input color-input"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                />
              </div>
              <div className="filter-col">
                <label className="form-label">Secondary Color</label>
                <input
                  type="color"
                  className="form-input color-input"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="filter-section">
            <h3 className="filter-title">Display Options</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.showLegend}
                  onChange={(e) => setSettings({ ...settings, showLegend: e.target.checked })}
                />
                <span>Show Legend</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.showGrid}
                  onChange={(e) => setSettings({ ...settings, showGrid: e.target.checked })}
                />
                <span>Show Grid Lines</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.animationEnabled}
                  onChange={(e) => setSettings({ ...settings, animationEnabled: e.target.checked })}
                />
                <span>Enable Animations</span>
              </label>
            </div>
          </div>

          {/* Font Size */}
          <div className="filter-section">
            <h3 className="filter-title">Typography</h3>
            <div className="filter-col">
              <label className="form-label">Font Size: {settings.fontSize}px</label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="20"
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartSettingsModal;