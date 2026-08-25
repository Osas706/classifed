"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaStore } from "react-icons/fa6";
import { MdOutlineHome, MdAdd, MdOutlineBookmarks, MdMenu, MdClose, MdLogout } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import useStore from "../../store/useStore";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, bookmarks, setShowLogin } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <>
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-white/90 dark:bg-navy-deep/90 backdrop-blur-[10px] border-b border-[#e7e2d8] dark:border-white/10 flex items-center justify-between px-4 z-30">
        <div className="flex items-center">
          <span className="text-xl font-bold text-[#0f447a] dark:text-accent flex items-center">
            247
            <span className="text-navy-ink dark:text-white ml-px flex items-center gap-0.5">
              Market <FaStore />
            </span>
          </span>
        </div>

        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-2xl p-1 text-navy-ink dark:text-white">
          <MdMenu />
        </button>
      </div>

      {open && <div onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-40" />}

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
            className="lg:hidden text-2xl p-1 text-navy-ink/60 dark:text-white/60 hover:text-navy-ink dark:hover:text-white"
          >
            <MdClose />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
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
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-navy-ink/70 dark:text-white/60 hover:text-navy-ink dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <MdLogout className="text-lg" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="w-full bg-navy text-white text-sm font-semibold px-4 py-3 rounded-lg transition hover:bg-navy-deep"
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
