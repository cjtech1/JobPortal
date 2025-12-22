import React, { Children, useContext } from "react";
import { assets } from "../assets/assets";
import {
  useClerk,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    setRecruiterLogin,
    companyToken,
    companyData,
    setCompanyData,
    setCompanyToken,
  } = useContext(AppContext);

  function handleLogOut() {
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    setCompanyToken(null);
    navigate("/");
  }

  return (
    <div className="set-default flex justify-between  shadow  items-center">
      <div
        className="logo max-sm:w-34 cursor-pointer"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <img src={assets.logo} alt="" />
      </div>
      {user && (
        <div className="flex justify-between gap-4 items-center">
          <Link to={"/applications"}>Applied Jobs</Link>
          <p> | </p>
          <p className="max-sm:hidden">
            Hi,{user.firstName + " " + user.lastName}
          </p>
          <UserButton />
        </div>
      )}
      {companyData && (
        <div className="flex justify-between gap-4 items-center">
          <Link to={"/dashboard"}>Dashboard</Link>
          <p> | </p>
          <p className="max-sm:hidden">Hi,{companyData.name}</p>
          <div className="relative group">
            <img
              className="h-10 w-10 rounded-4xl object-cover"
              src={companyData.image}
              alt="companyLogo"
            />
            <div className="absolute hidden  group-hover:block z-10 right-3  bg-gray-50 shadow px-2 py-3">
              <ul>
                <li className="cursor-pointer" onClick={handleLogOut}>
                  logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {!companyToken && !user && (
        <div className="flex justify-between gap-4">
          <button
            className="text-gray-600 cursor-pointer"
            onClick={() => setRecruiterLogin((prev) => !prev)}
          >
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
