import React, { useContext, useEffect, useState } from "react";
import "./AdDisplay.css";
import { StoreContext } from "../../context/storeContext";
import AdItem from "../adItem/AdItem";
import axios from "axios";


const AdDisplay = ({ category }) => {
  const { url } = useContext(StoreContext);
  const [adList, setAdList] = useState([]);

  const fetchAdList = async() => {
    const res = await axios.get(`${url}/api/ads/list`);
    setAdList(res.data.data)
  };

  useEffect(() => {
    fetchAdList();
  }, [category])

  return (
    <div className="ad-display" id="ad-display">
      <h2>Top ads near you</h2>

      <div className="ad-display-list">
        {adList?.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <AdItem
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item?.price}
                adImage={item.adImage}
              />
            );
          }
        })}
      </div>
      
    </div>
  );
};

export default AdDisplay;
