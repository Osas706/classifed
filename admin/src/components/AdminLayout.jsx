import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaStore } from "react-icons/fa6";
import {
  MdOutlineDashboard,
  MdOutlinePeople,
  MdOutlineLocalOffer,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const navItems = [
  { to: "/", label: "Dashboard", icon: MdOutlineDashboard, end: true },
  { to: "/sellers", label: "Sellers", icon: MdOutlinePeople },
  { to: "/ads", label: "Ads", icon: MdOutlineLocalOffer },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // close the sidebar automatically on every route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_key");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-sand">
      {/* mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-navy text-white flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <FaStore className="text-accent text-xl" />
          <span className="font-sora font-bold text-lg">247Market</span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="text-2xl p-1"
        >
          <MdMenu />
        </button>
      </div>

      {/* backdrop, mobile only, shown when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* sidebar: static on desktop, off-canvas drawer on mobile */}
      <aside
        className={`w-64 bg-navy text-white flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="px-6 py-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <FaStore className="text-accent text-xl" />
            <span className="font-sora font-bold text-lg">247Market</span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="lg:hidden text-2xl p-1 text-white/70 hover:text-white"
          >
            <MdClose />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mx-3 mb-4 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition"
        >
          <MdLogout className="text-lg" />
          Lock Panel
        </button>
      </aside>

      <main className="flex-1 p-8 pt-24 lg:pt-8 overflow-x-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
