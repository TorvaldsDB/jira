import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import Kanban from "screens/Kanban";
import Epic from "screens/Epic";

const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>

      <Routes>
        <Route path="/kanban" element={<Kanban />}></Route>
        <Route path="/epic" element={<Epic />}></Route>
        <Route index element={<Kanban />} />
      </Routes>
    </div>
  );
};

export default Project;
