import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [searchData, setSearchData] = useState({
    search: "",
    location: "select location",
    category: "select category",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = async() => {

  };

  return (
    <div className="header">
      <div className="header-content">
        <h2>Welcome to Nigeria's Largest Marketplace</h2>
        <p>
          Buy and sell everything from used cars to mobile phones and computers,
          or search for property, jobs and more.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search">
        <input
          type="text"
          placeholder="What are you looking for ?"
          name="search"
          value={searchData.search}
          onChange={onChangeHandler}
        />

        <select id="location" name="location" onChange={onChangeHandler}>
          <option value="">Select Available Location</option>
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="edo">Edo</option>
          <option value="warri">Warri</option>
          <option value="ogun">Ogun</option>
        </select>

        <select id="category" name="category" onChange={onChangeHandler}>
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
  );
};

export default Header;
