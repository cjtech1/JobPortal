import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppComponent from "../components/AppComponent";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-auto">
      <Navbar />
      <Hero />
      <JobListing />
      <AppComponent />
      <Footer />
    </div>
  );
};

export default Home;
