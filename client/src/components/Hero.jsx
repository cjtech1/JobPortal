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
    <div className="set-default flex flex-col ">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[50vh] text-center rounded-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 max-w-4xl">
          Over 10,000+ jobs to apply
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white mb-6 max-w-3xl px-4">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        {/* Search Bar */}
        <div className="w-full max-w-4xl px-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-8 py-3 px-4 bg-white rounded-lg shadow-lg">
            <div className="flex gap-2 items-center flex-1 min-w-0">
              <img
                src={assets.search_icon}
                alt=""
                className="w-5 h-5 flex-shrink-0"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for jobs"
                className="outline-none flex-1 min-w-0"
                ref={titleRef}
              />
            </div>
            <div className="hidden sm:block w-px bg-gray-300 mx-2"></div>
            <div className="flex gap-2 items-center flex-1 min-w-0">
              <img
                src={assets.location_icon}
                alt=""
                className="w-5 h-5 flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Location"
                className="outline-none flex-1 min-w-0"
                ref={locationRef}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 py-2 px-6 text-white rounded-md transition-colors duration-200 whitespace-nowrap"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-10 shadow-md mt-4 p-4 rounded-lg justify-center border border-gray-300 max-w-6xl mx-auto">
        <p className="font-medium text-gray-700 w-full sm:w-auto text-center sm:text-left">
          Trusted By
        </p>
        <img
          src={assets.microsoft_logo}
          alt="Microsoft"
          className="h-6 sm:h-8"
        />
        <img src={assets.walmart_logo} alt="Walmart" className="h-6 sm:h-8" />
        <img
          src={assets.accenture_logo}
          alt="Accenture"
          className="h-6 sm:h-8"
        />
        <img src={assets.samsung_logo} alt="Samsung" className="h-6 sm:h-8" />
        <img src={assets.amazon_logo} alt="Amazon" className="h-6 sm:h-8" />
        <img src={assets.adobe_logo} alt="Adobe" className="h-6 sm:h-8" />
      </div>
    </div>
  );
};

export default Hero;
