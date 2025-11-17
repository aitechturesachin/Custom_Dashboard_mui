import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CARD_CONFIGS } from '../../constants/kpiCards.jsx';
import '../../styles/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [customizeOpen, setCustomizeOpen] = useState(() =>
    location.pathname.startsWith('/dashboard')
  );

  const menuItems = useMemo(
    () => [
      {
        id: 'overview',
        label: 'Dashboard Overview',
        icon: <DashboardIcon fontSize="small" />,
        path: '/',
      },
      {
        id: 'customize',
        label: 'Customize Dashboard Menu',
        icon: <TuneIcon fontSize="small" />,
        path: '/dashboard',
        isExpandable: true,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <BarChartIcon fontSize="small" />,
        path: '/analytics',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <AssessmentIcon fontSize="small" />,
        path: '/reports',
      },
      {
        id: 'customers',
        label: 'Customers',
        icon: <PeopleAltIcon fontSize="small" />,
        path: '/customers',
      },
      {
        id: 'products',
        label: 'Products',
        icon: <Inventory2Icon fontSize="small" />,
        path: '/products',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon fontSize="small" />,
        path: '/settings',
      },
    ],
    []
  );

  const kpiItems = useMemo(
    () =>
      CARD_CONFIGS.map((card) => ({
        id: card.id,
        label: card.title,
        icon: card.icon,
      })),
    []
  );

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isKpiActive = (key) =>
    location.pathname === '/dashboard' && params.get('card') === key;

  const renderNavButton = (item) => (
    <ListItemButton
      key={item.id}
      component={NavLink}
      to={item.path}
      end={item.path === '/'}
      selected={isActivePath(item.path)}
      sx={{
        borderRadius: '8px',
        mb: 0.5,
        px: 1.5,
        '&.active, &.Mui-selected': {
          backgroundColor: 'var(--accent-soft, rgba(66, 153, 225, 0.15))',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: 'var(--text-secondary)' }}>
        {item.icon}
      </ListItemIcon>
      {isOpen && <ListItemText primary={item.label} />}
    </ListItemButton>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🚀</span>
            {isOpen && <span className="logo-text">Dashboard</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          <List disablePadding>
            {menuItems.map((item) =>
              item.isExpandable ? (
                <Box key={item.id}>
                  <ListItemButton
                    onClick={() => setCustomizeOpen((prev) => !prev)}
                    selected={isActivePath(item.path)}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      px: 1.5,
                      '&.Mui-selected': {
                        backgroundColor: 'var(--accent-soft, rgba(66, 153, 225, 0.15))',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: 'var(--text-secondary)' }}>
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <>
                        <ListItemText primary={item.label} />
                        {customizeOpen ? <ExpandLess /> : <ExpandMore />}
                      </>
                    )}
                  </ListItemButton>
                  <Collapse in={customizeOpen && isOpen} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      subheader={
                        <ListSubheader component="div" disableSticky sx={{ pl: 4, color: 'var(--text-secondary)' }}>
                          Professional KPI Cards
                        </ListSubheader>
                      }
                    >
                      {kpiItems.map((child) => (
                        <ListItemButton
                          key={child.id}
                          component={NavLink}
                          to={`/dashboard?card=${child.id}`}
                          selected={isKpiActive(child.id)}
                          sx={{
                            borderRadius: '8px',
                            ml: 3.5,
                            mr: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                              backgroundColor: 'var(--accent-soft, rgba(66, 153, 225, 0.2))',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32, color: 'var(--text-secondary)' }}>
                            {child.icon}
                          </ListItemIcon>
                          {isOpen && <ListItemText primary={child.label} />}
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                renderNavButton(item)
              )
            )}
          </List>
        </nav>

        <Divider light sx={{ mx: 1.5 }} />

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