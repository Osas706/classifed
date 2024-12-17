import React, { useContext, useEffect, useState } from "react";
import "./CategoriesPage.css";
import axios from "axios";
import AdItem from "../../components/adItem/AdItem";
import { IoCarSportOutline } from "react-icons/io5";
import { FaTv } from "react-icons/fa6";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineChair } from "react-icons/md";
import { LuShirt } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { PiDog } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa6";
import { GiPaintRoller } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { StoreContext } from "../../context/storeContext";
import Background from "../../components/Background";

const CategoriesPage = () => {
  const { url, category, setCategory } = useContext(StoreContext);
  const [adList, setAdList] = useState([]);
  const [loading, setLoading] = useState(false);

  //pagination start************************
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;
  const lastIndex = currentPage * adsPerPage;
  const firstIndex = lastIndex - adsPerPage;
  const filteredAds = category === "All" ? adList : adList.filter(item => item.category === category);
  const ads = filteredAds.slice(firstIndex, lastIndex);
  // console.log(ads);
  
  const numberOfPages = Math.ceil((category === "All" ? adList.length : ads.length) / adsPerPage);
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

  const fetchAdList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/ads/list`);
      setAdList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdList();
  }, [category]);

  return (
    <div className="categoriesPage">
      <Background />
      <h1>All Categories</h1>

      <div className="categoriesCont">
        <ul className="categoriesList">
          <li
            onClick={() => setCategory("cars")}
            className={category === "cars" ? "active " : ""}
          >
            <span>
              <IoCarSportOutline className="icon" /> Cars
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("electronics")}
            className={category === "electronics" ? "active " : ""}
          >
            <span>
              <FaTv className="icon" /> Electronics
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("mobiles")}
            className={category === "mobiles" ? "active " : ""}
          >
            <span>
              <HiDevicePhoneMobile className="icon" /> Mobile
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("furnitures")}
            className={category === "furnitures" ? "active " : ""}
          >
            <span>
              <MdOutlineChair className="icon" /> Furnitures
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("fashion")}
            className={category === "fashion" ? "active " : ""}
          >
            <span>
              <LuShirt className="icon" /> Fashion
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("jobs")}
            className={category === "jobs" ? "active " : ""}
          >
            <span>
              <IoBriefcaseOutline className="icon" /> Jobs
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("apartment")}
            className={category === "apartment" ? "active " : ""}
          >
            <span>
              <BsHouse className="icon" /> Apartment
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("animals")}
            className={category === "animals" ? "active " : ""}
          >
            <span>
              <PiDog className="icon" /> Animals
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("computer")}
            className={category === "computer" ? "active " : ""}
          >
            <span>
              <FaLaptop className="icon" /> Laptops & PCs
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("services")}
            className={category === "services" ? "active " : ""}
          >
            <span>
              <GiPaintRoller className="icon" /> Services
            </span>

            <p>*</p>
          </li>

          <li
            onClick={() => setCategory("personals")}
            className={category === "personals" ? "active " : ""}
          >
            <span>
              <FaRegHeart className="icon" /> Personals
            </span>

            <p>*</p>
          </li>
        </ul>

        <div className="categoriesDisplay">
          {loading && <div className="loader"></div>}

          {ads.map((item, index) => {
            if (category === "All" || category === item.category) {
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
            }
          })}
        </div>
      </div>

      {/* **********pagination************** */}
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

export default CategoriesPage;
