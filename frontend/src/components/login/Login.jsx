import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/storeContext";
import { GetCountries, GetState } from "react-country-state-city";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const Login = ({ setShowLogin }) => {
  const { url, setUser, setUserDetails } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    state: "",
  });
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });

    if (name === "country") {
      const country = countriesList[value]; //here you will get full country object.
      setData({ ...data, [name]: country?.name });

      GetState(country?.id).then((result) => {
        setStateList(result);
      });
    }

    if (name === "state") {
      const state = stateList[value]; //here you will get full state object.
      setData({ ...data, [name]: state?.name });
    }
  };

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("state", data.state);
      formData.append("country", data.country);

      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const res = await axios.post(newUrl, formData);
      
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Welcome, Now create your ad");
        localStorage.setItem("user", res?.data?.userInfo?._id);
        setUserDetails(res?.data?.userInfo);
        setShowLogin(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>You need to {currentState}</h2>

          <RxCross2 onClick={() => setShowLogin(false)} className="icon" />
        </div>

        <div className="login-inputs">
          {currentState == "Login" ? (
            ""
          ) : (
            <div>
              <input
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />

              <input
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder=" Your Email"
            required
          />

          {currentState === "Sign Up" && (
            <>
              <select onChange={onChangeHandler} name="country" id="country">
                {countriesList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select onChange={onChangeHandler} name="state" id="state">
                {stateList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use and privacy policy.</p>
        </div>

        {currentState === "Sign Up" ? (
          <button disabled={loading} type="submit">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        ) : (
          <button  disabled={loading} type="submit">{loading ? "Loading..." : "Login"}</button>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
