// Export layout as JSON with all state
export const exportLayout = (layouts, visibleCharts, filters = {}, settings = {}) => {
  const exportData = {
    name: 'Dashboard Layout',
    timestamp: new Date().toISOString(),
    layouts: layouts,
    visibleCharts: visibleCharts,
    filters: filters,
    settings: settings,
    version: '1.0',
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashboard-layout-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Import layout from JSON
export const importLayout = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.layouts || !data.visibleCharts) {
          reject(new Error('Invalid layout file format'));
          return;
        }
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Generate shareable URL
export const generateShareableURL = (layouts, visibleCharts) => {
  const data = {
    layouts: layouts,
    visibleCharts: visibleCharts,
  };
  const encodedData = btoa(JSON.stringify(data));
  const baseURL = window.location.origin + window.location.pathname;
  return `${baseURL}?dashboard=${encodedData}`;
};

// Parse shareable URL
export const parseShareableURL = () => {
  const params = new URLSearchParams(window.location.search);
  const dashboardData = params.get('dashboard');
  if (dashboardData) {
    try {
      return JSON.parse(atob(dashboardData));
    } catch (error) {
      console.error('Failed to parse dashboard URL:', error);
      return null;
    }
  }
  return null;
};

// Save preset
export const savePreset = (name, layouts, visibleCharts) => {
  const presets = getPresets();
  const newPreset = {
    id: Date.now().toString(),
    name,
    layouts,
    visibleCharts,
    createdAt: new Date().toISOString(),
  };
  presets.push(newPreset);
  localStorage.setItem('dashboardPresets', JSON.stringify(presets));
  return newPreset;
};

// Get all presets
export const getPresets = () => {
  const presetsJSON = localStorage.getItem('dashboardPresets');
  return presetsJSON ? JSON.parse(presetsJSON) : [];
};

// Delete preset
export const deletePreset = (presetId) => {
  const presets = getPresets();
  const filtered = presets.filter(p => p.id !== presetId);
  localStorage.setItem('dashboardPresets', JSON.stringify(filtered));
};

// Print layout
export const printDashboard = () => {
  window.print();
};

// Clear all dashboard data
export const clearAllDashboardData = () => {
  localStorage.removeItem('draggableDashboardLayout');
  localStorage.removeItem('draggableVisibleCharts');
  localStorage.removeItem('draggableChartFilters');
  localStorage.removeItem('draggableChartSettings');
};