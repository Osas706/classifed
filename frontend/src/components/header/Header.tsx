"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "../slider/Slider";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("searchLocation", searchLocation);
    urlParams.set("searchCategory", searchCategory);

    router.push(`/app/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("searchTerm");
    const searchLocationFromUrl = searchParams.get("searchLocation");
    const searchCategoryFromUrl = searchParams.get("searchCategory");

    if (searchTermFromUrl || searchLocationFromUrl || searchCategoryFromUrl) {
      setSearchTerm(searchTermFromUrl || "");
      setSearchLocation(searchLocationFromUrl || "");
      setSearchCategory(searchCategoryFromUrl || "");
    }
  }, [searchParams]);

  return (
    <div className="mx-auto my-[30px]">
      <div className="relative h-[60vw] max-h-[280px] min-h-[190px] sm:h-[34vw] sm:max-h-[420px] sm:min-h-[220px] rounded-2xl overflow-hidden shadow-[0_24px_50px_-20px_rgba(7,19,40,0.5)] ring-1 ring-black/5">
        <Slider />

        {/* Gradient overlay for legibility + polish over the sliding photos */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,19,40,0.75)_0%,rgba(7,19,40,0.35)_45%,rgba(7,19,40,0.05)_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-[30%] max-lg:bottom-[38%] max-sm:bottom-[42%] left-[6vw] flex max-w-[50%] max-lg:max-w-[70%] max-sm:max-w-[80%] flex-col items-start gap-[1.5vw] animate-[fadeIn_3s]">
          <h2 className="text-[58px] max-lg:text-[26px] max-sm:text-xl font-medium text-white drop-shadow-[2px_3px_6px_rgba(0,0,0,0.65)] leading-tight">
            Welcome to Nigeria&apos;s Largest Marketplace
          </h2>
          <p className="max-sm:hidden text-[1vw] text-white drop-shadow-[1px_2px_4px_rgba(0,0,0,0.6)]">
            Buy and sell everything from used cars to mobile phones and
            computers, or search for property, jobs and more.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 -mt-8 mx-4 sm:mx-auto sm:absolute sm:-mt-0 sm:bottom-[8%] sm:left-[6vw] sm:w-[88%] max-w-[900px] flex flex-col sm:flex-row gap-2 bg-white dark:bg-navy-deep sm:bg-white/95 sm:dark:bg-navy-deep/95 backdrop-blur-sm rounded-xl sm:rounded-full p-2 shadow-[0_16px_30px_-14px_rgba(7,19,40,0.4)]"
      >
        <input
          type="text"
          placeholder="What are you looking for?"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-0 rounded-lg sm:rounded-full border border-transparent px-4 py-3 max-sm:py-2.5 text-sm font-medium text-navy-ink dark:text-white bg-transparent outline-none placeholder:font-normal placeholder:text-muted focus:border-accent transition"
        />

        <select
          id="location"
          name="location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="flex-1 min-w-0 rounded-lg sm:rounded-full border border-transparent px-4 py-3 max-sm:py-2.5 text-sm font-medium text-navy-ink dark:text-white bg-transparent outline-none focus:border-accent transition"
        >
          <option value="">Select Available Location</option>
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="edo">Edo</option>
          <option value="warri">Warri</option>
          <option value="ogun">Ogun</option>
        </select>

        <select
          id="category"
          name="category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="flex-1 min-w-0 rounded-lg sm:rounded-full border border-transparent px-4 py-3 max-sm:py-2.5 text-sm font-medium text-navy-ink dark:text-white bg-transparent outline-none focus:border-accent transition"
        >
          <option value=""> Select Category</option>
          <option value="cars">Cars</option>
          <option value="electronics">Electronics</option>
          <option value="mobiles">Mobiles</option>
          <option value="furnitures">Furnitures</option>
          <option value="fashion">Fashion</option>
          <option value="jobs">Jobs</option>
          <option value="apartment">Apartment</option>
          <option value="animals">Animals</option>
          <option value="computer">Laptop or Pc</option>
          <option value="services">Services</option>
          <option value="personals">Personals</option>
        </select>

        <button className="shrink-0 rounded-lg sm:rounded-full bg-navy hover:bg-navy-deep transition px-6 py-3 max-sm:py-2.5 text-sm font-semibold text-white">
          Search Now
        </button>
      </form>
    </div>
  );
};

export default Header;
