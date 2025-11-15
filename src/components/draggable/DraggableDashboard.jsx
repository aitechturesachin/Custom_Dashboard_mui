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

  const allChartIds = ['revenue', 'orders', 'category', 'traffic', 'biaxial', 'scatter'];

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

  // Load visible charts from localStorage - FIXED
  const [visibleCharts, setVisibleCharts] = useState(() => {
    const savedVisibleCharts = localStorage.getItem('draggableVisibleCharts');
    if (savedVisibleCharts) {
      return JSON.parse(savedVisibleCharts);
    }
    return allChartIds;
  });

  // Chart filters state
  const [chartFilters, setChartFilters] = useState(() => {
    const savedFilters = localStorage.getItem('draggableChartFilters');
    return savedFilters ? JSON.parse(savedFilters) : {};
  });

  // Chart settings state
  const [chartSettings, setChartSettings] = useState(() => {
    const savedSettings = localStorage.getItem('draggableChartSettings');
    return savedSettings ? JSON.parse(savedSettings) : {};
  });

  // Presets state
  const [presets, setPresets] = useState(getPresets());

  // Modal states
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareURL, setShareURL] = useState('');

  // Check for shared dashboard URL on mount
  useEffect(() => {
    const sharedData = parseShareableURL();
    if (sharedData) {
      setLayouts(sharedData.layouts);
      setVisibleCharts(sharedData.visibleCharts);
      // Save shared data to localStorage
      localStorage.setItem('draggableDashboardLayout', JSON.stringify(sharedData.layouts));
      localStorage.setItem('draggableVisibleCharts', JSON.stringify(sharedData.visibleCharts));
    }
  }, []);

  // Clean up layout when charts are removed - IMPORTANT
  useEffect(() => {
    // Remove layout items for hidden charts
    const cleanedLayouts = {};
    Object.keys(layouts).forEach(breakpoint => {
      cleanedLayouts[breakpoint] = layouts[breakpoint].filter(item => 
        visibleCharts.includes(item.i)
      );
    });
    
    // Only update if there's a difference
    const hasChanges = Object.keys(layouts).some(breakpoint => 
      layouts[breakpoint].length !== cleanedLayouts[breakpoint].length
    );

    if (hasChanges) {
      setLayouts(cleanedLayouts);
    }
  }, [visibleCharts]);

  // Save visible charts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('draggableVisibleCharts', JSON.stringify(visibleCharts));
  }, [visibleCharts]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('draggableChartFilters', JSON.stringify(chartFilters));
  }, [chartFilters]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('draggableChartSettings', JSON.stringify(chartSettings));
  }, [chartSettings]);

  // Handle layout change
  const handleLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem('draggableDashboardLayout', JSON.stringify(allLayouts));
  };

  // Handle chart removal
  const handleRemoveChart = (chartId) => {
    setVisibleCharts(prev => {
      const newVisible = prev.filter(id => id !== chartId);
      // Immediately save to localStorage
      localStorage.setItem('draggableVisibleCharts', JSON.stringify(newVisible));
      return newVisible;
    });
  };

  // Handle chart restoration
  const handleRestoreChart = (chartId) => {
    if (!visibleCharts.includes(chartId)) {
      setVisibleCharts(prev => {
        const newVisible = [...prev, chartId];
        // Immediately save to localStorage
        localStorage.setItem('draggableVisibleCharts', JSON.stringify(newVisible));
        
        // Add default layout for restored chart
        const defaultLayoutItem = initialLayout.find(item => item.i === chartId);
        if (defaultLayoutItem) {
          // Find empty space or place at bottom
          const newLayouts = { ...layouts };
          Object.keys(newLayouts).forEach(breakpoint => {
            const maxY = Math.max(...newLayouts[breakpoint].map(item => item.y + item.h), 0);
            const isSmallScreen = breakpoint === 'sm' || breakpoint === 'xs';
            newLayouts[breakpoint] = [
              ...newLayouts[breakpoint],
              {
                ...defaultLayoutItem,
                y: maxY,
                w: isSmallScreen ? 12 : defaultLayoutItem.w,
              }
            ];
          });
          setLayouts(newLayouts);
          localStorage.setItem('draggableDashboardLayout', JSON.stringify(newLayouts));
        }
        
        return newVisible;
      });
    }
  };

  // Handle filter change
  const handleFilterChange = (chartId, filters) => {
    setChartFilters(prev => ({
      ...prev,
      [chartId]: filters,
    }));
  };

  // Handle settings change
  const handleSettingsChange = (chartId, settings) => {
    setChartSettings(prev => ({
      ...prev,
      [chartId]: settings,
    }));
  };

  // Reset layout to default
  const handleResetLayout = () => {
    const defaultLayouts = {
      lg: initialLayout,
      md: initialLayout,
      sm: initialLayout.map(item => ({ ...item, w: 12 })),
      xs: initialLayout.map(item => ({ ...item, w: 12 })),
    };
    
    setLayouts(defaultLayouts);
    setVisibleCharts(allChartIds);
    setChartFilters({});
    setChartSettings({});
    
    // Clear all from localStorage
    localStorage.setItem('draggableDashboardLayout', JSON.stringify(defaultLayouts));
    localStorage.setItem('draggableVisibleCharts', JSON.stringify(allChartIds));
    localStorage.removeItem('draggableChartFilters');
    localStorage.removeItem('draggableChartSettings');
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
      
      // Save imported data
      localStorage.setItem('draggableDashboardLayout', JSON.stringify(data.layouts));
      localStorage.setItem('draggableVisibleCharts', JSON.stringify(data.visibleCharts));
      
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
    
    // Save preset data to localStorage
    localStorage.setItem('draggableDashboardLayout', JSON.stringify(preset.layouts));
    localStorage.setItem('draggableVisibleCharts', JSON.stringify(preset.visibleCharts));
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

  // Chart definitions with filtered data and settings
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
  const removedCharts = allChartIds.filter(id => !visibleCharts.includes(id));

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
          if (!chart) return null; // Safety check
          
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