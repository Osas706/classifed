import React from "react";
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
import useStore from "../../store/useStore";

const iconBase = "text-[110px] text-navy-ink dark:text-white border-4 border-transparent bg-accent-soft dark:bg-white/10 p-[30px] rounded-[40px] transition-[0.2s] max-sm:text-[80px] max-sm:p-5";
const iconActive = "border-4 border-navy-ink dark:border-accent text-navy-ink dark:text-white";
const labelBase = "mt-[10px] pb-1 text-navy-ink dark:text-white/70 text-base font-extrabold cursor-pointer";
const labelActive = "text-navy-ink dark:text-white border-b-4 border-navy-ink dark:border-accent";

const Categories = ({adList}) => {
  const { category, setCategory } = useStore();

  //adList category Count
  const categoryCounts = adList.reduce((acc, ad) => {
    acc[ad.category] = (acc[ad.category] || 0) + 1;
    return acc;
  }, {});

  const items = [
    { key: 'cars', label: 'cars', Icon: IoCarSportOutline },
    { key: 'electronics', label: 'Electronics', Icon: FaTv },
    { key: 'mobiles', label: 'Mobiles', Icon: HiDevicePhoneMobile },
    { key: 'furnitures', label: 'Furnitures', Icon: MdOutlineChair },
    { key: 'fashion', label: 'Fashion', Icon: LuShirt },
    { key: 'jobs', label: 'Jobs', Icon: IoBriefcaseOutline },
    { key: 'apartment', label: 'Apartment', Icon: BsHouse },
    { key: 'animals', label: 'Animals', Icon: PiDog },
    { key: 'computer', label: 'Computer', Icon: FaLaptop },
    { key: 'services', label: 'Services', Icon: GiPaintRoller },
    { key: 'personals', label: 'Personals', Icon: FaRegHeart },
  ];

  return (
    <div className="flex flex-col gap-[10px] border-b-2 border-navy dark:border-white/10 pb-[10px]" id="explore-ad">
      <h1 className="text-navy-ink dark:text-white font-medium text-center">Ads By Category</h1>
      <p className="text-navy-ink dark:text-white/60 font-light text-center">Select to explore</p>

      <div className="flex justify-between items-center gap-[30px] text-center my-5 overflow-scroll [&::-webkit-scrollbar]:hidden">
        {items.map(({ key, label, Icon }) => (
          <div
            key={key}
            onClick={() => setCategory(key)}
            className="relative cursor-pointer"
          >
            <Icon className={category === key ? `${iconBase} ${iconActive}` : iconBase} />
            <div className="absolute top-[18px] right-[25px] max-sm:top-[15px] max-sm:right-[15px] text-white bg-navy font-medium text-[10px] w-max h-max py-px px-1 rounded-full opacity-90">
              {categoryCounts?.[key] ?? 0}
            </div>
            <p className={category === key ? `${labelBase} ${labelActive}` : labelBase}>{label}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;
