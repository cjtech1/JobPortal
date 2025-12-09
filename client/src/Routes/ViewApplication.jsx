import React from "react";
import {
  viewApplicationsPageData as applicationData,
  assets,
} from "../assets/assets";

const ViewApplication = () => {
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
            {applicationData.map((applicant, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="flex items-center gap-2 border-b py-3 px-3 ">
                  <img src={applicant.imgSrc} alt="" className="w-[50px]" />
                  {applicant.name}
                </td>
                <td className="py-2 px-4 border-b">{applicant.jobTitle}</td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.location}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href=""
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b  relative group">
                  <p className="cursor-pointer">•••</p>
                  <div className=" flex-col gap-2 hidden group-hover:flex absolute bg-white p-2 shadow z-10 border border-black">
                    <p className="px-4 py-2 bg-green-500 cursor-pointer">
                      Accept
                    </p>
                    <p className="px-4 py-2 bg-red-500 text-white cursor-pointer">
                      Reject
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
