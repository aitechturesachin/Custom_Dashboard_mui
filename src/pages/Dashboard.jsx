import React from 'react';
import DraggableDashboard from '../components/draggable/DraggableDashboard';
import StatsDashboard from '../components/stats/StatsDashboard';

const Dashboard = () => {
  return (
    <section>
      <header style={{ marginBottom: '24px' }}>
        <h2>Customize Dashboard</h2>
        <p>Drag, resize, and arrange widgets to tailor your workspace.</p>
      </header>
      <StatsDashboard />
      <DraggableDashboard />
    </section>
  );
};

export default Dashboard;

