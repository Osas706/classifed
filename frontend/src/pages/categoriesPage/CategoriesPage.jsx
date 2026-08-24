import React, { useEffect, useState } from "react";
import axios from "axios";
import AdItem from "../../components/adItem/AdItem";
import { IoCarSportOutline } from "react-icons/io5";
import { FaTv } from "react-icons/fa6";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineChair } from "react-icons/md";
import { LuShirt } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { PiDog } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa6";
import { GiPaintRoller } from "react-icons/gi";
import { FaRegHeart, FaThLarge } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { TbMoodCry } from "react-icons/tb";
import useStore from "../../store/useStore";

const CATEGORIES = [
  { key: "All", label: "All Categories", Icon: FaThLarge },
  { key: "cars", label: "Cars", Icon: IoCarSportOutline },
  { key: "electronics", label: "Electronics", Icon: FaTv },
  { key: "mobiles", label: "Mobile", Icon: HiDevicePhoneMobile },
  { key: "furnitures", label: "Furnitures", Icon: MdOutlineChair },
  { key: "fashion", label: "Fashion", Icon: LuShirt },
  { key: "jobs", label: "Jobs", Icon: IoBriefcaseOutline },
  { key: "apartment", label: "Apartment", Icon: BsHouse },
  { key: "animals", label: "Animals", Icon: PiDog },
  { key: "computer", label: "Laptops & PCs", Icon: FaLaptop },
  { key: "services", label: "Services", Icon: GiPaintRoller },
  { key: "personals", label: "Personals", Icon: FaRegHeart },
];

const ADS_PER_PAGE = 9;

const CategoriesPage = () => {
  const { url, category, setCategory } = useStore();
  const [adList, setAdList] = useState([]);
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

  const categoryCounts = adList.reduce((acc, ad) => {
    acc[ad.category] = (acc[ad.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6 p-2.5">
      <div>
        <h1 className="text-3xl font-bold text-navy dark:text-white">All Categories</h1>
        <p className="text-muted dark:text-white/60 mt-1">Browse listings by category</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ul className="flex flex-col gap-1 w-full lg:w-64 shrink-0">
          {CATEGORIES.map(({ key, label, Icon }) => (
            <li
              key={key}
              onClick={() => setCategory(key)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                category === key
                  ? "bg-navy text-white dark:bg-accent dark:text-navy-deep"
                  : "text-navy-ink dark:text-white/70 hover:bg-accent-soft dark:hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="text-lg" /> {label}
              </span>

              {key !== "All" && (
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    category === key ? "bg-white/20" : "bg-navy/10 dark:bg-white/10"
                  }`}
                >
                  {categoryCounts?.[key] ?? 0}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex-1 min-w-0">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="spinner h-10 w-10" />
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

              {pageNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
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

export default CategoriesPage;
