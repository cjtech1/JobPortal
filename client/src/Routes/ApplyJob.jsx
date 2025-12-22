import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kConvert from "k-convert";
import moment from "moment";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobsData, setJobData] = useState(null);
  const { backendUrl, jobData } = useContext(AppContext);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.jobs);
        console.log(data.jobs);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobData.length > 0) fetchJobs();
  }, [id, jobData]);

  return JobsData ? (
    <div>
      <Navbar />
      <div className="m-4 h-[30vh] flex bg-blue-100 mt-5 items-center border-2 border-blue-400 rounded-[10px]">
        <div className="pl-4 flex justify-between w-full">
          <div className="flex gap-4">
            <div className="p-6 bg-blue-100 rounded-[5px] ">
              <img
                className="w-16 h-16 object-contain rounded-4xl"
                src={JobsData.companyId.image}
                alt="job-image"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-3xl">{JobsData.title}</h1>
              <div className="flex gap-4  ">
                <div className="flex gap-1 text-center">
                  <img src={assets.suitcase_icon} alt="" />
                  <p>{JobsData.companyId.name}</p>
                </div>
                <div className="flex  gap-1 text-center">
                  <img src={assets.location_icon} alt="" />
                  <p>{JobsData.location}</p>
                </div>
                <div className="flex  gap-1 text-center">
                  <img src={assets.person_icon} alt="" />
                  <p>{JobsData.level}</p>
                </div>
                <div className="flex  gap-1 text-center">
                  <img src={assets.money_icon} alt="" />
                  <p>CTC: {kConvert.convertTo(JobsData.salary)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pr-4 gap-2 items-end">
            <button className="cursor-pointer bg-blue-700 p-3 text-white rounded-[5px]">
              Apply Now
            </button>
            <p>Posted: {moment(JobsData.date).fromNow()}</p>
          </div>
        </div>
      </div>
      <div className="p-4 w-full flex justify-between">
        <div className="w-[60%]">
          <h2 className="font-bold text-2xl mb-4">Job Description</h2>
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{ __html: JobsData.description }}
          ></div>
          <button className="cursor-pointer bg-blue-700 p-3 text-white rounded-[5px] mt-10">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h2>More jobs from {JobsData.companyId.name}</h2>
          {jobData
            .filter(
              (job) =>
                job._id != JobsData._id &&
                job.companyId._id === JobsData.companyId._id
            )
            .slice(0, 4)
            .map((job, index) => (
              <Card key={index} job={job} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
