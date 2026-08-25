"use client";

import { useEffect } from "react";
import Sidebar from "../../src/components/sidebar/Sidebar";
import DashboardHeader from "../../src/components/dashboardHeader/DashboardHeader";
import Login from "../../src/components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../src/store/useStore";

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  const { showLogin, setShowLogin, user, fetchBookmarks } = useStore();

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : ""}

      <div className="min-h-screen bg-sand dark:bg-navy-deep">
        <ToastContainer />
        <Sidebar />

        <div className="flex flex-col min-h-screen lg:ml-64">
          <div className="h-16 lg:hidden shrink-0" />

          <DashboardHeader />

          <main className="flex-1 w-[92%] max-w-[1400px] mx-auto py-6 pb-16">{children}</main>
        </div>
      </div>
    </>
  );
}
