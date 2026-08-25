import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminKeyGate from "./components/AdminKeyGate";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Sellers from "./pages/sellers/Sellers";
import SellerDetail from "./pages/sellerDetail/SellerDetail";
import Ads from "./pages/ads/Ads";

const App = () => {
  return (
    <AdminKeyGate>
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="sellers/:id" element={<SellerDetail />} />
          <Route path="ads" element={<Ads />} />
        </Route>
      </Routes>
    </AdminKeyGate>
  );
};

export default App;
