import React, { useState } from 'react';
import '../../styles/modal.css';

const ShareDashboardModal = ({ isOpen, onClose, shareURL }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share Dashboard</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-description">
            Share this URL to let others view your dashboard layout
          </p>
          <div className="share-url-container">
            <input
              type="text"
              className="form-input share-url-input"
              value={shareURL}
              readOnly
            />
            <button className="btn btn-primary" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" strokeWidth="2"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDashboardModal;