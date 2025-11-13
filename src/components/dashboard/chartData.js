// Sample data for charts
export const revenueData = {
  xAxis: [
    {
      scaleType: "band",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  ],
  series: [
    {
      data: [
        45000, 52000, 48000, 61000, 58000, 67000, 72000, 68000, 75000, 82000,
        78000, 85000,
      ],
      label: "Revenue",
      color: "#4dabf7",
    },
  ],
};

export const ordersData = {
  xAxis: [
    {
      scaleType: "band",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  series: [
    {
      data: [120, 145, 132, 168, 155, 189, 142],
      label: "Orders",
      color: "#51cf66",
      area: true,
    },
  ],
};

export const categoryData = [
  { id: 0, value: 35, label: "Electronics" },
  { id: 1, value: 25, label: "Clothing" },
  { id: 2, value: 20, label: "Food" },
  { id: 3, value: 12, label: "Books" },
  { id: 4, value: 8, label: "Others" },
];

export const trafficData = {
  xAxis: [
    {
      scaleType: "band",
      data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
  ],
  series: [
    {
      data: [1200, 800, 2400, 3200, 2800, 1600],
      label: "Desktop",
      color: "#845ef7",
    },
    {
      data: [800, 600, 1800, 2400, 2200, 1200],
      label: "Mobile",
      color: "#ff6b6b",
    },
    {
      data: [400, 300, 900, 1200, 1100, 600],
      label: "Tablet",
      color: "#ffd43b",
    },
  ],
};

export const customerGrowthData = {
  xAxis: [
    {
      scaleType: "band",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
  ],
  series: [
    {
      data: [2400, 2800, 3200, 3800],
      label: "New Customers",
      color: "#20c997",
    },
    {
      data: [1800, 2100, 2400, 2900],
      label: "Returning",
      color: "#ff8787",
    },
  ],
};

// Biaxial Line Chart Data (Revenue vs Profit Margin)
export const biaxialData = {
  xAxis: [
    {
      scaleType: "band",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  ],
  series: [
    {
      yAxisKey: "revenue",
      data: [
        45000, 52000, 95000, 61000, 58000, 67000, 72000, 68000, 75000, 82000,
        78000, 85000,
      ],
      label: "Revenue ($)",
      color: "#4dabf7",
      curve: "natural",
    },
    {
      yAxisKey: "margin",
      data: [
        65000, 78000, 82000, 75000, 68000, 45000, 67000, 58000, 61000, 48000,
        52000, 45000,
      ],
      label: "Profit Margin (%)",
      color: "#51cf66",
      curve: "natural",
    },
  ],
  yAxis: [
    {
      id: "revenue",
      scaleType: "linear",
    },
    {
      id: "margin",
      scaleType: "linear",
    },
  ],
};

// Multiple Y-Axes Scatter Chart Data (Performance Metrics)
export const scatterData = {
  xAxis: [
    {
      label: "Customer Engagement Score",
      min: 0,
      max: 100,
    },
  ],
  yAxis: [
    {
      id: "sales",
      label: "Sales ($K)",
      scaleType: "linear",
      min: 0,
      max: 150,
    },
    {
      id: "satisfaction",
      label: "Satisfaction (%)",
      scaleType: "linear",
      min: 0,
      max: 100,
    },
  ],
  series: [
    {
      yAxisKey: "sales",
      data: [
        { x: 25, y: 30, id: 1 },
        { x: 35, y: 45, id: 2 },
        { x: 42, y: 55, id: 3 },
        { x: 48, y: 62, id: 4 },
        { x: 55, y: 70, id: 5 },
        { x: 62, y: 82, id: 6 },
        { x: 68, y: 88, id: 7 },
        { x: 75, y: 95, id: 8 },
        { x: 82, y: 105, id: 9 },
        { x: 88, y: 118, id: 10 },
        { x: 92, y: 125, id: 11 },
        { x: 95, y: 135, id: 12 },
      ],
      label: "Sales Performance",
      color: "#845ef7",
    },
    {
      yAxisKey: "satisfaction",
      data: [
        { x: 28, y: 45, id: 1 },
        { x: 38, y: 52, id: 2 },
        { x: 45, y: 58, id: 3 },
        { x: 52, y: 65, id: 4 },
        { x: 58, y: 70, id: 5 },
        { x: 65, y: 75, id: 6 },
        { x: 70, y: 78, id: 7 },
        { x: 75, y: 82, id: 8 },
        { x: 80, y: 86, id: 9 },
        { x: 85, y: 90, id: 10 },
        { x: 90, y: 93, id: 11 },
        { x: 95, y: 96, id: 12 },
      ],
      label: "Customer Satisfaction",
      color: "#ff6b6b",
    },
  ],
};
