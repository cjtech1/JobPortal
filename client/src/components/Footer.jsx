import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="set-default flex align-bottom justify-between mt-14">
      <div className="flex items-center gap-4 max-lg:flex-col max-lg:items-start">
        <img src={assets.logo} alt="" className="h-8" />
        <div className="max-lg:hidden">|</div>
        <p className="max-lg:text-xs">
          All rights reserved. Designed by @cjtech1
        </p>
      </div>
      <div className="flex gap-4">
        <a href="#">
          <img src={assets.facebook_icon} alt="" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
