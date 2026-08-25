"use client";

import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import AdItem from "../adItem/AdItem";
import axios from "axios";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineSquares2X2 } from "react-icons/hi2";

interface AdDisplayProps {
  adList: any[];
  setAdList: (ads: any[]) => void;
}

const AdDisplay = ({ adList, setAdList }: AdDisplayProps) => {
  const { url, category } = useStore();
  const [loading, setLoading] = useState(false);

  const fetchAdList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/list`);
      setAdList(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdList();
  }, [category]);

  const filteredAds = category === "All" ? adList : adList.filter((item) => item.category === category);
  const displayedAds = filteredAds.slice(0, 16);

  const [currentPage, setCurrentPage] = useState(1);
  const displayAdsPerPage = 8;
  const lastIndex = currentPage * displayAdsPerPage;
  const firstIndex = lastIndex - displayAdsPerPage;
  const display = displayedAds.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(displayedAds.length / displayAdsPerPage);
  const numbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const prevPage = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage !== numberOfPages && setCurrentPage(currentPage + 1);
  const changePage = (id: number) => setCurrentPage(id);

  return (
    <div className="mt-[30px]" id="ad-display">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-ink dark:text-white">Recent ads for you</h2>

        <Link
          className="shrink-0 flex items-center gap-2 rounded-full border border-navy dark:border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-white/10 transition"
          href="/app/categories"
        >
          <HiOutlineSquares2X2 className="text-base" /> View All
        </Link>
      </div>

      <div className="grid gap-[30px] gap-y-[50px] mt-[30px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {display.map((item) => (
          <AdItem
            key={item._id}
            id={item?._id}
            title={item.title}
            description={item.description}
            price={item?.price}
            adImage={item.adImage}
            state={item.state}
            condition={item?.condition}
            terms={item?.terms}
            item={item}
          />
        ))}
      </div>

      {!loading && display.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/error.png" alt="" className="w-[300px] object-contain mx-auto" />
          <h3 className="text-center text-navy dark:text-white">
            Oops! Something went wrong. <br /> Make sure you are connected to the internet or try again later.
          </h3>
        </div>
      )}

      {loading && (
        <div className="w-2/5 h-5 mx-auto my-[50px] px-5 flex justify-center items-center rounded-[20px] max-lg:w-4/5">
          <span className="ballLoader"></span>
        </div>
      )}

      {numberOfPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
          >
            <HiOutlineArrowLeft /> Prev
          </button>

          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => changePage(n)}
              className={`rounded-lg px-3 py-1.5 text-sm border ${
                currentPage === n
                  ? "bg-navy text-white border-navy dark:bg-accent dark:text-navy-deep dark:border-accent"
                  : "border-navy/30 dark:border-white/20 text-navy dark:text-white"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === numberOfPages}
            className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
          >
            Next <HiOutlineArrowRight />
          </button>
        </nav>
      )}
    </div>
  );
};

export default AdDisplay;
