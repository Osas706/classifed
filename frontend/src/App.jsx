import React, { useContext, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homePage/Home";
import CategoriesPage from "./pages/categoriesPage/CategoriesPage";
import CreateAd from "./pages/createAd/CreateAd";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Profile from "./pages/profile/Profile";
import Ad from "./pages/ad/Ad";
import Search from "./pages/search/Search";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from "./context/storeContext";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useContext(StoreContext);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : ''}

      <div className="app">
        <ToastContainer />
        <Navbar  setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          { user ? <Route path="/create-ad" element={<CreateAd />} />  : ''}
          { user ? <Route path="/profile/:id" element={<Profile />} /> : ''}
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/search" element={<Search />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
