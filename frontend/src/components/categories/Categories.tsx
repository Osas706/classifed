"use client";

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

interface CategoriesProps {
  adList: any[];
}

const Categories = ({ adList }: CategoriesProps) => {
  const { category, setCategory } = useStore();

  const categoryCounts = adList.reduce((acc: Record<string, number>, ad) => {
    acc[ad.category] = (acc[ad.category] || 0) + 1;
    return acc;
  }, {});

  const items = [
    { key: "cars", label: "Cars", Icon: IoCarSportOutline },
    { key: "electronics", label: "Electronics", Icon: FaTv },
    { key: "mobiles", label: "Mobiles", Icon: HiDevicePhoneMobile },
    { key: "furnitures", label: "Furnitures", Icon: MdOutlineChair },
    { key: "fashion", label: "Fashion", Icon: LuShirt },
    { key: "jobs", label: "Jobs", Icon: IoBriefcaseOutline },
    { key: "apartment", label: "Apartment", Icon: BsHouse },
    { key: "animals", label: "Animals", Icon: PiDog },
    { key: "computer", label: "Computer", Icon: FaLaptop },
    { key: "services", label: "Services", Icon: GiPaintRoller },
    { key: "personals", label: "Personals", Icon: FaRegHeart },
  ];

  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-navy/10 dark:border-white/10" id="explore-ad">
      <div className="text-center">
        <h2 className="text-navy-ink dark:text-white text-xl font-bold">Ads By Category</h2>
        <p className="text-muted dark:text-white/60 text-sm mt-1">Select to explore</p>
      </div>

      <div className="flex items-stretch gap-4 overflow-x-auto py-3 px-1 [&::-webkit-scrollbar]:hidden">
        {items.map(({ key, label, Icon }) => {
          const isActive = category === key;

          return (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`relative shrink-0 flex flex-col items-center gap-2 rounded-2xl px-3 py-4 w-[104px] border transition ${
                isActive
                  ? "bg-navy dark:bg-accent border-navy dark:border-accent"
                  : "bg-white dark:bg-surface-dark border-navy/10 dark:border-white/10 hover:border-accent hover:-translate-y-0.5"
              }`}
            >
              {categoryCounts?.[key] > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {categoryCounts[key]}
                </span>
              )}

              <Icon className={`text-2xl ${isActive ? "text-white dark:text-navy-deep" : "text-navy dark:text-white"}`} />

              <span
                className={`text-xs font-semibold text-center leading-tight ${
                  isActive ? "text-white dark:text-navy-deep" : "text-navy-ink dark:text-white/80"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
