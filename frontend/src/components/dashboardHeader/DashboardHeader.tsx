"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import useStore from "../../store/useStore";
import CurrencySelector, { useDisplayCurrency } from "../currencySelector/CurrencySelector";

const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

export const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.trim()?.charAt(0) || "";
  const last = lastName?.trim()?.charAt(0) || "";
  return `${first}${last}`.toUpperCase() || "?";
};

const WELCOME_MESSAGES = [
  "Hi {name}, what are we doing today?",
  "Welcome back, {name} 👋",
  "Hey {name}, ready to find something great?",
  "Good to see you, {name} 👋",
  "Hi {name}, let's get you a great deal today.",
  "Hey {name}, what are you looking for today?",
];

const GUEST_MESSAGES = [
  "Hi there, what are we doing today?",
  "Welcome to 247Market 👋",
  "Ready to find something great?",
  "Welcome — let's find you a great deal.",
];

const DashboardHeader = () => {
  const { theme, toggleTheme, url, user } = useStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayCurrency, setDisplayCurrency] = useDisplayCurrency();

  const [messageIndex, setMessageIndex] = useState(0);
  const [guestMessageIndex, setGuestMessageIndex] = useState(0);

  useEffect(() => {
    setMessageIndex(Math.floor(Math.random() * WELCOME_MESSAGES.length));
    setGuestMessageIndex(Math.floor(Math.random() * GUEST_MESSAGES.length));
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      if (!user) {
        setFirstName("");
        setLastName("");
        return;
      }

      try {
        const res = await axios.get(`${url}/api/user/${user}`);
        setFirstName(res?.data?.firstName || "");
        setLastName(res?.data?.lastName || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchName();
  }, [user, url]);

  const welcomeText = firstName
    ? WELCOME_MESSAGES[messageIndex].replace("{name}", capitalize(firstName))
    : GUEST_MESSAGES[guestMessageIndex];

  return (
    <div className="hidden lg:block sticky top-0 z-20 w-full bg-white dark:bg-navy-deep border-b border-[#e7e2d8] dark:border-white/10">
      <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-between gap-3 py-5">
        <p className="text-base sm:text-lg font-bold text-navy-ink dark:text-white truncate">
          {welcomeText}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <CurrencySelector value={displayCurrency} onChange={setDisplayCurrency} />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy text-navy-ink dark:text-white hover:bg-accent-soft dark:hover:bg-white/10 transition shrink-0"
          >
            {theme === "light" ? <MdOutlineDarkMode className="text-lg" /> : <MdOutlineLightMode className="text-lg" />}
          </button>

          {user && (
            <Link
              href={`/app/profile/${user}`}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy hover:bg-accent-soft dark:hover:bg-white/10 transition shrink-0"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-navy dark:bg-accent text-white dark:text-navy text-xs font-bold shrink-0">
                {getInitials(firstName, lastName)}
              </span>
              <span className="text-sm font-medium text-navy-ink dark:text-white truncate max-w-[100px]">
                {capitalize(firstName)}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
