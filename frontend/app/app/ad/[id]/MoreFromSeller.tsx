"use client";

import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import AdItem from "../../../../src/components/adItem/AdItem";

interface MoreFromSellerProps {
  relatedAds: any[];
}

const VISIBLE_COUNT = 5;

const MoreFromSeller = ({ relatedAds }: MoreFromSellerProps) => {
  const [expanded, setExpanded] = useState(false);

  if (relatedAds.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10">
        <h3 className="flex items-center gap-2 text-navy dark:text-white">
          No more ads from this seller currently <FaRegSmile />
        </h3>
      </div>
    );
  }

  const visibleAds = expanded ? relatedAds : relatedAds.slice(0, VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleAds.map((item: any) => (
          <AdItem
            key={item._id}
            id={item._id}
            title={item?.title}
            description={item?.description}
            price={item?.price}
            adImage={item?.adImage}
            state={item?.state}
            condition={item?.condition}
            terms={item?.terms}
            item={item}
          />
        ))}
      </div>

      {relatedAds.length > VISIBLE_COUNT && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-navy/20 dark:border-white/20 px-5 py-2 text-sm font-semibold text-navy dark:text-white hover:bg-accent-soft dark:hover:bg-white/10 transition"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreFromSeller;
