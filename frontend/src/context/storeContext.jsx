import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8000";
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const [category, setCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const addToBookmarks = (item) => {
    setBookmarks((bookmarks) => {
      // Check if the item already exists
      const itemExists = bookmarks.some(
        (bookmark) => bookmark._id === item._id
      ); // Assuming each item has a unique 'id'

      if (itemExists) {
        // If the item exists, filter it out
        return bookmarks.filter((bookmark) => bookmark._id !== item._id);
      } else {
        // If it doesn't exist, add it to the bookmarks
        return [...bookmarks, item];
      }
    });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Update the specific item's bookmark status
    setIsBookmarked((prevState) => ({
      ...prevState,
      [item._id]: !prevState[item._id], // Toggle the bookmark status for the specific item
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
      setToken(localStorage?.getItem("token"));
      setBookmarksData(JSON.parse(localStorage?.getItem("bookmarks")) );
    }
  }, [user, token, bookmarks]);

  //   //store values
  const contextValue = {
    url,
    user,
    setUser,
    category,
    setCategory,
    addToBookmarks,
    bookmarks,
    setBookmarks,
    isBookmarked,
    bookmarksData
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
