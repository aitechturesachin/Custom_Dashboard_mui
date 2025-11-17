import React, { useState, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import DraggableChartCard from './DraggableChartCard';
import { useTheme } from '../../hooks/useTheme';
import {
  revenueData,
  ordersData,
  categoryData,
  trafficData,
  biaxialData,
  scatterData,
} from './chartData';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import '../../styles/draggable.css';
import '../../styles/draggable-dashboard.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

const DraggableCharts = () => {
  const { theme } = useTheme();

  // Chart styling based on theme
  const chartColors = {
    text: theme === 'dark' ? '#e9ecef' : '#212529',
    grid: theme === 'dark' ? '#3a3f4a' : '#dee2e6',
  };

  // Initial layout configuration
  const initialLayout = [
    { i: 'revenue', x: 0, y: 0, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'orders', x: 6, y: 0, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'category', x: 0, y: 2, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'traffic', x: 6, y: 2, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'biaxial', x: 0, y: 4, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'scatter', x: 6, y: 4, w: 6, h: 2, minW: 4, minH: 2 },
  ];

  const [layouts, setLayouts] = useState({
    lg: initialLayout,
    md: initialLayout,
    sm: initialLayout.map(item => ({ ...item, w: 12 })),
    xs: initialLayout.map(item => ({ ...item, w: 12 })),
  });

  const [visibleCharts, setVisibleCharts] = useState([
    'revenue',
    'orders',
    'category',
    'traffic',
    'biaxial',
    'scatter',
  ]);

  // Handle layout change
  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    // Save to localStorage
    localStorage.setItem('dashboardLayout', JSON.stringify(allLayouts));
  };

  // Load layout from localStorage on mount
  React.useEffect(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      setLayouts(JSON.parse(savedLayout));
    }
  }, []);

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

  // Reset layout
  const handleResetLayout = () => {
    setLayouts({
      lg: initialLayout,
      md: initialLayout,
      sm: initialLayout.map(item => ({ ...item, w: 12 })),
      xs: initialLayout.map(item => ({ ...item, w: 12 })),
    });
    localStorage.removeItem('dashboardLayout');
    setVisibleCharts(['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter']);
  };

  // Common chart styles
  const commonChartSx = {
    '& .MuiChartsAxis-line': {
      stroke: chartColors.grid,
    },
    '& .MuiChartsAxis-tick': {
      stroke: chartColors.grid,
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: chartColors.text,
    },
    '& .MuiChartsLegend-series text': {
      fill: `${chartColors.text} !important`,
    },
  };

  // Chart definitions
  const charts = useMemo(() => ({
    revenue: (
      <DraggableChartCard
        id="revenue"
        title="Monthly Revenue"
        description="Revenue trend for the current year"
        onRemove={handleRemoveChart}
      >
        <BarChart
          xAxis={revenueData.xAxis}
          series={revenueData.series}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={commonChartSx}
        />
      </DraggableChartCard>
    ),
    orders: (
      <DraggableChartCard
        id="orders"
        title="Weekly Orders"
        description="Orders received this week"
        onRemove={handleRemoveChart}
      >
        <LineChart
          xAxis={ordersData.xAxis}
          series={ordersData.series.map(s => ({
            ...s,
            curve: 'natural',
            showMark: true,
          }))}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={{
            ...commonChartSx,
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
          }}
        />
      </DraggableChartCard>
    ),
    category: (
      <DraggableChartCard
        id="category"
        title="Sales by Category"
        description="Product category distribution"
        onRemove={handleRemoveChart}
      >
        <PieChart
          series={[
            {
              data: categoryData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
            },
          ]}
          height={300}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: 0,
              itemMarkWidth: 12,
              itemMarkHeight: 12,
              markGap: 8,
              itemGap: 10,
              labelStyle: {
                fill: chartColors.text,
                fontSize: 12,
              },
            },
          }}
          sx={{
            '& .MuiChartsLegend-series text': {
              fill: `${chartColors.text} !important`,
            },
          }}
        />
      </DraggableChartCard>
    ),
    traffic: (
      <DraggableChartCard
        id="traffic"
        title="Traffic by Device"
        description="User traffic across different devices"
        onRemove={handleRemoveChart}
      >
        <BarChart
          xAxis={trafficData.xAxis}
          series={trafficData.series}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={commonChartSx}
        />
      </DraggableChartCard>
    ),
    biaxial: (
      <DraggableChartCard
        id="biaxial"
        title="Revenue & Profit Margin Analysis"
        description="Dual-axis comparison of revenue and profit margins"
        onRemove={handleRemoveChart}
      >
        <LineChart
          xAxis={biaxialData.xAxis}
          yAxis={biaxialData.yAxis}
          series={biaxialData.series.map(s => ({
            ...s,
            showMark: true,
          }))}
          height={300}
          margin={{ top: 20, right: 60, bottom: 30, left: 70 }}
          leftAxis="revenue"
          rightAxis="margin"
          sx={{
            ...commonChartSx,
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
              fill: '#4dabf7',
            },
            '& .MuiChartsAxis-right .MuiChartsAxis-tickLabel': {
              fill: '#51cf66',
            },
          }}
        />
      </DraggableChartCard>
    ),
    scatter: (
      <DraggableChartCard
        id="scatter"
        title="Performance Metrics Correlation"
        description="Engagement vs Sales & Customer Satisfaction"
        onRemove={handleRemoveChart}
      >
        <ScatterChart
          xAxis={scatterData.xAxis}
          yAxis={scatterData.yAxis}
          series={scatterData.series}
          height={300}
          margin={{ top: 20, right: 80, bottom: 50, left: 70 }}
          leftAxis="sales"
          rightAxis="satisfaction"
          sx={{
            ...commonChartSx,
            '& .MuiChartsAxis-label': {
              fill: chartColors.text,
            },
            '& .MuiChartsAxis-left .MuiChartsAxis-label': {
              fill: '#845ef7',
            },
            '& .MuiChartsAxis-right .MuiChartsAxis-label': {
              fill: '#ff6b6b',
            },
            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
              fill: '#845ef7',
            },
            '& .MuiChartsAxis-right .MuiChartsAxis-tickLabel': {
              fill: '#ff6b6b',
            },
          }}
        />
      </DraggableChartCard>
    ),
  }), [chartColors, handleRemoveChart]);

  const removedCharts = ['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter']
    .filter(id => !visibleCharts.includes(id));

  return (
    <div className="draggable-charts-wrapper">
      {/* Control Panel */}
      <div className="charts-controls">
        <div className="controls-left">
          <h3 className="controls-title">Dashboard Charts</h3>
          {/* <p className="controls-description">Drag and drop to rearrange, resize corners to adjust size</p> */}
        </div>
        <div className="controls-right">
          {removedCharts.length > 0 && (
            <div className="restore-dropdown">
              <button className="control-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Chart
              </button>
              <div className="restore-menu">
                {removedCharts.map(chartId => (
                  <button
                    key={chartId}
                    onClick={() => handleRestoreChart(chartId)}
                    className="restore-item"
                  >
                    Restore {chartId.charAt(0).toUpperCase() + chartId.slice(1)} Chart
                  </button>
                ))}
              </div>
            </div>
          )}
          <button onClick={handleResetLayout} className="control-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3v5h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 21v-5h5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reset Layout
          </button>
        </div>
      </div>

      {/* Draggable Grid */}
      <ResponsiveGridLayout
        className="draggable-grid"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
        compactType="vertical"
        preventCollision={false}
      >
        {visibleCharts.map(chartId => (
          <div key={chartId}>
            {charts[chartId]}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DraggableCharts;