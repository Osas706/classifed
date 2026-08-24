import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { formatAdDate } from "../../utils/utils";
import { FaPhoneSquare } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";
import Background from "../../components/Background";
import AdItem from "../../components/adItem/AdItem";
import Map from "../../components/map/Map";

const Ad = () => {
  const params = useParams();
  const { url, user } = useStore();
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
        <div className="mx-auto my-[180px] flex h-[50px] w-[200px] items-center justify-center">
          <div className="spinner inline-block h-[58px] w-[58px]"></div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-5 lg:flex-row">
            <img
              src={ad.adImage}
              onContextMenu={(e) => e.preventDefault()}
              alt=""
              className="mx-auto my-5 h-auto max-w-full self-start rounded-2xl bg-[whitesmoke] object-cover lg:mx-0 lg:max-w-[400px] lg:w-full"
            />

            <div className="flex flex-col items-center gap-[5px] text-center text-navy lg:items-start lg:text-left">
              <h1 className="text-[32px] capitalize lg:text-[45px]">{ad.title}</h1>
              <p className="mb-[30px]">{ad.description}</p>

              <span className="flex gap-5">
                <p className="capitalize">Category: {ad.category}</p>
                <p className="capitalize">Conditon: {ad.condition}</p>
              </span>

              <p>Term: {ad.terms}</p>

              <p className="text-xl font-bold">
                {(ad?.price === 0 || '') ? '' : '₦'}
                {(ad?.price === 0 || '') ? 'Price on inquiry' : ad?.price?.toLocaleString()}
              </p>

              <span className="flex gap-5">
                <p className="capitalize">{ad.state}</p>
                <p className="capitalize">{ad.country}</p>
              </span>

              <p>Date Added: {formattedDate}</p>
            </div>
          </div>

          <div className="mx-auto my-5 flex h-max w-full max-w-[400px] flex-col items-center gap-5 rounded-2xl border-2 border-navy bg-navy p-5 box-border lg:ml-auto lg:mr-0 lg:mt-5 lg:w-auto lg:max-w-none">
            <div
              className="flex w-max cursor-pointer items-center gap-1 rounded border border-white px-[6px] py-[3px] text-white"
              onClick={() => setClick(!click)}
            >
              Click to {click ? "hide" : "show"} contact <FaPhoneSquare />
            </div>

            {click && (
              <div className="flex w-max flex-col items-center gap-5 sm:flex-row">
                <h3 className="text-white">Ad posted by:</h3>
                <img src={ad.displayImage} alt="" className="h-20 w-20 rounded-full border border-white" />

                <div className="flex flex-col items-center text-white">
                  <span className="flex gap-1 capitalize">
                    <p>{ad.firstName}</p>
                    <p>{ad.lastName}</p>
                  </span>

                  <p>{ad.email}</p>

                  <p>{ad.phoneNumber}</p>
                </div>
              </div>
            )}

            <span className="mt-5 flex w-full max-w-[320px] justify-center text-center text-xs text-white border border-white px-[7px] py-1">
              WARNING: Do not contact users with unsolicited services or offers
            </span>
          </div>
        </div>
      )}

      {(lat || long) && (
        <div className="mt-20 flex h-[300px] w-full items-center justify-center rounded-[10px] border-[3px] border-navy bg-white/[0.42] shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-[10.4px] lg:h-[400px]">
          <Map lat={lat} long={long} title={ad?.title} />
        </div>
      )}

      <div className="mt-10 flex flex-col items-center rounded-[20px] border-[3px] border-navy bg-white/[0.42] px-[10px] py-[30px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-[10.4px] sm:py-[50px]">
        <h2 className="self-center pb-[10px] text-2xl text-navy underline opacity-80 sm:self-start sm:text-[30px]">
          More Ads From This Seller
        </h2>

        <div className="mt-5 grid w-[95%] grid-cols-[repeat(auto-fill,minmax(100%,1fr))] gap-5 sm:w-[80%] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-[30px] sm:gap-y-[50px] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
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
          <div className="relative mx-auto my-0 h-[50vh] w-[50vw] bg-transparent">
            <span className="ballLoader"></span>
          </div>
        )}

        {!loading && relatedAds.length < 2 && (
          <div className="mx-auto my-10 flex flex-col items-center gap-[10px]">
            <h3 className="flex items-center justify-self-center gap-[5px] text-navy">
              No more ads from this seller currently. <FaRegSmile />
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Ad;
