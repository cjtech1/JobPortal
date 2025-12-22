import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jobsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [recruiterLogin, setRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [jobData, setJobData] = useState(jobsData);

  const [isSearched, setIsSearched] = useState(false);

  //function to get company data
  const fetchCompanyData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.companyData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl, companyToken]);

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobData(data.jobs);
        console.log(data.jobs);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const storedCompanyData = localStorage.getItem("companyToken");
    if (storedCompanyData) {
      setCompanyToken(storedCompanyData);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken, fetchCompanyData]);

  useEffect(() => {
    fetchJobData();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    recruiterLogin,
    setRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    jobData,
    setJobData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
