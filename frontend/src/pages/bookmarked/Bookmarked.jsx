import React, { useContext } from "react";
import "./Bookmarked.css";
import { StoreContext } from "../../context/storeContext";
import AdItem from "../../components/adItem/AdItem";
import Background from "../../components/Background";
import { PiTrashLight } from "react-icons/pi";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

const Bookmarked = () => {
  const { url, user, bookmarks, fetchBookmarks } = useContext(StoreContext);

  const emptyBookmark = async () => {
    try {
      const res = await axios.delete(`${url}/api/user/empty-bookmarks/${user}`);
      console.log(res);
      toast.success("Bookmark Empty !");

      const removeSimilarItems = (prefix) => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        });
      };

      removeSimilarItems("bookmark");
      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bookmarkCont">
      <Background />
      <h1>Ads in your Bookmark Collection</h1>

      <button className="emptyBookmark" onClick={emptyBookmark}>
        Empty Collection <PiTrashLight className="iconEmpty" />
      </button>

      <div className="bookmarkDisplay">
        {bookmarks?.map((item, index) => {
          return (
            <AdItem
              key={index}
              id={item._id}
              title={item.title}
              description={item.description}
              price={item?.price}
              adImage={item.adImage}
              state={item.state}
              condition={item?.condition}
              terms={item?.terms}
              item={item}
            />
          );
        })}
      </div>

      {bookmarks.length === 0 && (
        <div className="noBookmarks">
          <h3>
            You haven't boomark any ad{" "}
            <BsFillEmojiDizzyFill className="noBook" />
          </h3>
        </div>
      )}
    </div>
  );
};

export default Bookmarked;
