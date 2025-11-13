import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import IconButton from '../common/IconButton';
import '../../styles/header.css';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-left">
        <IconButton 
          onClick={toggleSidebar}
          ariaLabel="Toggle sidebar"
          className="menu-button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </IconButton>
        
        <h1 className="header-title">Dashboard</h1>
      </div>

      <div className="header-right">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <IconButton ariaLabel="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="notification-badge">3</span>
        </IconButton>

        <ThemeToggle />

        <div className="header-profile">
          <div className="profile-avatar">A</div>
        </div>
      </div>
    </header>
  );
};

export default Header;