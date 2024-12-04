import React, { useContext, useEffect, useState } from "react";
import "./AdDisplay.css";
import { StoreContext } from "../../context/storeContext";
import AdItem from "../adItem/AdItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

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

  useEffect(() => {
    fetchAdList();
  }, [category]);

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
        {adList?.slice(0, 8).map((item, index) => {
          if (category === "All" ) {
            return (
              <AdItem
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item?.price}
                adImage={item.adImage}
                state={item.state}
              />
            );
          }
        })}

        {adList?.map((item, index) => {
          if (category === item.category) {
            return (
              <AdItem
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item?.price}
                adImage={item.adImage}
                state={item.state}
              />
            );
          }
        })}
      </div>

      {loading && <div className="loaderCont">
        <span class="lineLoader"></span>
      </div>}

      <div className="news-letter">
        <div className="title">
          <BiMailSend className="title-icon" />

          <div className="title-detail">
            <h3>Subscribe to Newsletter</h3>
            <p>and receive new ads in inbox</p>
          </div>
        </div>

        <form className="form">
          <input 
            type="text" placeholder="Enter your email" 
            name="" 
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
