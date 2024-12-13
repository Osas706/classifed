import React, { useContext, useState } from 'react';
import './AdItem.css';
import {Link} from 'react-router-dom';
// import { Watermark} from 'antd';
import { RiMapPinLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import bookmarkImg from '/bookmark.svg'

import { StoreContext } from '../../context/storeContext';

const AdItem = ({item, adImage, title, price, description, id, state, condition, terms}) => {

  const { addToBookmarks, isBookmarked } = useContext(StoreContext);
  

  return (
    <div className='ad-item'>
      <div className="ad-item-img-container">
        <img className='ad-item-image' src={adImage} alt="" />

        <button className='bookmarkBtn'>
          {isBookmarked[item?._id] ? <IoBookmark className='bookmark' onClick={() => addToBookmarks(item)}/> :
          <img src={bookmarkImg} className='bookmarkImg' onClick={() => addToBookmarks(item)} />}
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
          <p className="ad-item-price">₦{price?.toLocaleString()}</p>

          <Link className='view-btn' to={`/ad/${id}`}>view</Link>
        </div>
      
      </div>
    </div>
  )
}

export default AdItem;
