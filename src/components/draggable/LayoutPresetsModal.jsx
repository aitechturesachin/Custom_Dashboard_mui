import React, { useState } from 'react';
import '../../styles/modal.css';

const LayoutPresetsModal = ({ isOpen, onClose, onSave }) => {
  const [presetName, setPresetName] = useState('');

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim());
      setPresetName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Save Layout Preset</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <label className="form-label">Preset Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Sales Dashboard, Analytics View"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={!presetName.trim()}
          >
            Save Preset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutPresetsModal;