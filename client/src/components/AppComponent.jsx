import React from "react";
import { assets } from "../assets/assets";

const AppComponent = () => {
  return (
    <div className="set-default  flex justify-center items-center">
      <div className="flex bg-gradient-to-r from-violet-50 to-purple-50   w-full  rounded items-center justify-between">
        <div className="px-20 max-lg:px-10 pt-2">
          <h3 className="font-bold text-2xl max-w-md">
            Download mobile app for better experience
          </h3>
          <div className="flex mt-2 gap-4 pb-2 max-lg:flex-col">
            <img src={assets.play_store} alt="" className="inline-block h-12" />
            <img src={assets.app_store} alt="" className="inline-block h-12" />
          </div>
        </div>
        <img
          src={assets.app_main_img}
          className="flex flex-wrap max-lg:hidden"
        />
      </div>
    </div>
  );
};

export default AppComponent;
