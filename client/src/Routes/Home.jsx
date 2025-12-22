import  { useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppComponent from "../components/AppComponent";
import Footer from "../components/Footer";
import RecruiterLogin from "../components/RecruiterLogin";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { recruiterLogin } = useContext(AppContext);

  return (
    <div className="w-auto">
      <Navbar />

      {recruiterLogin && <RecruiterLogin />}

      <Hero />
      <JobListing />
      <AppComponent />
      <Footer />
    </div>
  );
};

export default Home;
