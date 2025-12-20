import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
