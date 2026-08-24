import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import AdItem from "../adItem/AdItem";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import ErrorImg from '/error.png';

const AdDisplay = ({adList, setAdList}) => {
  const { url, category } = useStore();
  const [loading, setLoading] = useState(false);
  const [newsLetter, setNewsLetter] = useState('');

  const fetchAdList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/list`);

      setAdList(res?.data?.data);
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
    <div className="mt-[30px]" id="ad-display">
      <div className="flex items-center justify-between">
        <h2 className="text-[max(2vw,24px)] font-semibold text-navy-ink dark:text-white max-lg:text-[25px]">Recent ads for you</h2>

        <Link className="bg-navy text-white rounded-[3px] cursor-pointer flex items-center gap-2 py-2 px-[18px] text-lg font-semibold max-lg:py-[6px] max-lg:px-3 max-lg:text-sm" to={"/app/categories"}>
          View All <FaExpand className="text-[25px] max-lg:text-base" />
        </Link>
      </div>

      {/* *****************ad display list ***************** */}
      <div className="grid gap-[30px] gap-y-[50px] mt-[30px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
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
          <div className="flex flex-col justify-center items-center">
            <img src={ErrorImg} alt="" className="w-[300px] object-contain mx-auto" />
            <h3 className="text-center text-navy dark:text-white">Oops! Something went wrong. <br /> Make sure you are connected to the internet or try again later.</h3>
          </div>
        )
      }

      {loading && <div className="w-2/5 h-5 mx-auto my-[50px] px-5 flex justify-center items-center rounded-[20px] max-lg:w-4/5">
        <span className="ballLoader"></span>
      </div>}

      {/* ************ display list pagaination *********** */}
      <nav className="mt-[50px] mx-auto mb-0">
        <ul className="list-none flex justify-center items-center gap-[10px]">
          <li className="border border-navy bg-navy py-1 px-2 text-white rounded-[10px] cursor-pointer">
            <p onClick={prevPage} className="text-xs font-bold">prev</p>
          </li>
          {numbers.map((n, i) => (
            <li className={`border border-navy py-1 px-2 rounded-[10px] cursor-pointer ${currentPage === n ? "bg-white text-navy" : "bg-navy text-white"}`} key={i}>
              <p onClick={() => changePage(n)} className="text-xs font-bold">{n}</p>
            </li>
          ))}

          <li className="border border-navy bg-navy py-1 px-2 text-white rounded-[10px] cursor-pointer">
            <p onClick={nextPage} className="text-xs font-bold">next</p>
          </li>
        </ul>
      </nav>

      <div className="w-full h-[2px] rounded-[3px] bg-navy dark:bg-white/10 my-[60px] mx-auto"></div>

      <div className="bg-accent-soft dark:bg-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] mt-0 mx-auto py-[50px] rounded-[4px] w-4/5 flex items-center justify-center gap-[100px] max-lg:flex-col max-lg:gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <BiMailSend className="text-[70px] text-navy dark:text-accent" />

          <div>
            <h3 className="text-navy dark:text-white">Subscribe to Newsletter</h3>
            <p className="text-navy dark:text-white/70">and receive new ads in inbox</p>
          </div>
        </div>

        <form className="flex items-center" onSubmit={subscribeToNewsletter}>
          <input
            type="text" placeholder="Enter your email"
            name=""
            value={newsLetter}
            onChange={(e) => setNewsLetter(e.target.value)}
            className="w-[260px] outline-none border-none p-[10px] bg-[whitesmoke] dark:bg-navy dark:text-white max-lg:w-[200px]"
          />

          <button type="submit" className="flex items-center p-[10px] border-none bg-navy text-white">
            Subcribe
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdDisplay;
