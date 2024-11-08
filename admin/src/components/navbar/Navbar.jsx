import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={'/'} className="main">
        <h2 className="logo">Come<span>Chop</span></h2>
        <h2 className="logo2">Admin<span>Panel</span></h2>
      </Link>

      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
