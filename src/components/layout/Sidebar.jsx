import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 1, label: 'Dashboard', icon: '📊', path: '/' },
    { id: 2, label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: 3, label: 'Reports', icon: '📋', path: '/reports' },
    { id: 4, label: 'Customers', icon: '👥', path: '/customers' },
    { id: 5, label: 'Products', icon: '📦', path: '/products' },
    { id: 6, label: 'Customize', icon: '🛠️', path: '/customize' },
    { id: 7, label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🚀</span>
            {isOpen && <span className="logo-text">Dashboard</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  end={item.path === '/'}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {isOpen && <span className="sidebar-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">A</div>
            {isOpen && (
              <div className="user-info">
                <div className="user-name">Aman</div>
                <div className="user-email">admin@dash.com</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;