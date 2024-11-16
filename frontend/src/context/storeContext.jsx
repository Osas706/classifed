import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8000";
  const [user, setUser] = useState("");
  console.log(user);

  const [category, setCategory] = useState('All');
  

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
    console.log(user);
  }, [user]);

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
