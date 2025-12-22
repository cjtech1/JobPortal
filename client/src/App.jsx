import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import ApplyJobs from "./Routes/ApplyJob";
import Applications from "./Routes/Applications";
import { AppContext } from "./context/AppContext";
import Dashboard from "./Routes/Dashboard";
import Managejob from "./Routes/Managejob";
import ViewApplication from "./Routes/ViewApplication";
import Addjob from "./Routes/Addjob";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { companyToken } = useContext(AppContext);

  return (
    // className="flex justify-center items-center mt-1"
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {!companyToken ? (
          <>
            <Route path="/apply-job/:id" element={<ApplyJobs />} />
            <Route path="/applications" element={<Applications />} />
          </>
        ) : null}
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path="manage-jobs" element={<Managejob />} />
              <Route path="view-applications" element={<ViewApplication />} />
              <Route path="add-jobs" element={<Addjob />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
