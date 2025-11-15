import React, { useState, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import DraggableChartCard from './DraggableChartCard';
import DraggableChartGrid from './DraggableChartGrid';
import ControlPanel from './ControlPanel';
import {
  RevenueChart,
  OrdersChart,
  CategoryChart,
  TrafficChart,
  BiaxialChart,
  ScatterChartComponent,
} from './chartComponents.jsx'; // Add .jsx extension
import {
  revenueData,
  ordersData,
  categoryData,
  trafficData,
  biaxialData,
  scatterData,
} from '../dashboard/chartData';
import '../../styles/draggable-dashboard.css';

const DraggableDashboard = () => {
  const { theme } = useTheme();

  // Chart colors based on theme
  const chartColors = {
    text: theme === 'dark' ? '#e9ecef' : '#212529',
    grid: theme === 'dark' ? '#3a3f4a' : '#dee2e6',
  };

  // Initial layout configuration
  const initialLayout = [
    { i: 'revenue', x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 3 },
    { i: 'orders', x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 3 },
    { i: 'category', x: 0, y: 3, w: 6, h: 3, minW: 4, minH: 3 },
    { i: 'traffic', x: 6, y: 3, w: 6, h: 3, minW: 4, minH: 3 },
    { i: 'biaxial', x: 0, y: 6, w: 6, h: 3, minW: 4, minH: 3 },
    { i: 'scatter', x: 6, y: 6, w: 6, h: 3, minW: 4, minH: 3 },
  ];

  // Load saved layout from localStorage
  const [layouts, setLayouts] = useState(() => {
    const savedLayout = localStorage.getItem('draggableDashboardLayout');
    if (savedLayout) {
      return JSON.parse(savedLayout);
    }
    return {
      lg: initialLayout,
      md: initialLayout,
      sm: initialLayout.map(item => ({ ...item, w: 12 })),
      xs: initialLayout.map(item => ({ ...item, w: 12 })),
    };
  });

  // Visible charts state
  const [visibleCharts, setVisibleCharts] = useState([
    'revenue',
    'orders',
    'category',
    'traffic',
    'biaxial',
    'scatter',
  ]);

  // Handle layout change
  const handleLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem('draggableDashboardLayout', JSON.stringify(allLayouts));
  };

  // Handle chart removal
  const handleRemoveChart = (chartId) => {
    setVisibleCharts(prev => prev.filter(id => id !== chartId));
  };

  // Handle chart restoration
  const handleRestoreChart = (chartId) => {
    if (!visibleCharts.includes(chartId)) {
      setVisibleCharts(prev => [...prev, chartId]);
    }
  };

  // Reset layout to default
  const handleResetLayout = () => {
    setLayouts({
      lg: initialLayout,
      md: initialLayout,
      sm: initialLayout.map(item => ({ ...item, w: 12 })),
      xs: initialLayout.map(item => ({ ...item, w: 12 })),
    });
    localStorage.removeItem('draggableDashboardLayout');
    setVisibleCharts(['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter']);
  };

  // Chart definitions
  const chartDefinitions = useMemo(() => ({
    revenue: {
      title: 'Monthly Revenue',
      description: 'Revenue trend for the current year',
      component: <RevenueChart data={revenueData} chartColors={chartColors} />,
    },
    orders: {
      title: 'Weekly Orders',
      description: 'Orders received this week',
      component: <OrdersChart data={ordersData} chartColors={chartColors} />,
    },
    category: {
      title: 'Sales by Category',
      description: 'Product category distribution',
      component: <CategoryChart data={categoryData} chartColors={chartColors} />,
    },
    traffic: {
      title: 'Traffic by Device',
      description: 'User traffic across different devices',
      component: <TrafficChart data={trafficData} chartColors={chartColors} />,
    },
    biaxial: {
      title: 'Revenue & Profit Margin Analysis',
      description: 'Dual-axis comparison of revenue and profit margins',
      component: <BiaxialChart data={biaxialData} chartColors={chartColors} />,
    },
    scatter: {
      title: 'Performance Metrics Correlation',
      description: 'Engagement vs Sales & Customer Satisfaction',
      component: <ScatterChartComponent data={scatterData} chartColors={chartColors} />,
    },
  }), [chartColors]);

  // Get removed charts
  const removedCharts = ['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter']
    .filter(id => !visibleCharts.includes(id));

  return (
    <div className="draggable-dashboard-wrapper">
      <ControlPanel
        removedCharts={removedCharts}
        onRestore={handleRestoreChart}
        onReset={handleResetLayout}
      />

      <DraggableChartGrid
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
      >
        {visibleCharts.map(chartId => {
          const chart = chartDefinitions[chartId];
          return (
            <div key={chartId}>
              <DraggableChartCard
                id={chartId}
                title={chart.title}
                description={chart.description}
                onRemove={handleRemoveChart}
              >
                {chart.component}
              </DraggableChartCard>
            </div>
          );
        })}
      </DraggableChartGrid>
    </div>
  );
};

export default DraggableDashboard;