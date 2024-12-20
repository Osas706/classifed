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

const Categories = ({adList}) => {
  const { category, setCategory } = useContext(StoreContext);

  //adList category Count
  const categoryCounts = adList.reduce((acc, ad) => {
    acc[ad.category] = (acc[ad.category] || 0) + 1;
    return acc;
  }, {});
  
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
          <div className="number">{categoryCounts?.cars}</div>
          <p className={category === "cars" ? "p" : "" }>cars</p>
        </div>

        <div
          onClick={() => setCategory('electronics')}
          className="explore-ad-list-item"
        >
          <FaTv className={category === "electronics" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.electronics}</div>
          <p className={category === "electronics" ? "p" : "" }>Electronics</p>
        </div>

        <div
          onClick={() => setCategory('mobiles')}
          className="explore-ad-list-item"
        >
          <HiDevicePhoneMobile className={category === "mobiles" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.mobiles}</div>
          <p className={category === "mobiles" ? "p" : "" }>Mobiles</p>
        </div>

        <div
          onClick={() => setCategory('furnitures')}
          className="explore-ad-list-item"
        >
          <MdOutlineChair className={category === "furnitures" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.furnitures}</div>
          <p className={category === "furnitures" ? "p" : "" }>Furnitures</p>
        </div>

        <div
          onClick={() => setCategory('fashion')}
          className="explore-ad-list-item"
        >
          <LuShirt className={category === "fashion" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.fashion}</div>
          <p className={category === "fashion" ? "p" : "" }>Fashion</p>
        </div>

        <div
          onClick={() => setCategory('jobs')}
          className="explore-ad-list-item"
        >
          <IoBriefcaseOutline className={category === "jobs" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.jobs}</div>
          <p className={category === "jobs" ? "p" : "" }>Jobs</p>
        </div>

        <div
          onClick={() => setCategory('apartment')}
          className="explore-ad-list-item"
        >
          <BsHouse className={category === "apartment" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.apartment}</div>
          <p className={category === "apartment" ? "p" : "" }>Apartment</p>
        </div>

        <div
          onClick={() => setCategory('animals')}
          className="explore-ad-list-item"
        >
          <PiDog className={category === "animals" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.animals}</div>
          <p className={category === "animals" ? "p" : "" }>Animals</p>
        </div>

        <div
          onClick={() => setCategory('computer')}
          className="explore-ad-list-item"
        >
          <FaLaptop className={category === "computer" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.computer}</div>
          <p className={category === "computer" ? "p" : "" }>Computer</p>
        </div>

        <div
          onClick={() => setCategory('services')}
          className="explore-ad-list-item"
        >
          <GiPaintRoller className={category === "services" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.services}</div>
          <p className={category === "services" ? "p" : "" }>Services</p>
        </div>

        <div
          onClick={() => setCategory('personals')}
          className="explore-ad-list-item"
        >
          <FaRegHeart className={category === "personals" ? "icon active " : "icon" }/>
          <div className="number">{categoryCounts?.personals}</div>
          <p className={category === "personals" ? "p" : "" }>Personals</p>
        </div>
      </div>

    </div>
  );
};

export default Categories;
