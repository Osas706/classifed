import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import DashboardHeader from "../components/dashboardHeader/DashboardHeader";
import Login from "../components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../store/useStore";

const AppLayout = () => {
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

        <div className="flex flex-col min-h-screen lg:ml-64 pt-16 lg:pt-0">
          <main className="flex-1 w-[92%] max-w-[1400px] mx-auto py-6 pb-16">
            <DashboardHeader />
            <div className="mt-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
