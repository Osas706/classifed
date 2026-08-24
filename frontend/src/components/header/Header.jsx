import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../slider/Slider";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    urlParams.set('searchLocation', searchLocation);
    urlParams.set('searchCategory', searchCategory);

    const searchQuery = urlParams.toString();
    navigate(`/app/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const searchLocationFromUrl = urlParams.get('searchLocation');
    const searchCategoryFromUrl = urlParams.get('searchCategory');

    if(searchTermFromUrl || searchLocationFromUrl || searchCategoryFromUrl){
      setSearchTerm(searchTermFromUrl)
      setSearchLocation(searchLocationFromUrl)  
      setSearchCategory(searchCategoryFromUrl)
    };
  }, [location.search]);

  return (
    <div className="relative mx-auto my-[30px] h-[34vw] max-h-[420px] min-h-[220px] max-sm:h-[60vw] rounded-2xl">
      <div>

        <Slider />

        <div className="absolute bottom-[30%] max-lg:bottom-[50%] max-sm:bottom-[55%] left-[6vw] flex max-w-[50%] max-lg:max-w-[45%] max-sm:max-w-[65%] flex-col items-start gap-[1.5vw] animate-[fadeIn_3s]">
          <h2 className="text-[58px] max-lg:text-[28px] font-medium text-white [text-shadow:4px_2px_black] max-lg:[text-shadow:2px_2px_black]">Welcome to Nigeria's Largest Marketplace</h2>
          <p className="max-sm:hidden text-[1vw] text-white [text-shadow:2px_2px_black]">
            Buy and sell everything from used cars to mobile phones and
            computers, or search for property, jobs and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="absolute bottom-[10%] max-sm:bottom-[4%] left-[6vw] flex w-4/5 flex-row max-sm:flex-col items-center">
          <input
            type="text"
            placeholder="What are you looking for ?"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-sm:w-full rounded-none border border-navy p-[15px] max-sm:p-[5px] font-medium max-sm:font-normal text-navy-ink outline-none placeholder:font-light placeholder:text-navy-ink hover:border-[#eaf5ff]"
          />

          <select id="location" name="location" onChange={(e) => setSearchLocation(e.target.value)} className="flex-1 max-sm:w-full rounded-none border border-navy p-[14px] max-sm:p-[5px] font-medium max-sm:font-normal text-navy-ink outline-none hover:border-[#eaf5ff]">
            <option value="">Select Available Location</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="edo">Edo</option>
            <option value="warri">Warri</option>
            <option value="ogun">Ogun</option>
          </select>

          <select id="category" name="category" onChange={(e) => setSearchCategory(e.target.value)} className="flex-1 max-sm:w-full rounded-none border border-navy p-[14px] max-sm:p-[5px] font-medium max-sm:font-normal text-navy-ink outline-none hover:border-[#eaf5ff]">
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

          <button className="border border-navy bg-navy p-[15px_12px] max-sm:w-full max-sm:p-[5px] font-extrabold max-sm:font-normal text-white hover:border-[#eaf5ff]">Search Now</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
