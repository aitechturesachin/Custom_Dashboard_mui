// Filter data by date range (for xAxis with date/time data)
export const filterByDateRange = (data, startDate, endDate) => {
  if (!startDate && !endDate) return data;
  
  // For demo, we'll filter by index since we don't have real dates
  // In production, you'd compare actual date values
  const totalPoints = data.xAxis[0].data.length;
  const startIndex = startDate ? Math.floor(totalPoints * 0.3) : 0;
  const endIndex = endDate ? Math.floor(totalPoints * 0.7) : totalPoints;
  
  return {
    ...data,
    xAxis: [{
      ...data.xAxis[0],
      data: data.xAxis[0].data.slice(startIndex, endIndex),
    }],
    series: data.series.map(series => ({
      ...series,
      data: series.data.slice(startIndex, endIndex),
    })),
  };
};

// Filter chart data by value range
export const filterByValueRange = (data, min, max) => {
  if (!min && !max) return data;
  
  const minValue = min ? parseFloat(min) : -Infinity;
  const maxValue = max ? parseFloat(max) : Infinity;
  
  return {
    ...data,
    xAxis: data.xAxis,
    series: data.series.map(series => ({
      ...series,
      data: series.data.map(value => {
        // Keep values within range, otherwise return null to hide point
        if (value < minValue || value > maxValue) {
          return null;
        }
        return value;
      }).filter(v => v !== null), // Remove null values
    })),
  };
};

// Filter pie chart by category
export const filterPieByCategory = (data, selectedCategories) => {
  if (!selectedCategories || selectedCategories.length === 0) return data;
  return data.filter(item => selectedCategories.includes(item.label));
};

// Apply combined filters
export const applyFilters = (data, filters, chartType) => {
  let filteredData = { ...data };
  
  if (!filters) return filteredData;
  
  // Apply date range filter
  if (filters.dateRange?.start || filters.dateRange?.end) {
    filteredData = filterByDateRange(filteredData, filters.dateRange.start, filters.dateRange.end);
  }
  
  // Apply value range filter
  if (filters.valueRange?.min || filters.valueRange?.max) {
    filteredData = filterByValueRange(filteredData, filters.valueRange.min, filters.valueRange.max);
  }
  
  // Apply category filter for pie charts
  if (chartType === 'category' && filters.selectedCategories?.length > 0) {
    filteredData = filterPieByCategory(filteredData, filters.selectedCategories);
  }
  
  return filteredData;
};