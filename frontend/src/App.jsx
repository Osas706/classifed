import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homePage/Home";
import CategoriesPage from "./pages/categoriesPage/CategoriesPage";
import CreateAd from "./pages/createAd/CreateAd";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ad from "./pages/ad/Ad";
import Background from "./components/Background";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : ''}

      <div className="app">
        <ToastContainer />
        <Navbar  setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ad/:id" element={<Ad />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
