import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://classifed-247market.onrender.com";
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");
  const [category, setCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async() => {
    try {
      if(user){
        const res = await axios.get(`${url}/api/user/get-bookmarks/${user}`);      

        setBookmarks(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(res?.data?.bookmarkedAds)) {
            return res?.data?.bookmarkedAds;
          }
          return prev;
        });
      }
    } catch (error) {
      console.log(error);
    };
  };


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    };

    fetchBookmarks();
  }, [bookmarks, user, ]);

  //   //store values
  const contextValue = {
    showLogin, setShowLogin,
    url,
    user,
    setUser,
    category,
    setCategory,
    bookmarks,

    fetchBookmarks
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
