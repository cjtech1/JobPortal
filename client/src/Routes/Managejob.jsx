import React, { useCallback, useContext, useEffect, useState } from "react";
// import { manageJobsData as manageJobs } from "../assets/assets";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Managejob = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [manageJobs, setManageJobs] = useState(null);
  const [visibilityToggle, setVisibilityToggle] = useState({});

  const handleVisibilityChange = async (jobId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id: jobId },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        setVisibilityToggle((prev) => ({
          ...prev,
          [jobId]: data.jobData.visible,
        }));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setManageJobs(data.jobsData.reverse());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl, companyToken]);

  useEffect(() => {
    if (companyToken) {
      fetchJobDetails();
    }
  }, [companyToken, fetchJobDetails]);

  return (
    <div className="set-default">
      <div>
        <h1 className="text-xl font-semibold mb-4">Jobs Applied</h1>
      </div>
      <div>
        <table className="min-w-full bg-white  border rounded-lg p-4">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left">Applicants</th>
              <th className="py-3 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobs &&
              manageJobs.map((jobs, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{jobs.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(jobs.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {jobs.location}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {jobs.applicants}
                  </td>
                  <td className="py-2 px-4 border-b relative group">
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={visibilityToggle[jobs._id] ?? jobs.visible}
                      onChange={() => handleVisibilityChange(jobs._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managejob;
