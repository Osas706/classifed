import React, { useContext, useEffect, useState } from "react";
import UploadImg from "/upload.png";
import DisplayUploadImg from "/hi.png";
import { FiSend } from "react-icons/fi";
import { GetCountries, GetState } from "react-country-state-city";
import "./CreateAd.css";
import Background from "../../components/Background";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
import Map from "../../components/map/Map";

const CreateAd = () => {
  const { url, user } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: 0,
    terms: "Negotiable",
    adImage: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    displayImage: "",
    country: "",
    state: "",
  });
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((postion) => {
        setLat(postion.coords.latitude);
        setLong(postion.coords.longitude);
      });
    };
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAdData({ ...adData, [name]: value });

    if (e.target.id === "Fixed Price" || e.target.id === "Negotiable") {
      setAdData({ ...adData, terms: e.target.id });
    }

    if (name === "adImage") {
      setAdData({ ...adData, [name]: e?.target?.files[0] });
    }

    if (name === "displayImage") {
      setAdData({ ...adData, [name]: e?.target?.files[0] });
    }

    if (name === "country") {
      const country = countriesList[value]; //here you will get full country object.
      setAdData({ ...adData, [name]: country?.name });

      GetState(country?.id).then((result) => {
        setStateList(result);
      });
    }

    if (name === "state") {
      const state = stateList[value]; //here you will get full state object.
      setAdData({ ...adData, [name]: state?.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("title", adData.title);
    formData.append("description", adData.description);
    formData.append("category", adData.category);
    formData.append("condition", adData.condition);
    formData.append("price", adData.price);
    formData.append("terms", adData.terms);
    formData.append("adImage", adData.adImage);
    formData.append("firstName", adData.firstName);
    formData.append("lastName", adData.lastName);
    formData.append("email", adData.email);
    formData.append("phoneNumber", adData.phoneNumber);
    formData.append("displayImage", adData.displayImage);
    formData.append("state", adData.state);
    formData.append("country", adData.country);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("user", user);

    try {
      const res = await axios.post(`${url}/api/ads/add`, formData);
      if (res.data.success) {
        // setAdData({
        //   title: "",
        //   description: "",
        //   category: "Select Category",
        //   condition: "Select Condition",
        //   price: 0,
        //   terms: "negotiable",
        //   adImage: "",

        //   firstName: "",
        //   lastName: "",
        //   email: "",
        //   phoneNumber: "",
        //   displayImage: "",
        //   country: "",
        //   state: "",
        // });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="createAdForm">
      <Background />
      {/* ****************createAdDetails*********************** */}
      <div className="createAdDetails">
        <h2>Create Your Ad</h2>
        <p>What can we advertise for you today ?</p>

        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Enter your ad title..."
            required
            value={adData.title}
            onChange={onChangeHandler}
          />
        </label>

        <label htmlFor="description">
          Ad Description
          <textarea
            name="description"
            className="description"
            placeholder="Describ your ad..."
            value={adData.description}
            onChange={onChangeHandler}
          />
        </label>

        <span>Feel free to adjust latitude and longitude to the exact location of your ad (use google map to get latitude & longitude)...</span>

        <div className="double">
          <label htmlFor="lat">
            Latitude
            <input
              type="text"
              name="firstName"
              placeholder="Latitude Loading..."
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>

          <label htmlFor="long">
            Longitude
            <input
              type="text"
              name="lastName"
              placeholder="Longitude Loading..."
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </label>
        </div>

        {(lat || long ) && 
        (<label htmlFor="">
          Location on map
          <div className="mapCreateAtCont">
          
            <Map lat={lat} long={long} title={adData?.title} />
          </div>
        </label>)}
      
        <div className="double">
          <label htmlFor="category">
            Select Category
            <select id="category" name="category" onChange={onChangeHandler}>
              <option value="">Select category for your ad</option>
              <option value="cars">Cars</option>
              <option value="electronics">Electronics</option>
              <option value="mobiles">Mobiles</option>
              <option value="furnitures">Furnitures</option>
              <option value="fashion">Fashion</option>
              <option value="jobs">Jobs</option>
              <option value="apartment">Apartment</option>
              <option value="animals">Animals</option>
              <option value="computer">Computer</option>
              <option value="services">Services</option>
              <option value="personals">Personals</option>
            </select>
          </label>

          <label htmlFor="condition">
            Select Condition
            <select id="condition" name="condition" onChange={onChangeHandler}>
              <option value="">Select Condition</option>
              <option value="Old">Old</option>
              <option value="Fairly Used">Fairly Used</option>
              <option value="Slightly New">Slightly New</option>
              <option value="Brand New">Brand New</option>
            </select>
          </label>
        </div>

        <label htmlFor="price">
          Price (₦)
          <input
            type="number"
            name="price"
            value={adData.price}
            onChange={onChangeHandler}
          />
        </label>

        <label htmlFor="terms">
          Your Terms
          <div className="radioBox">
            <label htmlFor="fixedPrice">
              <input
                type="checkbox"
                name="fixedPrice"
                id="Fixed Price"
                className="checkbox"
                onChange={onChangeHandler}
                checked={adData?.terms === "Fixed Price"}
              />
              Fixed Price
            </label>

            <label htmlFor="negotiable">
              <input
                type="checkbox"
                name="negotiable"
                id="Negotiable"
                className="checkbox"
                onChange={onChangeHandler}
                checked={adData?.terms === "Negotiable"}
              />
              Negotiable
            </label>
          </div>
        </label>

        <label htmlFor="adImage" className="imageUpload">
          Upload Ad Image
          <img
            src={
              adData?.adImage
                ? URL?.createObjectURL(adData?.adImage)
                : UploadImg
            }
          />
          <input
            type="file"
            name="adImage"
            id="adImage"
            // required
            hidden
            onChange={onChangeHandler}
          />
        </label>
      </div>

      {/* ****************createAdDetails*********************** */}
      <div className="userDetails">
        <h3>Advertizer's Details</h3>
        <p>Your details is needed...</p>

        <label htmlFor="displayImage" className="displayImageUpload">
          <img
            src={
              adData?.displayImage
                ? URL?.createObjectURL(adData?.displayImage)
                : DisplayUploadImg
            }
          />
          <input
            type="file"
            name="displayImage"
            id="displayImage"
            // required
            hidden
            onChange={onChangeHandler}
          />
        </label>

        <div className="double">
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              name="firstName"
              placeholder="Your firstName"
              value={adData.firstName}
              onChange={onChangeHandler}
            />
          </label>

          <label htmlFor="lastName">
            Last Name
            <input
              type="text"
              name="lastName"
              placeholder="Your lastName"
              value={adData.lastName}
              onChange={onChangeHandler}
            />
          </label>
        </div>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter valid email address"
            value={adData.email}
            onChange={onChangeHandler}
          />
        </label>

        <label htmlFor="phoneNumber">
          Phone Number
          <input
            type="tel"
            name="phoneNumber"
            placeholder="xxx-xxx-xxx-xxxx"
            value={adData.phoneNumber}
            onChange={onChangeHandler}
          />
        </label>

        <div className="double">
          <label htmlFor="country">
            Country
            <select onChange={onChangeHandler} name="country" id="country">
              {countriesList.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="state">
            State
            <select onChange={onChangeHandler} name="state" id="state">
              {stateList.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="radio">
          <input type="checkbox" required />
          By Continuing, I agree to the terms of use & privacy policy.
        </label>

        <button disabled={loading} type="submit" className="postAd">
          {loading ? "Posting Ad..." : "Post Ad"} <FiSend className="icon" />
        </button>
      </div>
    </form>
  );
};

export default CreateAd;
