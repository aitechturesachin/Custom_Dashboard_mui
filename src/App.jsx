import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardCharts from './components/dashboard/DashboardCharts';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <div>
          <h2 style={{ marginBottom: '24px' }}>Welcome to Dashboard</h2>
          
          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'var(--bg-primary)', 
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Users</h3>
              <p style={{ fontSize: '28px', fontWeight: '600' }}>12,345</p>
              <p style={{ color: '#28a745', fontSize: '14px', marginTop: '8px' }}>↑ 12.5%</p>
            </div>
            
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'var(--bg-primary)', 
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Revenue</h3>
              <p style={{ fontSize: '28px', fontWeight: '600' }}>$85,678</p>
              <p style={{ color: '#28a745', fontSize: '14px', marginTop: '8px' }}>↑ 8.2%</p>
            </div>
            
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'var(--bg-primary)', 
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Orders</h3>
              <p style={{ fontSize: '28px', fontWeight: '600' }}>1,234</p>
              <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '8px' }}>↓ 3.1%</p>
            </div>
            
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'var(--bg-primary)', 
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Conversion</h3>
              <p style={{ fontSize: '28px', fontWeight: '600' }}>3.4%</p>
              <p style={{ color: '#28a745', fontSize: '14px', marginTop: '8px' }}>↑ 0.8%</p>
            </div>
          </div>
          
          {/* Charts Section */}
          <div style={{ 
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600'
            }}>Analytics Overview</h3>
            <DashboardCharts />
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;