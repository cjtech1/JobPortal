import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);

  const fetchCompanyJobApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        {
          headers: { token: companyToken },
        },
      );
      if (data.success) {
        fetchCompanyJobApplicants();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplicants();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
      <div className="set-default">
        <div>
          <h1 className="text-xl font-semibold mb-4">Jobs Applied</h1>
        </div>
        <div>
          <table className="min-w-full bg-white  border rounded-lg p-4">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">#</th>
                <th className="py-3 px-4 border-b text-left">User name</th>
                <th className="py-3 px-4 border-b text-left">Job Title</th>
                <th className="py-3 px-4 border-b text-left max-sm:hidden">
                  Location
                </th>
                <th className="py-3 px-4 border-b text-left">Resume</th>
                <th className="py-3 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="flex items-center gap-2 border-b py-3 px-3 ">
                      {applicant?.userId?.image && (
                        <img
                          src={applicant.userId.image}
                          alt=""
                          className="w-[45px] rounded-full h-[45px]"
                        />
                      )}
                      {applicant?.userId?.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {applicant.jobId.title}
                    </td>

                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={applicant.userId.resume}
                        className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                      >
                        Resume <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b  relative group">
                      {applicant.status === "Pending" ? (
                        <div>
                          <p className="cursor-pointer">•••</p>
                          <div className=" flex-col gap-2 hidden group-hover:flex absolute bg-white p-2 shadow z-10 border border-black">
                            <p
                              onClick={() => {
                                statusHandler(applicant._id, "Accepted");
                              }}
                              className="px-4 py-2 bg-green-500 cursor-pointer"
                            >
                              Accept
                            </p>
                            <p
                              onClick={() => {
                                statusHandler(applicant._id, "Rejected");
                              }}
                              className="px-4 py-2 bg-red-500 text-white cursor-pointer"
                            >
                              Reject
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplication;
