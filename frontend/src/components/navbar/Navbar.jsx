import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

import { TbCategory } from "react-icons/tb"
import { MdAdd } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa6";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { MdOutlineBookmarks } from "react-icons/md";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { user, setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser('');
    setMenu("home")
    navigate("/");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <h2 className="logo" onClick={() => {setMenu("home"), scrollToTop()}}>
          247<span>Market <FaStore /> </span> 
        </h2>
      </Link>

      <ul className="navbar-menu">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to={'/discover'}
          onClick={() => setMenu("discover")}
          className={menu === "discover" ? "active" : ""}
        >
          Discover
        </Link>

        <Link
          to={'/categories'}
          onClick={() => setMenu("categories")}
          className={menu === "categories" ? "active" : ""}
        >
          Categories
        </Link>

        <a
          href="#footer"
          onClick={() => {navigate('/'), setMenu("contact-us")}}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact-Us
        </a>
      </ul>

      <div className="navbar-right">
        {!user ? (
          <button onClick={() => setShowLogin(true)}>Post an Ad</button>
        ) : (
          <>
            {/* <MdOutlineBookmarks className="bookmarkList" onClick={() => {navigate("/bookmark"), setMenu("") }} /> */}
            <div className="navbar-profile">
              <MdOutlineBookmarks className="icon"/>

              <ul className="nav-profile-dropdown">
                <li onClick={() => {navigate(`/bookmark`), setMenu("")}}>
                  <MdOutlineBookmarks className="icon"/>
                  <p>Bookmark</p>
                </li>
                <hr />
              </ul>
            </div>

            <div className="navbar-profile">
              <CgProfile className="icon"/>

              <ul className="nav-profile-dropdown">
                <li onClick={() => {navigate("/create-ad"), setMenu("")}}>
                  <MdAdd className="icon"/>
                  <p>Create Ad</p>
                </li>
                <hr />

                <li onClick={() => {navigate("/discover"), setMenu("")}}>
                  <RiCompassDiscoverLine className="icon"/>
                  <p>Discover</p>
                </li>
                <hr />

                <li onClick={() => {navigate("/categories"), setMenu("")}}>
                  <TbCategory className="icon"/>
                  <p>Categories</p>
                </li>
                <hr />

                <li onClick={() => {navigate(`/profile/${user}`), setMenu("")}}>
                  <CgProfile className="icon"/>
                  <p>Profile</p>
                </li>
                <hr />

                <li onClick={logout}>
                  <BiLogOut className="icon"/>
                  <p>Logout</p>
                </li>
                <hr />
              </ul>
            </div>
          </>

        )}
      </div>
    </div>
  );
};

export default Navbar;
