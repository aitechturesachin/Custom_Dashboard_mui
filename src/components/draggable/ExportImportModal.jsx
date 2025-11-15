import React from 'react';
import '../../styles/modal.css';

const ExportImportModal = ({ isOpen, onClose, onExport, onImport }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export / Import Dashboard</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {/* Export/Import content */}
        </div>
        <div className="modal-footer">
          <button onClick={onExport}>Export</button>
          <button onClick={onImport}>Import</button>
        </div>
      </div>
    </div>
  );
};

export default ExportImportModal;

