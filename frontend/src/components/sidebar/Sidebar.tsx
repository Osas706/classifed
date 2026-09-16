"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { FaStore } from "react-icons/fa6";
import { MdOutlineHome, MdAdd, MdOutlineBookmarks, MdMenu, MdClose, MdLogout, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import useStore from "../../store/useStore";
import CurrencySelector, { useDisplayCurrency } from "../currencySelector/CurrencySelector";
import { getInitials } from "../dashboardHeader/DashboardHeader";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, bookmarks, setShowLogin, theme, toggleTheme, url } = useStore();
  const [displayCurrency, setDisplayCurrency] = useDisplayCurrency();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  const logout = () => {
    localStorage.removeItem("user");

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("bookmark")) localStorage.removeItem(key);
    });

    setUser("");
    toast.success("Bye see you soon");
    router.push("/");
  };

  const navItems = [
    { to: "/app", label: "Home", icon: MdOutlineHome, end: true },
    { to: "/app/discover", label: "Discover", icon: RiCompassDiscoverLine },
    { to: "/app/categories", label: "Categories", icon: TbCategory },
    ...(user
      ? [
          { to: "/app/bookmark", label: "Bookmark", icon: MdOutlineBookmarks, badge: bookmarks?.length },
          { to: "/app/create-ad", label: "Create Ad", icon: MdAdd },
          { to: `/app/profile/${user}`, label: "Profile", icon: CgProfile },
        ]
      : []),
  ];

  const isHome = pathname === "/app" || pathname === "/";
  const currentPage = !isHome ? navItems.find((item) => item.to === pathname || (item.to !== "/app" && pathname.startsWith(item.to))) : null;

  return (
    <>
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-white/90 dark:bg-navy-deep/90 backdrop-blur-[10px] border-b border-[#e7e2d8] dark:border-white/10 flex items-center justify-between px-4 z-30">
        <div className="flex items-center">
          {isHome || !currentPage ? (
            <span className="text-xl font-bold text-[#0f447a] dark:text-accent flex items-center">
              247
              <span className="text-navy-ink dark:text-white ml-px flex items-center gap-0.5">
                Market <FaStore />
              </span>
            </span>
          ) : (
            <span className="text-xl font-bold flex items-center gap-1.5 text-navy-ink dark:text-white">
              <currentPage.icon className="text-2xl" />
              <span>{currentPage.label}</span>
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <CurrencySelector value={displayCurrency} onChange={setDisplayCurrency} compact />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy text-navy-ink dark:text-white hover:bg-accent-soft dark:hover:bg-white/10 transition shrink-0"
          >
            {theme === "light" ? <MdOutlineDarkMode className="text-lg" /> : <MdOutlineLightMode className="text-lg" />}
          </button>

          <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-1 text-2xl text-navy-ink dark:text-white">
            <MdMenu />
          </button>
        </div>
      </div>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 lg:hidden bg-black/50" />}

      <aside
        className={`w-64 bg-white dark:bg-navy-deep border-r border-[#e7e2d8] dark:border-white/10 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        <div className="px-6 py-6 flex items-center justify-between border-b border-[#e7e2d8] dark:border-white/10">
          <span className="text-xl font-bold text-[#0f447a] dark:text-accent flex items-center">
            247
            <span className="text-navy-ink dark:text-white ml-px flex items-center gap-0.5">
              Market <FaStore />
            </span>
          </span>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-1 text-2xl lg:hidden text-navy-ink/60 dark:text-white/60 hover:text-navy-ink dark:hover:text-white"
          >
            <MdClose />
          </button>
        </div>

        <nav className="flex overflow-y-auto flex-col flex-1 gap-1 px-3 py-4">
          {navItems.map(({ to, label, icon: Icon, end, badge }) => {
            const isActive = end ? pathname === to : pathname === to || pathname?.startsWith(to + "/");

            return (
              <Link
                key={to}
                href={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-accent-soft dark:bg-white/10 text-navy dark:text-white"
                    : "text-navy-ink/70 dark:text-white/60 hover:text-navy-ink dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="text-lg" />
                {label}
                {!!badge && badge > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#e7e2d8] dark:border-white/10">
          {user ? (
            <>
              {/* <Link
                href={`/app/profile/${user}`}
                className="hidden lg:flex items-center gap-3 px-4 py-2.5 mb-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <span className="flex justify-center items-center w-8 h-8 text-xs font-bold text-white rounded-full bg-navy dark:bg-accent dark:text-navy shrink-0">
                  {getInitials(firstName, lastName)}
                </span>
                <span className="text-sm font-semibold truncate text-navy-ink dark:text-white">
                  {firstName || "Your profile"}
                </span>
              </Link> */}

              <button
                onClick={logout}
                className="flex gap-3 items-center px-4 py-3 w-full text-sm font-medium rounded-lg transition text-navy-ink/70 dark:text-white/60 hover:text-navy-ink dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                <MdLogout className="text-lg" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                setShowLogin(true);
              }}
              className="px-4 py-3 w-full text-sm font-semibold text-white rounded-lg transition bg-navy hover:bg-navy-deep"
            >
              Post an Ad
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
