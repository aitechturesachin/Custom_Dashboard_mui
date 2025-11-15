import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

// Common chart styles generator with settings
export const getCommonChartStyles = (chartColors, settings = {}) => {
  const defaultSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#4dabf7',
    secondaryColor: '#51cf66',
    ...settings,
  };

  return {
    '& .MuiChartsAxis-line': {
      stroke: chartColors.grid,
      display: defaultSettings.showGrid ? 'block' : 'none',
    },
    '& .MuiChartsAxis-tick': {
      stroke: chartColors.grid,
      display: defaultSettings.showGrid ? 'block' : 'none',
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: chartColors.text,
      fontSize: `${defaultSettings.fontSize}px`,
    },
    '& .MuiChartsLegend-root': {
      display: defaultSettings.showLegend ? 'block' : 'none',
    },
    '& .MuiChartsLegend-series text': {
      fill: `${chartColors.text} !important`,
      fontSize: `${defaultSettings.fontSize}px`,
    },
    '& .MuiChartsGrid-line': {
      stroke: chartColors.grid,
      strokeDasharray: '3 3',
      display: defaultSettings.showGrid ? 'block' : 'none',
    },
  };
};

// Revenue Bar Chart
export const RevenueChart = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#4dabf7',
    ...settings,
  };

  return (
    <BarChart
      xAxis={data.xAxis}
      series={data.series.map(s => ({
        ...s,
        color: chartSettings.primaryColor,
      }))}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      grid={{ horizontal: chartSettings.showGrid }}
      sx={{
        ...getCommonChartStyles(chartColors, chartSettings),
        '& .MuiBarElement-root': {
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};

// Orders Line Chart
export const OrdersChart = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#51cf66',
    ...settings,
  };

  return (
    <LineChart
      xAxis={data.xAxis}
      series={data.series.map(s => ({
        ...s,
        curve: 'natural',
        showMark: true,
        color: chartSettings.primaryColor,
      }))}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      grid={{ horizontal: chartSettings.showGrid }}
      sx={{
        ...getCommonChartStyles(chartColors, chartSettings),
        '& .MuiLineElement-root': {
          strokeWidth: 2,
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};

// Category Pie Chart
export const CategoryChart = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#4dabf7',
    secondaryColor: '#51cf66',
    ...settings,
  };

  // Custom colors for pie slices
  const customColors = [
    chartSettings.primaryColor,
    chartSettings.secondaryColor,
    '#ff6b6b',
    '#ffd43b',
    '#845ef7',
  ];

  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: customColors[index % customColors.length],
  }));

  return (
    <PieChart
      series={[
        {
          data: dataWithColors,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 2,
          cornerRadius: 5,
        },
      ]}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      slotProps={{
        legend: chartSettings.showLegend ? {
          direction: 'column',
          position: { vertical: 'middle', horizontal: 'right' },
          padding: 0,
          itemMarkWidth: 12,
          itemMarkHeight: 12,
          markGap: 8,
          itemGap: 10,
          labelStyle: {
            fill: chartColors.text,
            fontSize: chartSettings.fontSize,
          },
        } : { hidden: true },
      }}
      sx={{
        '& .MuiChartsLegend-series text': {
          fill: `${chartColors.text} !important`,
          fontSize: `${chartSettings.fontSize}px`,
        },
        '& .MuiPieArc-root': {
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};

// Traffic Bar Chart
export const TrafficChart = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#845ef7',
    secondaryColor: '#ff6b6b',
    ...settings,
  };

  const customColors = [
    chartSettings.primaryColor,
    chartSettings.secondaryColor,
    '#ffd43b',
  ];

  return (
    <BarChart
      xAxis={data.xAxis}
      series={data.series.map((s, index) => ({
        ...s,
        color: customColors[index % customColors.length],
      }))}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      grid={{ horizontal: chartSettings.showGrid }}
      sx={{
        ...getCommonChartStyles(chartColors, chartSettings),
        '& .MuiBarElement-root': {
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};

// Biaxial Line Chart
export const BiaxialChart = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#4dabf7',
    secondaryColor: '#51cf66',
    ...settings,
  };

  return (
    <LineChart
      xAxis={data.xAxis}
      yAxis={data.yAxis}
      series={data.series.map((s, index) => ({
        ...s,
        showMark: true,
        color: index === 0 ? chartSettings.primaryColor : chartSettings.secondaryColor,
      }))}
      margin={{ top: 20, right: 60, bottom: 30, left: 70 }}
      leftAxis="revenue"
      rightAxis="margin"
      grid={{ horizontal: chartSettings.showGrid }}
      sx={{
        ...getCommonChartStyles(chartColors, chartSettings),
        '& .MuiLineElement-root': {
          strokeWidth: 2,
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          fill: chartSettings.primaryColor,
          fontSize: `${chartSettings.fontSize}px`,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-tickLabel': {
          fill: chartSettings.secondaryColor,
          fontSize: `${chartSettings.fontSize}px`,
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};

// Scatter Chart
export const ScatterChartComponent = ({ data, chartColors, settings = {} }) => {
  const chartSettings = {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    fontSize: 12,
    primaryColor: '#845ef7',
    secondaryColor: '#ff6b6b',
    ...settings,
  };

  return (
    <ScatterChart
      xAxis={data.xAxis}
      yAxis={data.yAxis}
      series={data.series.map((s, index) => ({
        ...s,
        color: index === 0 ? chartSettings.primaryColor : chartSettings.secondaryColor,
      }))}
      margin={{ top: 20, right: 80, bottom: 50, left: 70 }}
      leftAxis="sales"
      rightAxis="satisfaction"
      grid={{ horizontal: chartSettings.showGrid, vertical: chartSettings.showGrid }}
      sx={{
        ...getCommonChartStyles(chartColors, chartSettings),
        '& .MuiChartsAxis-label': {
          fill: chartColors.text,
          fontSize: `${chartSettings.fontSize}px`,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-label': {
          fill: chartSettings.primaryColor,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-label': {
          fill: chartSettings.secondaryColor,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          fill: chartSettings.primaryColor,
          fontSize: `${chartSettings.fontSize}px`,
        },
        '& .MuiChartsAxis-right .MuiChartsAxis-tickLabel': {
          fill: chartSettings.secondaryColor,
          fontSize: `${chartSettings.fontSize}px`,
        },
        '& .MuiScatterSeries-root circle': {
          transition: chartSettings.animationEnabled ? 'all 0.3s ease' : 'none',
        },
      }}
      skipAnimation={!chartSettings.animationEnabled}
    />
  );
};