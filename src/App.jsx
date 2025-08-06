import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import ApplyJobs from "./Routes/ApplyJob";
import Applications from "./Routes/Applications";

const App = () => {
  return (
    // className="flex justify-center items-center mt-1"
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
};

export default App;
