import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Ad.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Ad = () => {
  const params = useParams();
  const { url, user } = useContext(StoreContext);

  const fetchAd = async () => {
    try {
      const res = await axios.get(`${url}/api/ads/${params.id}`);
      console.log(res.data.ad);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAd()
  }, [])

  return( 
   <div>

   </div>)
};

export default Ad;
