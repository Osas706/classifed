import React, { useContext, useEffect } from "react";
import axios from 'axios';
import DisplayUploadImg from "/hi.png";
import './Profile.css';
import Background from "../../components/Background";
import { StoreContext } from "../../context/storeContext";

const Profile = () => {
  const { url } = useContext(StoreContext);

  const fetchUser = async () => {
    const res = await axios.get(`${url}/api/user/me`);
    console.log(res);
    
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="profile-cont">
      <Background />
      <h1>Profile</h1>

      <form className="profile">
        <input
          // onChange={(e) => setFile(e.target.files[0])}
          type="file"
          // ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          // onClick={() => fileRef.current.click()}
          // src={formData.avatar || currentUser.avatar}
          src={DisplayUploadImg}
          alt="profile"
          className=""
        />

        <input
          type="text"
          placeholder="username"
          className=""
          id="username"
          // defaultValue={currentUser.username}
          // onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className=""
          id="email"
          // defaultValue={currentUser.email}
          // onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className=""
          id="password"
          // onChange={handleChange}
        />

        <button className="update-btn"
        // disabled={loading}
        >
          Update
          {/* {loading ? "Loading..." : "Update"} */}
        </button>

        {/* <Link to={'/create-listing'} className="">
    Create Listing
  </Link> */}
      </form>
    </div>
  );
};

export default Profile;
