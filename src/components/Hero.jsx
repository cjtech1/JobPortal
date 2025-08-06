import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="  p-4  mx-auto my-auto  w-[100%] ">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex flex-col items-center justify-center p-7 h-[50vh] flex-wrap text-center">
        <h2 className="text-4xl font-semibold text-white">
          Over 10,000+ jobs to apply
        </h2>
        <p className="text-[20px] text-white">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div>
          <div className="flex gap-8 mt-8 py-2 px-4 w-[100%] bg-white rounded-[5px]">
            <div className="flex gap-1 items-center">
              <img
                src={assets.search_icon}
                alt=""
                className="w-20px h-[20px]"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for jobs"
                className="outline-none"
              />
              <div className="bg-black  h-auto">|</div>
            </div>
            <div className="flex gap-4 justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src={assets.location_icon}
                  alt=""
                  className="w-20px h-[20px]"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="outline-none"
                />
              </div>
              <div>
                <button className="bg-blue-400 py-1 px-4 text-white rounded-[5px]">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* from 46:00 */}
    </div>
  );
};

export default Hero;
