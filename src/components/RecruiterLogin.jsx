/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);

  const [textSubmitted, setTextSubmitted] = useState(false);

  return (
    <div
      className="w-full h-[100vh] bg-transparent backdrop-blur-sm flex items-center justify-center"
      onClick={() => console.log("first")}
    >
      <div className="flex items-center justify-between gap-6 bg-white flex-col px-20 py-10 rounded-md border border-blue-400 shadow-2xs transition-all duration-300 ease-in-out hover:scale-105">
        <div className="flex flex-col text-center">
          <h2 className="text-2xl font-semibold">Recruiter {state}</h2>
          <p className="text-gray-500">
            Welcome back! Please {state.toLowerCase()} in to continue
          </p>
        </div>
        {state === "Sign Up" && textSubmitted ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex  gap-2 border border-gray-300 rounded-full px-2 overflow-hidden">
              <input
                type="file"
                accept="image/*"
                placeholder="Logo"
                className="px-2 py-4 outline-none"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {state === "Sign Up" && (
              <div className="flex  gap-2 border border-gray-300 rounded-full px-2 overflow-hidden">
                <img src={assets.person_icon} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  className="px-2 py-4 outline-none"
                  onBlur={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="flex  gap-2 border border-gray-300 rounded-full px-2 overflow-hidden">
              <img src={assets.email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                className="px-2 py-4 outline-none"
                onBlur={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2 border border-gray-300 rounded-full px-2 overflow-hidden">
              <img src={assets.lock_icon} alt="" />
              <input
                type="password"
                placeholder="password"
                className="px-2 py-4 outline-none"
                onBlur={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        )}
        {state === "Login" && (
          <div className=" w-full cursor-pointer">
            <p className="text-left">Forgot Password?</p>
          </div>
        )}
        {state === "Sign Up" && textSubmitted ? (
          <div
            className="flex justify-center w-full gap-2 border border-gray-300 rounded-full px-2 py-4 bg-blue-400 text-white cursor-pointer"
            onClick={() => setTextSubmitted(false)}
          >
            <button className="cursor-pointer">Submit</button>
          </div>
        ) : (
          <div
            className="flex justify-center w-full gap-2 border border-gray-300 rounded-full px-2 py-4 bg-blue-400 text-white cursor-pointer"
            onClick={() => setTextSubmitted(true)}
          >
            <button className="cursor-pointer">
              {state === "Sign Up" ? "Continue" : "Login"}
            </button>
          </div>
        )}
        <div>
          <p>
            {state === "Login"
              ? "Don't have an account"
              : "Already have an account"}
            ?&nbsp;
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() =>
                setState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"))
              }
            >
              {state === "Login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
