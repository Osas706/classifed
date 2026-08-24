import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import useStore from "../../store/useStore";

const DashboardHeader = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <div className="sticky top-16 lg:top-0 z-20 flex items-center justify-end gap-3 bg-sand/90 dark:bg-navy-deep/90 backdrop-blur-[10px] border-b border-[#e7e2d8] dark:border-white/10 px-4 lg:px-0 lg:pb-4 py-3 lg:pt-0">
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy text-navy-ink dark:text-white hover:bg-accent-soft dark:hover:bg-white/10 transition"
      >
        {theme === "light" ? <MdOutlineDarkMode className="text-lg" /> : <MdOutlineLightMode className="text-lg" />}
      </button>
    </div>
  );
};

export default DashboardHeader;
