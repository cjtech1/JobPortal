import React, { useContext, useState } from "react";
import { JobCategories, JobLocations, JobLevels } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Addjob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Senior Level");
  const [location, setLocation] = useState("Banglore");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, level, salary, category },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success("Job Added Successfully", {
          autoClose: 1000,
        });
        setTitle("");
        setDescription("");
        setLocation("Banglore");
        setLevel("Senior Level");
        setSalary("");
        setCategory("Programming");
      } else {
        toast.error(data.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col p-8 gap-6 w-full" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-2">
        <p>Job Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Job title"
          type="text"
          className="w-full h-[30px] rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>Job Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type here"
          type="text"
          className="w-full  rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
        />
      </div>
      <div className="flex gap-4 max-sm:flex-col">
        <div className="flex flex-col gap-2">
          <p>Job Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name=""
            id=""
            className="w-full h-[30px]  outline outline-gray-300 px-2  focus:outline-gray-700  rounded"
          >
            {JobCategories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p>Job Location</p>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name=""
            id=""
            className="w-full h-[30px] rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
          >
            {JobLocations.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p>Job Level</p>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            name=""
            id=""
            className="w-full h-[30px] rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
          >
            {JobLevels.map((level) => (
              <option value={level}>{level} Level</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Salary</p>
        <input
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          min={0}
          className="w-[40%] h-[30px] rounded-[5px] outline outline-gray-300 px-2 focus:outline-gray-700"
        />
      </div>
      <div>
        <button className="px-4 py-2 bg-black text-white rounded-md cursor-pointer">
          Add
        </button>
      </div>
    </form>
  );
};

export default Addjob;
