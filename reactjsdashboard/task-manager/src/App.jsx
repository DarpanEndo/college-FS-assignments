import React from "react";
import { TaskProvider } from "./context/TaskContext";
import DashboardHeader from "./components/DashboardHeader";
import TaskList from "./components/TaskList";
import "./styles/app.css";

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <DashboardHeader />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
