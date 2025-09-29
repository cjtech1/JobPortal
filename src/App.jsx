import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import ApplyJobs from "./Routes/ApplyJob";
import Applications from "./Routes/Applications";
import { AppContext } from "./context/AppContext";
import Dashboard from "./Routes/Dashboard";
import Managejob from "./Routes/Managejob";
import ViewApplication from "./Routes/ViewApplication";
import Addjob from "./Routes/Addjob";

const App = () => {
  return (
    // className="flex justify-center items-center mt-1"
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manage-jobs" element={<Managejob />} />
          <Route path="view-applications" element={<ViewApplication />} />
          <Route path="add-jobs" element={<Addjob />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
