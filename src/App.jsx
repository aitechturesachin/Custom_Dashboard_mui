import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import StatsDashboard from "./components/stats/StatsDashboard";
import DraggableDashboard from "./components/draggable/DraggableDashboard";
import "./styles/theme.css";
import "./styles/print.css"; // Add this

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <StatsDashboard />
        <DraggableDashboard />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
