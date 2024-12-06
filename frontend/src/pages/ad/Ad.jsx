import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Ad.css";
import { StoreContext } from "../../context/storeContext";
import { formatAdDate } from "../../utils/utils";
import { FaPhoneSquare } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";
import Background from "../../components/Background";
import AdItem from "../../components/adItem/AdItem";
import Map from "../../components/map/Map";

const Ad = () => {
  const params = useParams();
  const { url, user } = useContext(StoreContext);
  const [ad, setAd] = useState({});
  const [relatedAds, setRelatedAds] = useState([]);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const formattedDate = formatAdDate(ad.createdAt);

  const fetchAd = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/${params.id}`);
      setAd(res?.data?.ad);
      setLat(res?.data?.ad?.lat);
      setLong(res?.data?.ad?.long);
      setRelatedAds(res?.data?.relatedAds);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [params.id]);

  return (
    <>
      <Background />

      {loading ? (
        <div className="loadingCont">
          <div className="loading"></div>
        </div>
      ) : (
        <div className="adItem">
          <div className="ad">
            <img
              src={ad.adImage}
              onContextMenu={(e) => e.preventDefault()}
              alt=""
            />

            <div className="adDetails">
              <h1>{ad.title}</h1>
              <p className="adDdesc">{ad.description}</p>

              <span>
                <p>Category: {ad.category}</p>
                <p>Conditon: {ad.condition}</p>
              </span>

              <p>Term: {ad.terms}</p>

              <p className="pricee">₦{ad?.price?.toLocaleString()}</p>

              <span>
                <p>{ad.state}</p>
                <p>{ad.country}</p>
              </span>

              <p>Date Added: {formattedDate}</p>
            </div>
          </div>

          <div className="adAdvertizer">
            <div className="top" onClick={() => setClick(!click)}>
              Click to {click ? "hide" : "show"} contact <FaPhoneSquare />
            </div>

            {click && (
              <div className="body">
                <h3>Ad posted by:</h3>
                <img src={ad.displayImage} alt="" />

                <div className="adAdvertizerDetails">
                  <span>
                    <p>{ad.firstName}</p>
                    <p>{ad.lastName}</p>
                  </span>

                  <p>{ad.email}</p>

                  <p>{ad.phoneNumber}</p>
                </div>
              </div>
            )}

            <span className="warning">
              WARNING: Do not contact users with unsolicited services or offers
            </span>
          </div>
        </div>
      )}

      {(lat || long) && (
        <div className="mapCont">
          <Map lat={lat} long={long} title={ad?.title} />
        </div>
      )}

      {
        <div className="relatedAds">
          <h2>More Ads From This Seller</h2>

          <div className="relatedAdsDisplay">
            {relatedAds.slice(1, 6).map((item, index) => {
              return (
                <AdItem
                  key={index}
                  id={item._id}
                  title={item?.title}
                  description={item?.description}
                  price={item?.price}
                  adImage={item?.adImage}
                  state={item?.state}
                />
              );
            })}
          </div>

          {loading && (
            <div className="loaderCont">
              <span className="ballLoader"></span>
            </div>
          )}

          {loading && relatedAds.length === 0 && (
            <div className="noAd">
              <h3>
                No more ads from this seller currently. <FaRegSmile />
              </h3>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default Ad;
