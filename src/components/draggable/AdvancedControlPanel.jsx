import React, { useState } from 'react';
import ExcelUploadDialog from '../dashboard/ExcelUploadDialog';
import '../../styles/modal.css';

const AdvancedControlPanel = ({ 
  removedCharts, 
  onRestore, 
  onReset,
  onExport,
  onImport,
  onSavePreset,
  onLoadPreset,
  onShare,
  onPrint,
  presets,
  onExcelDataReady,
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showExcelDialog, setShowExcelDialog] = useState(false);

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <>
      <div className="dashboard-control-panel">
        <div className="control-panel-left">
          <h3 className="control-panel-title">Dashboard Charts</h3>
          <p className="control-panel-description">
            Drag and drop to rearrange, resize corners to adjust size
          </p>
        </div>
        
        <div className="control-panel-right">
          {/* Add Chart Dropdown */}
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
                    Restore {chartId.charAt(0).toUpperCase() + chartId.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Excel Upload Button */}
          <button className="control-panel-btn" onClick={() => setShowExcelDialog(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 9 12 4 17 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="4" x2="12" y2="16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload Excel
          </button>

          {/* Presets Dropdown */}
          <div className="add-chart-dropdown">
            <button className="control-panel-btn" onClick={() => setShowPresetsMenu(!showPresetsMenu)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17 21 17 13 7 13 7 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Presets ({presets.length})
            </button>
            {showPresetsMenu && (
              <div className="dropdown-menu show">
                <button onClick={onSavePreset} className="dropdown-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
                    <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
                    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
                  </svg>
                  Save Current Layout
                </button>
                {presets.length > 0 && <div className="dropdown-divider"></div>}
                {presets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => onLoadPreset(preset)}
                    className="dropdown-item"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* More Options Dropdown */}
          <div className="add-chart-dropdown">
            <button className="control-panel-btn" onClick={() => setShowMoreMenu(!showMoreMenu)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="1" strokeWidth="2"/>
                <circle cx="12" cy="5" r="1" strokeWidth="2"/>
                <circle cx="12" cy="19" r="1" strokeWidth="2"/>
              </svg>
              More
            </button>
            {showMoreMenu && (
              <div className="dropdown-menu show">
                <button onClick={onExport} className="dropdown-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
                    <polyline points="7 10 12 15 17 10" strokeWidth="2"/>
                    <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2"/>
                  </svg>
                  Export Layout
                </button>
                <label className="dropdown-item" style={{cursor: 'pointer'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
                    <polyline points="17 8 12 3 7 8" strokeWidth="2"/>
                    <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2"/>
                  </svg>
                  Import Layout
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleFileImport}
                    style={{display: 'none'}}
                  />
                </label>
                <button onClick={onShare} className="dropdown-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
                    <circle cx="18" cy="5" r="3" strokeWidth="2"/>
                    <circle cx="6" cy="12" r="3" strokeWidth="2"/>
                    <circle cx="18" cy="19" r="3" strokeWidth="2"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2"/>
                  </svg>
                  Share Dashboard
                </button>
                <button onClick={onPrint} className="dropdown-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
                    <polyline points="6 9 6 2 18 2 18 9" strokeWidth="2"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" strokeWidth="2"/>
                    <rect x="6" y="14" width="12" height="8" strokeWidth="2"/>
                  </svg>
                  Print Layout
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button onClick={onReset} className="control-panel-btn reset-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3v5h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 21v-5h5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reset
          </button>
        </div>
      </div>

      <ExcelUploadDialog
        open={showExcelDialog}
        onClose={() => setShowExcelDialog(false)}
        onChartDataReady={(payload) => {
          if (onExcelDataReady) {
            onExcelDataReady(payload);
          }
          setShowExcelDialog(false);
        }}
      />
    </>
  );
};

export default AdvancedControlPanel;