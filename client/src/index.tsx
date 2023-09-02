import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import Page from "./pages/Table";
import * as test from "./firebase";
import TaskView from "./pages/TaskView";
import { getTaskByID, taskTemplate } from "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/new" element={<TaskView create={true} />} />
        <Route path="/task/:id" element={<TaskView create={false}/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
