import React, { useContext, useEffect, useState } from "react";
import "./Discover.css";
import Background from "../../components/Background";
import AdItem from "../../components/adItem/AdItem";
import { Link } from "react-router-dom";
import { TbMoodCry } from "react-icons/tb";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Discover = () => {
  const { url, user } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [dicoverAds, setDiscoverAds] = useState([]);
  const [discoverState, setDiscoverState] = useState('');
  const [discoverCountry, setDiscoverCountry] = useState('');

  //pagination start************************
  const [currentPage, setCurrentPage] = useState(1);
  const discoverPerPage = 8;
  const lastIndex = currentPage * discoverPerPage;
  const firstIndex = lastIndex - discoverPerPage;
  const discover = dicoverAds.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(dicoverAds.length / discoverPerPage);
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

  //fetch current user details
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${url}/api/user/${user}`);
      setDiscoverCountry(res?.data?.country);
      setDiscoverState(res?.data?.state);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch discover ads
  const fetchDiscoverAds = async () => {
    const urlParams = new URLSearchParams(location.search);
    const discoverStateUrl = urlParams.get("discoverState");
    const discoverCountryUrl = urlParams.get("discoverCountry");

    if(discoverStateUrl || discoverCountryUrl){
      setDiscoverState(discoverStateUrl);
      setDiscoverCountry(discoverCountryUrl);
    };

    try {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await axios.get(`${url}/api/ads/discover?${searchQuery}`);
      setDiscoverAds(res.data?.data);
      
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

  return (
    <div className="discoverCont">
      <Background />
      <h1>Explore Local Deals and Hidden Gems in Your Area !</h1>
      <h4>Discover ads in {discoverState}, {discoverCountry}</h4>

      {loading && (
          <div className="loadingCont">
            <div className="ballLoader"></div>
          </div>
        )}

      <div className="discoverDisplay">
        {discover.map((item, index) => {
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

        {!loading && dicoverAds.length === 0 && (
          <div className="noAd">
            <h3>
              There are currently no ads in your region <TbMoodCry />
            </h3>
            <p>You can click on the button below to create a new ad</p>
            <Link className="toCreateAd" to={"/create-ad"}>
              Post an Ad
            </Link>
          </div>
        )}
      </div>

      <nav>
        <ul className="pagination">
          <li>
            <p onClick={prevPage}>prev</p>
          </li>

          {numbers.map((n, i) => (
            <li className={currentPage === n ? "pagi-active" : ""} key={i}>
              <p onClick={() => changePage(n)}>{n}</p>
            </li>
          ))}

          <li>
            <p onClick={nextPage}>next</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Discover;
