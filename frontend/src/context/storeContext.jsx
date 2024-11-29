import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8000";
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  // console.log(token);

  const [category, setCategory] = useState('All');
  

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
      setToken(localStorage?.getItem("token"))
    }
  }, [user, token]);

  //   //store values
  const contextValue = {
    url,
    user,
    setUser,
    category, 
    setCategory
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
