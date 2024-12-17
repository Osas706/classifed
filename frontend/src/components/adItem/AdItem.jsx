import React, { useContext, useEffect, useState } from 'react';
import './AdItem.css';
import {Link} from 'react-router-dom';
// import { Watermark} from 'antd';
import { RiMapPinLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import bookmarkImg from '/bookmark.svg'

import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

const AdItem = ({item, adImage, title, price, description, id, state, condition, terms}) => {
  const { url, user, bookmarks, setBookmarks, fetchBookmarks } = useContext(StoreContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(false);
    
    // Retrieve the bookmark state from localStorage
    const bookmarkStatus = localStorage.getItem(`bookmark-${item?._id}`);
    if (bookmarkStatus === 'true') {
      setIsBookmarked(true);
    }
  }, [item?._id]);

  const addToBookmark = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("bookmarkedAd", JSON.stringify(item));
      formData.append("userId", user);

      const res = await axios.post(`${url}/api/user/add-to-bookmark`, formData);
      
      setIsBookmarked(true);

      localStorage.setItem(`bookmark-${item?._id}`, 'true');
      fetchBookmarks();

      if (!res.data.success) {
        throw new Error('Failed to bookmark ad');
      };

    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBookmark = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("bookmarkedAd", JSON.stringify(item));
      formData.append("userId", user);

      const res = await axios.post(`${url}/api/user/remove-from-bookmark`, formData);
      setIsBookmarked(!isBookmarked);

      localStorage.setItem(`bookmark-${item?._id}`, 'false');
      localStorage.removeItem(`bookmark-${item?._id}`);

      fetchBookmarks();

      if (res.data.success) {
        setBookmarks(bookmarks.filter(ad => ad?._id !== item?._id));
      };
  

      if (!res.data.success) {
        throw new Error('Failed to remove ad from  bookmark');
      };

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className='ad-item'>
      <div className="ad-item-img-container">
        <img className='ad-item-image' src={adImage} alt="" />

        <button className='bookmarkBtn'>
          {isBookmarked ? <IoBookmark onClick={removeFromBookmark} className='bookmark' /> :
          <img src={bookmarkImg} className='bookmarkImg' onClick={addToBookmark} />}
        </button>
      </div>

      <div className="ad-item-info">
        <div className="ad-item-title">
          <p>{title}</p>
        </div>

        <div className="desc">
         {description}
        </div>

        <p className='state'><RiMapPinLine />{state}</p>

        <p className='state'><CiShoppingTag />{condition  || "------" }</p>
    
        <div className="price">
          <p className="ad-item-price">₦{price === 0 ? 'Price on inquiry' : price?.toLocaleString()}</p>

          <Link className='view-btn' to={`/ad/${id}`}>view</Link>
        </div>
      
      </div>
    </div>
  )
}

export default AdItem;
