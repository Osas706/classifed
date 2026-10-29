"use client";

import { useEffect, useState } from "react";
import AdItem from "../../../src/components/adItem/AdItem";
import Link from "next/link";
import { TbMoodCry } from "react-icons/tb";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { RiCompassDiscoverLine } from "react-icons/ri";
import useStore from "../../../src/store/useStore";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const DISCOVER_PER_PAGE = 9;

const DiscoverClient = () => {
  const { url, user } = useStore();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [discoverAds, setDiscoverAds] = useState<any[]>([]);
  const [discoverState, setDiscoverState] = useState("");
  const [discoverCountry, setDiscoverCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.max(1, Math.ceil(discoverAds.length / DISCOVER_PER_PAGE));
  const pageAds = discoverAds.slice((currentPage - 1) * DISCOVER_PER_PAGE, currentPage * DISCOVER_PER_PAGE);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${url}/api/user/${user}`);
      setDiscoverCountry(res?.data?.country);
      setDiscoverState(res?.data?.state);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiscoverAds = async () => {
    const discoverStateUrl = searchParams.get("discoverState");
    const discoverCountryUrl = searchParams.get("discoverCountry");

    if (discoverStateUrl || discoverCountryUrl) {
      setDiscoverState(discoverStateUrl || "");
      setDiscoverCountry(discoverCountryUrl || "");
    }

    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/discover?${searchParams.toString()}`);
      setDiscoverAds(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDiscoverAds();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [discoverAds.length]);

  return (
    <div className="flex flex-col gap-6 p-2.5">
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-11 h-11 text-xl rounded-xl bg-accent-soft dark:bg-white/10 text-accent shrink-0">
          <RiCompassDiscoverLine />
        </div>

        <div>
          <h1 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl text-navy dark:text-white">
            Explore local deals and hidden gems
          </h1>
          <p className="text-muted dark:text-white/60 text-sm mt-0.5">
            {discoverState || discoverCountry
              ? `Showing ads in ${[discoverState, discoverCountry].filter(Boolean).join(", ")}`
              : "Showing ads near you"}
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="ballLoader" />
        </div>
      )}

      {!loading && discoverAds.length === 0 && (
        <div className="flex flex-col gap-2 items-center py-20 text-center">
          <h3 className="flex gap-2 items-center text-lg text-navy dark:text-white">
            There are currently no ads in your region <TbMoodCry />
          </h3>
          <p className="text-sm text-muted dark:text-white/60">You can click below to create the first one</p>
          <Link
            className="mt-2 rounded-lg bg-navy px-4 py-2.5 text-white text-sm font-semibold hover:bg-navy-deep transition"
            href="/dashboard/create-ad"
          >
            Post an Ad
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
        <nav className="flex gap-2 justify-center items-center mt-4">
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
  );
};

export default DiscoverClient;
