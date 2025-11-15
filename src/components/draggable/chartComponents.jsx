import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

// Common chart styles generator
export const getCommonChartStyles = (chartColors) => ({
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
});

// Revenue Bar Chart
export const RevenueChart = ({ data, chartColors }) => {
  return (
    <BarChart
      xAxis={data.xAxis}
      series={data.series}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      sx={getCommonChartStyles(chartColors)}
    />
  );
};

// Orders Line Chart
export const OrdersChart = ({ data, chartColors }) => {
  return (
    <LineChart
      xAxis={data.xAxis}
      series={data.series.map(s => ({
        ...s,
        curve: 'natural',
        showMark: true,
      }))}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      sx={{
        ...getCommonChartStyles(chartColors),
        '& .MuiLineElement-root': {
          strokeWidth: 2,
        },
      }}
    />
  );
};

// Category Pie Chart
export const CategoryChart = ({ data, chartColors }) => {
  return (
    <PieChart
      series={[
        {
          data: data,
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
  );
};

// Traffic Bar Chart
export const TrafficChart = ({ data, chartColors }) => {
  return (
    <BarChart
      xAxis={data.xAxis}
      series={data.series}
      margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
      sx={getCommonChartStyles(chartColors)}
    />
  );
};

// Biaxial Line Chart
export const BiaxialChart = ({ data, chartColors }) => {
  return (
    <LineChart
      xAxis={data.xAxis}
      yAxis={data.yAxis}
      series={data.series.map(s => ({
        ...s,
        showMark: true,
      }))}
      margin={{ top: 20, right: 60, bottom: 30, left: 70 }}
      leftAxis="revenue"
      rightAxis="margin"
      sx={{
        ...getCommonChartStyles(chartColors),
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
  );
};

// Scatter Chart
export const ScatterChartComponent = ({ data, chartColors }) => {
  return (
    <ScatterChart
      xAxis={data.xAxis}
      yAxis={data.yAxis}
      series={data.series}
      margin={{ top: 20, right: 80, bottom: 50, left: 70 }}
      leftAxis="sales"
      rightAxis="satisfaction"
      sx={{
        ...getCommonChartStyles(chartColors),
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
  );
};