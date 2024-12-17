import React, { useContext, useEffect, useState } from "react";
import "./AdDisplay.css";
import { StoreContext } from "../../context/storeContext";
import AdItem from "../adItem/AdItem";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import ErrorImg from '/error.png';
import Item from "antd/es/list/Item";

const AdDisplay = ({adList, setAdList}) => {
  const { url, category } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [newsLetter, setNewsLetter] = useState('');  

  const fetchAdList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/list`);
      setAdList(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const subscribeToNewsletter = (e) => {
    e.preventDefault();
    toast.success(`${newsLetter} subscribed to 247market Newsletter`);
    setNewsLetter('')
  };

  useEffect(() => {
    fetchAdList();

  }, [category]);

  const filteredAds = category === "All" ? adList : adList.filter(item => item.category === category);
  const displayedAds = filteredAds.slice(0, 16);

  //pagination start************************
  const [currentPage, setCurrentPage] = useState(1);
  const displayAdsPerPage = 8;
  const lastIndex = currentPage * displayAdsPerPage;
  const firstIndex = lastIndex - displayAdsPerPage;
  const display = displayedAds.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(displayedAds.length / displayAdsPerPage);
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


  return (
    <div className="ad-display" id="ad-display">
      <div className="top">
        <h2>Recent ads for you</h2>

        <Link className="view-all" to={"/categories"}>
          View All <FaExpand className="icon" />
        </Link>
      </div>

      {/* *****************ad display list ***************** */}
      <div className="ad-display-list">
        {display.map((item, index) => {
            return (
              <AdItem
                key={index}
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
            );
        })}
      </div>

      {
        (!loading && display.length === 0) && (
          <div className="displayError">
            <img src={ErrorImg} alt="" />
            <h3>Oops! Something went wrong. <br /> Make sure you are connected to the internet or try again later.</h3>
          </div>
        )
      }

      {/* ************ display list pagaination *********** */}
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

      {loading && <div className="loaderCont">
        <span className="ballLoader"></span>
      </div>}

      <div className="lineStroke"></div>

      <div className="news-letter">
        <div className="title">
          <BiMailSend className="title-icon" />

          <div className="title-detail">
            <h3>Subscribe to Newsletter</h3>
            <p>and receive new ads in inbox</p>
          </div>
        </div>

        <form className="form" onSubmit={subscribeToNewsletter}>
          <input 
            type="text" placeholder="Enter your email" 
            name="" 
            value={newsLetter}
            onChange={(e) => setNewsLetter(e.target.value)}
          />

          <button type="submit">
            Subcribe
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdDisplay;
