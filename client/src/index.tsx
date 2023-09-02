import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Page from "./pages/Table";
import * as test from "./firebase";
import TaskView from "./pages/TaskView";
import { taskTemplate } from "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/new" element={<TaskView taskProvider={taskTemplate()} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
