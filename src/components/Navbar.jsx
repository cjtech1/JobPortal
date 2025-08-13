import React from "react";
import { assets } from "../assets/assets";
import {
  useClerk,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="set-default flex justify-between  shadow  items-center">
      <div className="logo max-sm:w-34">
        <img src={assets.logo} alt="" />
      </div>
      {user ? (
        <div className="flex justify-between gap-4 items-center">
          <Link to={"/applications"}>Applied Jobs</Link>
          <p> | </p>
          <p className="max-sm:hidden">
            Hi,{user.firstName + " " + user.lastName}
          </p>
          <UserButton />
        </div>
      ) : (
        <div className="flex justify-between gap-4">
          <button className="text-gray-600 cursor-pointer">
            Recriter Login
          </button>

          <button
            onClick={openSignIn}
            className="bg-blue-500 rounded-full px-6 py-2 text-white text-center cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
