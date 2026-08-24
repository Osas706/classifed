import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import { Watermark} from 'antd';
import { toast } from "react-toastify";
import { RiMapPinLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import bookmarkImg from '/bookmark.svg'

import useStore from '../../store/useStore';
import axios from 'axios';

const AdItem = ({item, adImage, title, price, description, id, state, condition, terms}) => {
  const { setShowLogin, url, user, bookmarks, setBookmarks, fetchBookmarks } = useStore();
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

    if(!user){
      setShowLogin(true)
      toast.info('You need to be logged in to boomark an ad!');
      return ;
    };

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

    if(!user){
      setShowLogin(true)
      toast.info('You need to be logged in to remove boomark!');
      return
    };

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
    <div className='w-full mx-auto rounded-2xl border border-navy/15 dark:border-white/10 transition-[0.3s] bg-white dark:bg-surface-dark shadow-sm hover:shadow-md'>
      <div className="relative">
        <img className='w-full rounded-t-2xl object-cover bg-[whitesmoke] dark:bg-white/5 h-[250px]' src={adImage} alt="" />

        <button className='absolute bottom-5 right-5 bg-accent-soft dark:bg-navy border-none py-[5px] px-[3px] rounded-[5px]'>
          {isBookmarked ? <IoBookmark onClick={removeFromBookmark} className='text-[28px] font-bold text-navy dark:text-accent' /> :
          <img src={bookmarkImg} className='w-7 h-auto' onClick={addToBookmark} />}
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center text-navy-ink dark:text-white mb-[10px] w-full truncate text-xl font-medium">
          <p>{title}</p>
        </div>

        <div className="w-full h-[90px] flex flex-wrap text-navy-ink dark:text-white/70 text-xs overflow-hidden leading-4">
         {description}
        </div>

        <p className='text-navy dark:text-accent flex items-center gap-1 text-xs mt-[15px]'><RiMapPinLine />{state}</p>

        <p className='text-navy dark:text-accent flex items-center gap-1 text-xs mt-[15px]'><CiShoppingTag />{condition  || "------" }</p>

        <div className="flex justify-between items-center border-t border-navy/15 dark:border-white/10 pt-[10px] mt-[10px]">
          <p className="text-navy dark:text-white text-[22px] font-medium my-[10px]">
            {(price === 0 || '') ? '' : '₦'}
            {(price === 0 || '') ? 'Price on inquiry' : price?.toLocaleString()}
          </p>

          <Link className='py-[6px] px-[15px] bg-navy text-white rounded cursor-pointer text-lg hover:bg-navy-deep transition' to={`/app/ad/${id}`}>view</Link>
        </div>

      </div>
    </div>
  )
}

export default AdItem;
