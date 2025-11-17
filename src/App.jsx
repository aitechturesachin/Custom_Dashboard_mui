import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import DraggableDashboard from "./components/draggable/DraggableDashboard";
import "./styles/theme.css";
import "./styles/print.css"; // Add this

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        {/* ... rest of your App.jsx code ... */}
        <DraggableDashboard />
        {/* <DashboboardChart /> */}
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
