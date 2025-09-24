import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [recruiterLogin, setRecruiterLogin] = useState(false);

  const [isSearched, setIsSearched] = useState(false);
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    recruiterLogin,
    setRecruiterLogin,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
