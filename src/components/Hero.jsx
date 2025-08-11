import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="set-default">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex flex-col items-center justify-center p-7 h-[50vh] flex-wrap text-center rounded-[5px]">
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
                ref={titleRef}
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
                  ref={locationRef}
                />
              </div>
              <div>
                <button
                  className="bg-blue-400 py-1 px-4 text-white rounded-[5px]"
                  onClick={onSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 shadow-md mt-4 p-2 rounded-[5px] justify-center border border-gray-300">
        <p className="font-medium">Trusted By</p>
        <img src={assets.microsoft_logo} alt="" className="h-8" />
        <img src={assets.walmart_logo} alt="" className="h-8" />
        <img src={assets.accenture_logo} alt="" className="h-8" />
        <img src={assets.samsung_logo} alt="" className="h-8" />
        <img src={assets.amazon_logo} alt="" className="h-8" />
        <img src={assets.adobe_logo} alt="" className="h-8" />
      </div>
    </div>
  );
};

export default Hero;
