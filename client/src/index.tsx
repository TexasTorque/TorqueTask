import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import TaskTable from "./pages/TaskTable";
import TaskView from "./pages/TaskView";
import TaskGantt from "./pages/TaskGantt";
import UserGuide from "./pages/UserGuide";
import NotFound from "./pages/NotFound";

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
        <Route path="/gantt" element={<TaskGantt />} />
        <Route path="/gyatt" element={<TaskGantt />} />
        <Route path="/docs" element={<UserGuide />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
