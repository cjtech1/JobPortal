import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/add-jobs");
  }, []);

  const { companyData, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  function handleLogOut() {
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    setCompanyToken(null);
    navigate("/");
  }

  return (
    <div>
      {/* NavBar */}
      <div className="flex justify-between shadow py-4 px-3">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={assets.logo} alt="" />
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <p className="max-sm:hidden">
              Welcome {companyData ? companyData.name : "Recruiter"}
            </p>
          </div>
          <div className="relative group">
            <img
              src={companyData ? companyData.image : assets.company_icon}
              alt=""
              className="w-12 h-12 rounded-4xl object-cover"
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
      </div>
      <div className="flex items-start">
        {/* Left sidebar */}
        <div className="bg-blue-50 min-h-screen  border-r-2 border-blue-400 ">
          <ul className="flex flex-col text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-jobs"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Application</p>
            </NavLink>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
