import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import ChartCard from './ChartCard';
import { useTheme } from '../../hooks/useTheme';
import {
  revenueData,
  ordersData,
  categoryData,
  trafficData,
  biaxialData,
  scatterData,
} from './chartData';
import '../../styles/charts.css';

const DashboardCharts = () => {
  const { theme } = useTheme();

  // Chart styling based on theme
  const chartColors = {
    text: theme === 'dark' ? '#e9ecef' : '#212529',
    grid: theme === 'dark' ? '#3a3f4a' : '#dee2e6',
  };

  return (
    <div className="charts-container">
      {/* Revenue Chart */}
      <ChartCard 
        title="mmmmmmm Revenue" 
        description="Revenue trend for the current year"
      >
        <BarChart
          xAxis={revenueData.xAxis}
          series={revenueData.series}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={{
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
          }}
        />
      </ChartCard>

      {/* Orders Chart */}
      <ChartCard 
        title="Weekly Orders" 
        description="Orders received this week"
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
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
          }}
        />
      </ChartCard>

      {/* Category Distribution Chart */}
      <ChartCard 
        title="Sales by Category" 
        description="Product category distribution"
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
      </ChartCard>

      {/* Traffic Sources Chart */}
      <ChartCard 
        title="Traffic by Device" 
        description="User traffic across different devices"
      >
        <BarChart
          xAxis={trafficData.xAxis}
          series={trafficData.series}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={{
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
          }}
        />
      </ChartCard>

      {/* Biaxial Line Chart - Revenue vs Profit Margin */}
      <ChartCard 
        title="Revenue & Profit Margin Analysis" 
        description="Dual-axis comparison of revenue and profit margins"
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
      </ChartCard>

      {/* Multiple Y-Axes Scatter Chart */}
      <ChartCard 
        title="Performance Metrics Correlation" 
        description="Engagement vs Sales & Customer Satisfaction"
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
            '& .MuiChartsAxis-line': {
              stroke: chartColors.grid,
            },
            '& .MuiChartsAxis-tick': {
              stroke: chartColors.grid,
            },
            '& .MuiChartsAxis-tickLabel': {
              fill: chartColors.text,
            },
            '& .MuiChartsAxis-label': {
              fill: chartColors.text,
            },
            '& .MuiChartsLegend-series text': {
              fill: `${chartColors.text} !important`,
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
      </ChartCard>
    </div>
  );
};

export default DashboardCharts;