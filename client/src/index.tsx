import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import TaskTable from "./pages/TaskTable";
import * as test from "./firebase";
import TaskView from "./pages/TaskView";
import { getTaskByID } from "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TaskTable />} />
        <Route path="/table" element={<TaskTable />} />
        <Route path="/new" element={<TaskView create={true} />} />
        <Route path="/task/:id" element={<TaskView create={false}/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
