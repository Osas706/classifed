"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdItem from "../../../src/components/adItem/AdItem";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { TbMoodCry } from "react-icons/tb";
import useStore from "../../../src/store/useStore";

const CATEGORIES = [
  { key: "All", label: "All Categories" },
  { key: "cars", label: "Cars" },
  { key: "electronics", label: "Electronics" },
  { key: "mobiles", label: "Mobile" },
  { key: "furnitures", label: "Furnitures" },
  { key: "fashion", label: "Fashion" },
  { key: "jobs", label: "Jobs" },
  { key: "apartment", label: "Apartment" },
  { key: "animals", label: "Animals" },
  { key: "computer", label: "Laptops & PCs" },
  { key: "services", label: "Services" },
  { key: "personals", label: "Personals" },
];

const ADS_PER_PAGE = 9;

const CategoriesClient = () => {
  const { url, category, setCategory } = useStore();
  const [adList, setAdList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAds = category === "All" ? adList : adList.filter((item) => item.category === category);

  const numberOfPages = Math.max(1, Math.ceil(filteredAds.length / ADS_PER_PAGE));
  const pageAds = filteredAds.slice((currentPage - 1) * ADS_PER_PAGE, currentPage * ADS_PER_PAGE);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const fetchAdList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/list`);
      setAdList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdList();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const categoryCounts = adList.reduce((acc: Record<string, number>, ad) => {
    acc[ad.category] = (acc[ad.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6 p-2.5">
      <div>
        <h1 className="text-3xl font-bold text-navy dark:text-white">All Categories</h1>
        <p className="text-muted dark:text-white/60 mt-1">Browse listings by category</p>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="category-filter" className="text-sm font-medium text-navy-ink dark:text-white/70 shrink-0">
          Filter by category:
        </label>

        <select
          id="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-64 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-surface-dark text-navy-ink dark:text-white px-4 py-2.5 text-sm font-medium outline-none focus:border-accent transition"
        >
          {CATEGORIES.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
              {key !== "All" ? ` (${categoryCounts?.[key] ?? 0})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="ballLoader" />
            </div>
          )}

          {!loading && pageAds.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-20 text-center">
              <h3 className="flex items-center gap-2 text-navy dark:text-white text-lg">
                No ads in this category yet <TbMoodCry />
              </h3>
              <p className="text-muted dark:text-white/60 text-sm">Try a different category</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {pageAds.map((item) => (
              <AdItem
                key={item._id}
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
            ))}
          </div>

          {!loading && numberOfPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
              >
                <HiOutlineArrowLeft /> Prev
              </button>

              <span className="rounded-lg px-3 py-1.5 text-sm border border-navy/30 dark:border-white/20 text-navy dark:text-white font-medium">
                Page {currentPage} of {pageNumbers.length}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(numberOfPages, p + 1))}
                disabled={currentPage === numberOfPages}
                className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
              >
                Next <HiOutlineArrowRight />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesClient;
