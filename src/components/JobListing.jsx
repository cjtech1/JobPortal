import React, { useContext } from "react";
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
  return (
    <div className="set-default flex">
      <div className="w-[40%] ">
        {isSearched &&
          (searchFilter.title != "" || searchFilter.location != "") && (
            <div className="my-2">
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
        <div className="my-2">
          <p className="font-medium text-xl">Search by Categories</p>
          <ul>
            {JobCategories.map((category, index) => (
              <li key={index} className="m-2 flex gap-2">
                <input className="scale-125" type="checkbox" name="" id="" />
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2">
          <p className="font-medium text-xl">Search Location</p>
          <ul>
            {JobLocations.map((location, index) => (
              <li key={index} className="m-2 flex gap-2">
                <input type="checkbox" name="" id="" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex  ml-9 flex-col mb-5">
          <h3 className="font-medium text-xl">Latest jobs</h3>
          <p className="font-extralight text-base">
            Get your desired job from top companies
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 ml-9 ">
          {jobsData.map((job, index) => (
            <Card key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
