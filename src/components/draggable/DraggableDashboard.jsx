import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import DraggableChartCard from './DraggableChartCard';
import DraggableChartGrid from './DraggableChartGrid';
import AdvancedControlPanel from './AdvancedControlPanel';
import LayoutPresetsModal from './LayoutPresetsModal';
import ShareDashboardModal from './ShareDashboardModal';
import {
  RevenueChart,
  OrdersChart,
  CategoryChart,
  TrafficChart,
  BiaxialChart,
  ScatterChartComponent,
} from './chartComponents';
import {
  revenueData,
  ordersData,
  categoryData,
  trafficData,
  biaxialData,
  scatterData,
} from '../dashboard/chartData';
import { applyFilters } from '../../utils/chartFilters';
import {
  exportLayout,
  importLayout,
  generateShareableURL,
  parseShareableURL,
  savePreset,
  getPresets,
  printDashboard,
} from '../../utils/dashboardUtils';
import '../../styles/draggable-dashboard.css';
import '../../styles/print.css';

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

  // Check for shared dashboard URL
  useEffect(() => {
    const sharedData = parseShareableURL();
    if (sharedData) {
      setLayouts(sharedData.layouts);
      setVisibleCharts(sharedData.visibleCharts);
    }
  }, []);

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

  // Chart filters state
  const [chartFilters, setChartFilters] = useState({});

  // Chart settings state - NEW
  const [chartSettings, setChartSettings] = useState({});

  // Presets state
  const [presets, setPresets] = useState(getPresets());

  // Modal states
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareURL, setShareURL] = useState('');

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

  // Handle filter change
  const handleFilterChange = (chartId, filters) => {
    setChartFilters(prev => ({
      ...prev,
      [chartId]: filters,
    }));
  };

  // Handle settings change - NEW
  const handleSettingsChange = (chartId, settings) => {
    setChartSettings(prev => ({
      ...prev,
      [chartId]: settings,
    }));
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
    setChartFilters({});
    setChartSettings({}); // Clear all settings
  };

  // Export layout
  const handleExport = () => {
    exportLayout(layouts, visibleCharts);
  };

  // Import layout
  const handleImport = async (file) => {
    try {
      const data = await importLayout(file);
      setLayouts(data.layouts);
      setVisibleCharts(data.visibleCharts);
      alert('Layout imported successfully!');
    } catch (error) {
      alert('Failed to import layout: ' + error.message);
    }
  };

  // Save preset
  const handleSavePreset = (name) => {
    savePreset(name, layouts, visibleCharts);
    setPresets(getPresets());
    alert(`Preset "${name}" saved successfully!`);
  };

  // Load preset
  const handleLoadPreset = (preset) => {
    setLayouts(preset.layouts);
    setVisibleCharts(preset.visibleCharts);
  };

  // Share dashboard
  const handleShare = () => {
    const url = generateShareableURL(layouts, visibleCharts);
    setShareURL(url);
    setShowShareModal(true);
  };

  // Print dashboard
  const handlePrint = () => {
    printDashboard();
  };

  // Get filtered data for each chart
  const getFilteredData = (chartId, originalData, chartType) => {
    const filters = chartFilters[chartId];
    if (!filters) return originalData;
    return applyFilters(originalData, filters, chartType);
  };

  // Chart definitions with filtered data and settings - UPDATED
  const chartDefinitions = useMemo(() => {
    const filteredRevenueData = getFilteredData('revenue', revenueData, 'bar');
    const filteredOrdersData = getFilteredData('orders', ordersData, 'line');
    const filteredCategoryData = getFilteredData('category', categoryData, 'category');
    const filteredTrafficData = getFilteredData('traffic', trafficData, 'bar');
    const filteredBiaxialData = getFilteredData('biaxial', biaxialData, 'line');
    const filteredScatterData = getFilteredData('scatter', scatterData, 'scatter');

    return {
      revenue: {
        title: 'Monthly Revenue',
        description: 'Revenue trend for the current year',
        component: <RevenueChart 
          data={filteredRevenueData} 
          chartColors={chartColors}
          settings={chartSettings.revenue}
        />,
        type: 'bar',
      },
      orders: {
        title: 'Weekly Orders',
        description: 'Orders received this week',
        component: <OrdersChart 
          data={filteredOrdersData} 
          chartColors={chartColors}
          settings={chartSettings.orders}
        />,
        type: 'line',
      },
      category: {
        title: 'Sales by Category',
        description: 'Product category distribution',
        component: <CategoryChart 
          data={filteredCategoryData} 
          chartColors={chartColors}
          settings={chartSettings.category}
        />,
        type: 'category',
      },
      traffic: {
        title: 'Traffic by Device',
        description: 'User traffic across different devices',
        component: <TrafficChart 
          data={filteredTrafficData} 
          chartColors={chartColors}
          settings={chartSettings.traffic}
        />,
        type: 'bar',
      },
      biaxial: {
        title: 'Revenue & Profit Margin Analysis',
        description: 'Dual-axis comparison of revenue and profit margins',
        component: <BiaxialChart 
          data={filteredBiaxialData} 
          chartColors={chartColors}
          settings={chartSettings.biaxial}
        />,
        type: 'line',
      },
      scatter: {
        title: 'Performance Metrics Correlation',
        description: 'Engagement vs Sales & Customer Satisfaction',
        component: <ScatterChartComponent 
          data={filteredScatterData} 
          chartColors={chartColors}
          settings={chartSettings.scatter}
        />,
        type: 'scatter',
      },
    };
  }, [chartColors, chartFilters, chartSettings]);

  // Get removed charts
  const removedCharts = ['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter']
    .filter(id => !visibleCharts.includes(id));

  return (
    <div className="draggable-dashboard-wrapper">
      <AdvancedControlPanel
        removedCharts={removedCharts}
        onRestore={handleRestoreChart}
        onReset={handleResetLayout}
        onExport={handleExport}
        onImport={handleImport}
        onSavePreset={() => setShowPresetModal(true)}
        onLoadPreset={handleLoadPreset}
        onShare={handleShare}
        onPrint={handlePrint}
        presets={presets}
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
                chartType={chart.type}
                onFilterChange={handleFilterChange}
                onSettingsChange={handleSettingsChange}
              >
                {chart.component}
              </DraggableChartCard>
            </div>
          );
        })}
      </DraggableChartGrid>

      {/* Modals */}
      <LayoutPresetsModal
        isOpen={showPresetModal}
        onClose={() => setShowPresetModal(false)}
        onSave={handleSavePreset}
      />

      <ShareDashboardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareURL={shareURL}
      />
    </div>
  );
};

export default DraggableDashboard;