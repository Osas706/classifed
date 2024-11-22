import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

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
    navigate(`/search?${searchQuery}`);
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
    <div className="head">
      <div className="header">
        <div className="header-content">
          <h2>Welcome to Nigeria's Largest Marketplace</h2>
          <p>
            Buy and sell everything from used cars to mobile phones and
            computers, or search for property, jobs and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search">
          <input
            type="text"
            placeholder="What are you looking for ?"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select id="location" name="location" onChange={(e) => setSearchLocation(e.target.value)}>
            <option value="">Select Available Location</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="edo">Edo</option>
            <option value="warri">Warri</option>
            <option value="ogun">Ogun</option>
          </select>

          <select id="category" name="category" onChange={(e) => setSearchCategory(e.target.value)}>
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

          <button>Search Now</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
