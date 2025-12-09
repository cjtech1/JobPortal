import React, { useState } from "react";
import { JobCategories, JobLocations, JobLevels } from "../assets/assets";

const Addjob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  return (
    <form className="flex flex-col p-8 gap-6 w-full">
      <div className="flex flex-col gap-2">
        <p>Job Title</p>
        <input
          onBlur={(e) => setTitle(e.target.value)}
          placeholder="Job title"
          type="text"
          className="w-full h-[30px] rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>Job Description</p>
        <textarea
          placeholder="Type here"
          type="text"
          className="w-full  rounded-[5px] outline outline-gray-300 px-2  focus:outline-gray-700"
        />
      </div>
      <div className="flex gap-4 max-sm:flex-col">
        <div className="flex flex-col gap-2">
          <p>Job Category</p>
          <select
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
          onBlur={(e) => setSalary(e.target.value)}
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
