import React from 'react';
import DraggableDashboard from '../components/draggable/DraggableDashboard';

const CustomizeDashboard = () => (
  <section>
    <header style={{ marginBottom: '24px' }}>
      <h2>Customize Dashboard</h2>
      <p>Drag, resize, and arrange widgets to tailor your workspace.</p>
    </header>
    <DraggableDashboard />
  </section>
);

export default CustomizeDashboard;

