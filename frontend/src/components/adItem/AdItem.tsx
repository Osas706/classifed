"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { RiMapPinLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineArrowRight } from "react-icons/hi2";

import useStore from "../../store/useStore";
import axios from "axios";

interface AdItemProps {
  item: any;
  adImage: string;
  title: string;
  price?: number;
  description?: string;
  id: string;
  state?: string;
  condition?: string;
  terms?: string;
}

const AdItem = ({ item, adImage, title, price, description, id, state, condition, terms }: AdItemProps) => {
  const { setShowLogin, url, user, bookmarks, setBookmarks, fetchBookmarks } = useStore();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(false);

    const bookmarkStatus = localStorage.getItem(`bookmark-${item?._id}`);
    if (bookmarkStatus === "true") {
      setIsBookmarked(true);
    }
  }, [item?._id]);

  const addToBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLogin(true);
      toast.info("You need to be logged in to boomark an ad!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("bookmarkedAd", JSON.stringify(item));
      formData.append("userId", user);

      const res = await axios.post(`${url}/api/user/add-to-bookmark`, formData);

      setIsBookmarked(true);

      localStorage.setItem(`bookmark-${item?._id}`, "true");
      fetchBookmarks();

      if (!res.data.success) {
        throw new Error("Failed to bookmark ad");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLogin(true);
      toast.info("You need to be logged in to remove boomark!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("bookmarkedAd", JSON.stringify(item));
      formData.append("userId", user);

      const res = await axios.post(`${url}/api/user/remove-from-bookmark`, formData);
      setIsBookmarked(!isBookmarked);

      localStorage.setItem(`bookmark-${item?._id}`, "false");
      localStorage.removeItem(`bookmark-${item?._id}`);

      fetchBookmarks();

      if (res.data.success) {
        setBookmarks(bookmarks.filter((ad: any) => ad?._id !== item?._id));
      }

      if (!res.data.success) {
        throw new Error("Failed to remove ad from  bookmark");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group w-full mx-auto rounded-2xl border border-navy/10 dark:border-white/10 transition-[0.25s] bg-white dark:bg-surface-dark shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-[200px] object-cover bg-[whitesmoke] dark:bg-white/5 transition-transform duration-300 group-hover:scale-105"
          src={adImage}
          alt={title}
        />

        <button
          onClick={isBookmarked ? removeFromBookmark : addToBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-navy-deep/90 backdrop-blur-sm shadow-sm hover:scale-110 transition"
        >
          {isBookmarked ? (
            <IoBookmark className="text-lg text-accent" />
          ) : (
            <IoBookmarkOutline className="text-lg text-navy dark:text-white" />
          )}
        </button>

        {terms && (
          <span className="absolute bottom-3 left-3 bg-navy/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {terms}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-navy-ink dark:text-white font-semibold text-base truncate">{title}</p>

        <p className="text-navy-ink/70 dark:text-white/60 text-xs mt-1.5 line-clamp-2 min-h-[32px]">
          {description}
        </p>

        <div className="flex items-center gap-3 mt-3 text-[11px] text-muted dark:text-white/50">
          <span className="flex items-center gap-1">
            <RiMapPinLine className="text-accent" /> {state || "—"}
          </span>
          <span className="flex items-center gap-1">
            <CiShoppingTag className="text-accent" /> {condition || "—"}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-navy/10 dark:border-white/10 pt-3 mt-3">
          <p className="text-navy dark:text-white text-lg font-bold">
            {price === 0 ? "" : "₦"}
            {price === 0 ? "On inquiry" : price?.toLocaleString()}
          </p>

          <Link
            className="flex items-center gap-1 py-1.5 px-3.5 bg-navy hover:bg-navy-deep text-white rounded-full text-sm font-medium transition"
            href={`/app/ad/${id}`}
          >
            View <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdItem;
