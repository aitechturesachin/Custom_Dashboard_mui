import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../styles/draggable-dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DraggableChartGrid = ({ 
  layouts, 
  onLayoutChange, 
  children 
}) => {
  return (
    <ResponsiveGridLayout
      className="draggable-chart-grid"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
      rowHeight={120}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
      compactType="vertical"
      preventCollision={false}
      margin={[20, 20]}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default DraggableChartGrid;