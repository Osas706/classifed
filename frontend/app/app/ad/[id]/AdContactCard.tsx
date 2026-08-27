"use client";

import { useState } from "react";
import { FaPhoneSquare } from "react-icons/fa";
import { RiShieldCheckFill, RiTimeLine } from "react-icons/ri";

interface AdContactCardProps {
  displayImage?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  sellerStatus?: string;
}

const AdContactCard = ({ displayImage, firstName, lastName, email, phoneNumber, sellerStatus }: AdContactCardProps) => {
  const [click, setClick] = useState(false);
  const isVerified = sellerStatus === "verified";

  return (
    <div className="lg:sticky lg:top-4 bg-navy dark:bg-surface-dark border border-navy dark:border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
      <span
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          isVerified ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-300"
        }`}
      >
        {isVerified ? (
          <>
            <RiShieldCheckFill /> Verified seller
          </>
        ) : (
          <>
            <RiTimeLine /> Pending verification
          </>
        )}
      </span>

      <button
        onClick={() => setClick(!click)}
        className="flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-white text-sm font-medium hover:bg-white/10 transition"
      >
        {click ? "Hide contact" : "Show contact"} <FaPhoneSquare />
      </button>

      {click && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayImage}
            alt={`${firstName} ${lastName}`.trim() || "Seller profile photo"}
            className="h-20 w-20 rounded-full border-2 border-white object-cover bg-white/10"
          />

          <div className="flex flex-col items-center text-white">
            <p className="font-semibold capitalize">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-white/80">{email}</p>
            <p className="text-sm text-white/80">{phoneNumber}</p>
          </div>
        </div>
      )}

      <p className="text-[11px] text-white/60 border-t border-white/20 pt-3 mt-1">
        Do not contact users with unsolicited services or offers
      </p>
    </div>
  );
};

export default AdContactCard;
