// Filter chart data by date range
export const filterByDateRange = (data, startDate, endDate) => {
  if (!startDate || !endDate) return data;
  
  return {
    ...data,
    xAxis: data.xAxis,
    series: data.series.map(series => ({
      ...series,
      data: series.data, // In real app, filter by actual dates
    })),
  };
};

// Filter chart data by value range
export const filterByValueRange = (data, min, max) => {
  if (min === null && max === null) return data;
  
  return {
    ...data,
    series: data.series.map(series => ({
      ...series,
      data: series.data.filter(value => {
        if (min !== null && value < min) return false;
        if (max !== null && value > max) return false;
        return true;
      }),
    })),
  };
};

// Filter pie chart by category
export const filterPieByCategory = (data, selectedCategories) => {
  if (!selectedCategories || selectedCategories.length === 0) return data;
  return data.filter(item => selectedCategories.includes(item.label));
};

// Search/filter by keyword
export const filterByKeyword = (data, keyword) => {
  if (!keyword) return data;
  const lowerKeyword = keyword.toLowerCase();
  
  if (Array.isArray(data)) {
    return data.filter(item => 
      item.label?.toLowerCase().includes(lowerKeyword)
    );
  }
  
  return data;
};