import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Marketing from "./pages/marketing/Marketing";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import CountryAds from "./pages/countryAds/CountryAds";
import Home from "./pages/homePage/Home";
import CategoriesPage from "./pages/categoriesPage/CategoriesPage";
import CreateAd from "./pages/createAd/CreateAd";
import Profile from "./pages/profile/Profile";
import Ad from "./pages/ad/Ad";
import Search from "./pages/search/Search";
import Discover from "./pages/discover/Discover";
import Bookmarked from "./pages/bookmarked/Bookmarked";
import useStore from "./store/useStore";

const App = () => {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/" element={<Marketing />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/ads-in/:country" element={<CountryAds />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<CategoriesPage />} />
        {user && <Route path="create-ad" element={<CreateAd />} />}
        {user && <Route path="profile/:id" element={<Profile />} />}
        <Route path="discover" element={<Discover />} />
        <Route path="ad/:id" element={<Ad />} />
        <Route path="search" element={<Search />} />
        <Route path="bookmark" element={<Bookmarked />} />
        <Route path="*" element={<Navigate to="/app" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
