import React, { useEffect, useState } from "react";
import axios from "axios";
import AdItem from "../../components/adItem/AdItem";
import Background from '../../components/Background'
import useStore from "../../store/useStore";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router-dom";

const Search = () => {
  const { url, user } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedAds, setSearchedAds] = useState([]);

  //pagination start************************
  const [currentPage, setCurrentPage] = useState(1);
  const searchedPerPage = 8;
  const lastIndex = currentPage * searchedPerPage;
  const firstIndex = lastIndex - searchedPerPage;
  const search = searchedAds.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(searchedAds.length / searchedPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };
  //end ************************


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const searchLocationFromUrl = urlParams.get("searchLocation");
    const searchCategoryFromUrl = urlParams.get("searchCategory");

    if(searchTermFromUrl || searchLocationFromUrl || searchCategoryFromUrl){
      setSearchTerm(searchTermFromUrl)
      setSearchLocation(searchLocationFromUrl)
      setSearchCategory(searchCategoryFromUrl)
    };

    const fetchAds = async () => {
      setLoading(true);

      try {
        const searchQuery = urlParams.toString();
        const res = await axios.get(`${url}/api/ads/search?${searchQuery}`);
        setSearchedAds(res.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [location.search]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set('searchTerm', searchTerm);
    urlParams.set('searchCategory', searchCategory);
    urlParams.set('searchLocation', searchLocation);

    const searchQuery = urlParams.toString();

    const res = await axios.get(`${url}/api/ads/search?${searchQuery}`);
    setSearchedAds(res.data?.data);
  };


  return (
    <div className="flex flex-col items-center">
      <Background />
      <h1 className="mt-[30px]">Search result for "{searchTerm || searchLocation || searchCategory}" </h1>

      <form onSubmit={handleSubmit} className="mx-auto mt-5 mb-0 flex flex-wrap items-center gap-[5px]">
        <input
          type="text"
          placeholder="What are you looking for ?"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex p-[10px]"
        />

        <select
          id="location"
          name="location"
          onChange={(e) => setSearchLocation(e.target.value)}
          className="flex p-[10px]"
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
          onChange={(e) => setSearchCategory(e.target.value)}
          className="flex p-[10px]"
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

        <button type="submit" className="bg-navy p-[10px] text-white">Search Now</button>
      </form>

      {loading && (
        <div className="mx-auto my-[50px] flex w-[40%] items-center justify-center rounded-[20px] px-5 py-0">
          <div className="ballLoader"></div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[30px] gap-y-[50px] rounded-2xl">
        {search.map((item, index) => {
          return (
            <AdItem
              key={index}
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
          );
        })}

        {!loading && search.length === 0 && (
          <div className="mx-auto my-10 flex flex-col items-center gap-[10px]">
            <h3 className="flex items-center text-navy">There are currently no results for this search <TbMoodCry /></h3>
            <p>You can click on the button below to create a new ad</p>
            <Link className="rounded bg-navy px-[15px] py-[10px] text-white" to={'/app/create-ad'}>Post an Ad</Link>
          </div>
        )}
      </div>

      <nav className="mx-auto mt-[50px]">
        <ul className="flex items-center gap-[10px]">
          <li className="cursor-pointer rounded-[10px] border border-navy bg-navy px-2 py-1 text-white">
            <p onClick={prevPage}>prev</p>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`cursor-pointer rounded-[10px] border border-navy px-2 py-1 ${
                currentPage === n ? "bg-white text-navy" : "bg-navy text-white"
              }`}
              key={i}
            >
              <p onClick={() => changePage(n)}>{n}</p>
            </li>
          ))}

          <li className="cursor-pointer rounded-[10px] border border-navy bg-navy px-2 py-1 text-white">
            <p onClick={nextPage}>next</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Search;
