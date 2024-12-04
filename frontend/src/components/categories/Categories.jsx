import React, { useContext } from "react";
import "./Categories.css";
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

const Categories = () => {
  const { category, setCategory } = useContext(StoreContext);
  
  return (
    <div className="explore-ad" id="explore-ad">
      <h1>Ads By Category</h1>
      <p>Select to explore</p>

      <div className="explore-ad-list">
        <div
          onClick={() => setCategory('cars')}
          className="explore-ad-list-item"
        >
          <IoCarSportOutline className={category === "cars" ? "icon active " : "icon" }/>
          <p className={category === "cars" ? "p" : "" }>cars</p>
        </div>

        <div
          onClick={() => setCategory('electronics')}
          className="explore-ad-list-item"
        >
          <FaTv className={category === "electronics" ? "icon active " : "icon" }/>
          <p className={category === "electronics" ? "p" : "" }>Electronics</p>
        </div>

        <div
          onClick={() => setCategory('mobiles')}
          className="explore-ad-list-item"
        >
          <HiDevicePhoneMobile className={category === "mobiles" ? "icon active " : "icon" }/>
          <p className={category === "mobiles" ? "p" : "" }>Mobiles</p>
        </div>

        <div
          onClick={() => setCategory('furnitures')}
          className="explore-ad-list-item"
        >
          <MdOutlineChair className={category === "furnitures" ? "icon active " : "icon" }/>
          <p className={category === "furnitures" ? "p" : "" }>Furnitures</p>
        </div>

        <div
          onClick={() => setCategory('fashion')}
          className="explore-ad-list-item"
        >
          <LuShirt className={category === "fashion" ? "icon active " : "icon" }/>
          <p className={category === "fashion" ? "p" : "" }>Fashion</p>
        </div>

        <div
          onClick={() => setCategory('jobs')}
          className="explore-ad-list-item"
        >
          <IoBriefcaseOutline className={category === "jobs" ? "icon active " : "icon" }/>
          <p className={category === "jobs" ? "p" : "" }>Jobs</p>
        </div>

        <div
          onClick={() => setCategory('apartment')}
          className="explore-ad-list-item"
        >
          <BsHouse className={category === "apartment" ? "icon active " : "icon" }/>
          <p className={category === "apartment" ? "p" : "" }>Apartment</p>
        </div>

        <div
          onClick={() => setCategory('animals')}
          className="explore-ad-list-item"
        >
          <PiDog className={category === "animals" ? "icon active " : "icon" }/>
          <p className={category === "animals" ? "p" : "" }>Animals</p>
        </div>

        <div
          onClick={() => setCategory('computer')}
          className="explore-ad-list-item"
        >
          <FaLaptop className={category === "computer" ? "icon active " : "icon" }/>
          <p className={category === "computer" ? "p" : "" }>Laptops & PCs</p>
        </div>

        <div
          onClick={() => setCategory('services')}
          className="explore-ad-list-item"
        >
          <GiPaintRoller className={category === "services" ? "icon active " : "icon" }/>
          <p className={category === "services" ? "p" : "" }>Services</p>
        </div>

        <div
          onClick={() => setCategory('personals')}
          className="explore-ad-list-item"
        >
          <FaRegHeart className={category === "personals" ? "icon active " : "icon" }/>
          <p className={category === "personals" ? "p" : "" }>Personals</p>
        </div>
      </div>

    </div>
  );
};

export default Categories;
