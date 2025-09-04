import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { AppContext } from "../context/AppContext";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../assets/assets";

const JobListing = () => {
  const { searchFilter, isSearched, setSearchFilter } = useContext(AppContext);
  const [filter, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  const hanldeCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const hanldeLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobsData
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchCategory(job) &&
          matchLocation(job) &&
          matchesLocation(job) &&
          matchesTitle(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="set-default flex justify-between gap-14 max-sm:flex-col">
      <div className="w-[40%] ">
        <button
          onClick={() => {
            setFilter((prev) => !prev);
          }}
          className="px-6 py-1.5 rounded border border-blue-300 min-sm:hidden cursor-pointer"
        >
          {filter ? "Close" : "Filters"}
        </button>
        <div className={filter ? "" : " max-sm:hidden"}>
          {isSearched &&
            (searchFilter.title != "" || searchFilter.location != "") && (
              <div className="my-2 ">
                <h3 className="font-medium text-xl mb-3">Current Search</h3>
                <div className="flex gap-4">
                  {searchFilter.title && (
                    <div className="inline-flex items-center cursor-pointer bg-blue-50 border border-blue-200 rounded px-4 py-1.5">
                      <p>{searchFilter.title}</p>
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, title: "" }))
                        }
                        src={assets.cross_icon}
                        alt=""
                        className="w-1.5 h-1.5 ml-2"
                      />
                    </div>
                  )}
                  {searchFilter.location && (
                    <div className="inline-flex items-center cursor-pointer bg-red-50 border border-red-200 rounded px-4 py-1.5">
                      <p>{searchFilter.location}</p>
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, location: "" }))
                        }
                        src={assets.cross_icon}
                        alt=""
                        className="w-1.5 h-1.5 ml-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

          <div className={filter ? "my-2" : "my-2 max-sm:hidden"}>
            <p className="font-medium text-xl">Search by Categories</p>
            <ul>
              {JobCategories.map((category, index) => (
                <li key={index} className="m-2 flex gap-2">
                  <input
                    className="scale-125"
                    type="checkbox"
                    onChange={() => hanldeCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className={filter ? "my-2" : "my-2 max-sm:hidden"}>
            <p className="font-medium text-xl">Search Location</p>
            <ul>
              {JobLocations.map((location, index) => (
                <li key={index} className="m-2 flex gap-2">
                  <input
                    type="checkbox"
                    onClick={() => hanldeLocationChange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="flex  flex-col mb-5" id="jobListings">
          <h3 className="font-medium text-xl">Latest jobs</h3>
          <p className="font-extralight text-base">
            Get your desired job from top companies
          </p>
        </div>
        <div className="flex flex-wrap gap-2  ">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <Card key={index} job={job} />
            ))}
        </div>
        {filteredJobs.length > 0 && (
          <div className="flex justify-center items-center gap-1.5 p-4">
            <a
              href="#jobListings"
              className="bg-gray-300 p-2 w-6 h-6 flex items-center border border-black"
              onClick={() => {
                currentPage === 1 ? "" : setCurrentPage(currentPage - 1);
              }}
            >
              <img src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a
                  key={index}
                  href="#jobListings"
                  className={` w-6 h-6 text-center border border-black rounded  ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-500"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <button className="cursor-pointer">{index + 1}</button>
                </a>
              )
            )}
            <a
              href="#jobListings"
              className="bg-gray-300 p-2 w-6 h-6  flex items-center border border-black"
              onClick={() => {
                currentPage === Math.ceil(filteredJobs.length / 6)
                  ? ""
                  : setCurrentPage(currentPage + 1);
              }}
            >
              <img src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
