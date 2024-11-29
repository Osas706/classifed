import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import DisplayUploadImg from "/hi.png";
import "./Profile.css";
import Background from "../../components/Background";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import { formatMemberSinceDate } from "../../utils/utils";


const Profile = () => {
  const displayImageRef = useRef(null);
  const { url, user } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    // password: null,
    // newPassword: null,
    userId: user,
  });
  const [displayImage, setDisplayImage] = useState(null);
  const [joinedSinceDate, setJoinedSinceDate] = useState('');

  //on change handler
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  //image change handler
  const handleImgChange = (e, state) => {
    const file = e?.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "displayImage" && setDisplayImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  //fetch current user details
  const fetchUser = async () => {
    const res = await axios.get(`${url}/api/user/${user}`);
    console.log(res);
    

    setUserData(res?.data);
    setDisplayImage(res?.data?.displayImage);
    setJoinedSinceDate(formatMemberSinceDate(res?.data?.createdAt));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //handle update function
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("firstName", userData?.firstName);
    formData.append("lastName", userData?.lastName);
    formData.append("email", userData?.email);
    formData.append("phoneNumber", userData?.phoneNumber);
    // formData.append("password", userData?.password);
    // formData.append("newPassword", userData?.newPassword);
    formData.append("displayImage", displayImage);
    formData.append("userId", user);
    formData.append("state", userData.state);
    formData.append("country", userData.country);

    try {
      const res = await axios.post(`${url}/api/user/update/${user}`, formData);

      if (res.data.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-cont">
      <Background />
      <h1>Profile</h1>

      <form onSubmit={handleUpdate} className="profile">
        <input
          onChange={(e) => handleImgChange(e, "displayImage")}
          type="file"
          ref={displayImageRef}
          name="displayImage"
          hidden
          accept="image/*"
        />

        <img
          onClick={() => displayImageRef.current.click()}
          src={displayImage ? displayImage : DisplayUploadImg}
          alt="profile"
        />

        <span>{joinedSinceDate}</span>

        <div className="doubleInput">
          <input
            type="text"
            placeholder="firstName"
            id="firstName"
            name="firstName"
            value={userData?.firstName}
            onChange={onChangeHandler}
          />

          <input
            type="text"
            placeholder="lastName"
            id="lastName"
            name="lastName"
            value={userData?.lastName}
            onChange={onChangeHandler}
          />
        </div>

        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={userData?.email}
          onChange={onChangeHandler}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          id="phoneNumber"
          name="phoneNumber"
          value={userData?.phoneNumber}
          onChange={onChangeHandler}
        />

        <div className="doubleInput">
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
            value={userData?.country}
            onChange={onChangeHandler}
          />

          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            value={userData?.state}
            onChange={onChangeHandler}
          />
        </div>

        {/* <input
          type="text"
          placeholder="Password"
          id="password"
          name="password"
          onChange={onChangeHandler}
        /> */}

        {/* <input
          type="text"
          placeholder="New Password"
          id="newPassword"
          name="newPassword"
          onChange={onChangeHandler}
        /> */}

        <button className="update-btn" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
