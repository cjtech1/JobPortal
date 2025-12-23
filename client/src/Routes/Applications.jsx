import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { userApplications } = useContext(AppContext);
  console.log(userApplications);
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="set-default flex flex-col gap-2 mt-6">
          <div>
            <h1 className="text-xl font-semibold">Your Resume</h1>
          </div>
          {isEdit ? (
            <div className="flex w-1/3 gap-4 items-center ">
              <p
                className={
                  resume == null
                    ? "px-2 py-2 bg-red-500  border-2 border-red-300 rounded-md text-white"
                    : "px-2 py-2 bg-green-100  border-2 border-green-300 rounded-md text-black"
                }
              >
                {resume == null ? "Upload Your Resume" : "Uploaded"}
              </p>

              <label htmlFor="resumeUpload">
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  className="py-2 border border-black px-1"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              {resume == null ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                  }}
                  className="bg-white border-2 border-green-200 px-2 py-1
              hover:bg-green-100 hover:text-black rounded-md font-medium cursor-pointer"
                >
                  Save
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <a
                href=""
                className="bg-transparent border border-gray-400 px-2 py-1 hover:bg-blue-100 hover:text-blue-500 font-medium cursor-pointer rounded-md"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit((prev) => !prev)}
                className="bg-transparent border border-gray-400 px-2 py-1 hover:bg-blue-100 hover:text-blue-500 font-medium cursor-pointer rounded-md"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        {userApplications.length > 0 && (
          <div className="set-default">
            <div>
              <h1 className="text-xl font-semibold mb-4">Jobs Applied</h1>
            </div>
            <div>
              <table className="min-w-full bg-white  border rounded-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Company</th>
                    <th className="py-3 px-4 border-b text-left">Job Title</th>
                    <th className="py-3 px-4 border-b text-left max-sm:hidden">
                      Location
                    </th>
                    <th className="py-3 px-4 border-b text-left max-sm:hidden">
                      Date
                    </th>
                    <th className="py-3 px-4 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userApplications.map((job, index) => (
                    <tr key={index}>
                      <td className="flex items-center gap-2 border-b py-3 px-3 ">
                        <img
                          className="w-10 h-10 rounded-4xl object-cover"
                          src={job.companyId.image}
                          alt=""
                        />
                        {job.companyId.name}
                      </td>
                      <td className="py-2 px-4 border-b">{job.jobId.title}</td>
                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {job.jobId.location}
                      </td>
                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {moment(job.date).format("ll")}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={`${
                            job.status === "Accepted"
                              ? "bg-green-100 border-green-300"
                              : job.status === "Pending"
                              ? "bg-yellow-100 border-yellow-300"
                              : "bg-red-100 border-red-400"
                          } py-2 px-4 border  cursor-pointer rounded-md`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Applications;
