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

const AdDisplay = () => {
  const { url, category } = useContext(StoreContext);
  const [adList, setAdList] = useState([]);
  
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
  }

  useEffect(() => {
    fetchAdList();
  }, [category]);

  const filteredAds = category === "All" ? adList : adList.filter(item => item.category === category);
  const displayedAds = filteredAds.slice(0, 8);


  return (
    <div className="ad-display" id="ad-display">
      <div className="top">
        <h2>Top ads near you</h2>

        <Link className="view-all" to={"/categories"}>
          View All <FaExpand className="icon" />
        </Link>
      </div>

      {/* *****************ad display list ***************** */}
      <div className="ad-display-list">
        {displayedAds.map((item, index) => {
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
      </div>

      {
          (!loading && displayedAds.length === 0) && (
            <div className="displayError">
              <img src={ErrorImg} alt="" />
              <h3>Oops! Something went wrong. <br /> Make sure you are connectedto the internet or try again later.</h3>
            </div>
          )
        }

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
