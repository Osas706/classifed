import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { GetCountries, GetState } from "react-country-state-city";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const inputClass =
  "outline-none border border-[#dcdcdc] px-3.5 py-[13px] rounded-lg text-[15px] transition-[0.2s] focus:border-accent";

const Login = ({ setShowLogin }) => {
  const { url, setUser, setUserDetails } = useStore();
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
        setUser(res?.data?.userInfo?._id);
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

  const onForgotPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append("email", data.email);

      const res = await axios.post(`${url}/api/user/forgot-password`, formData);

      if (res.data.success) {
        toast.success("If that email exists, a reset link has been sent");
        setCurrentState("Login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  if (currentState === "Forgot Password") {
    return (
      <div className="fixed z-50 w-screen h-screen bg-navy-deep/55 backdrop-blur-[3px] grid">
        <form
          onSubmit={onForgotPassword}
          className="place-self-center w-[max(32vw,420px)] max-w-[92vw] max-h-[88vh] overflow-y-auto text-muted bg-white flex flex-col gap-[22px] px-[42px] py-[38px] rounded-[14px] text-[15px] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.4)] animate-[fadeIn_0.3s] sm:w-[92vw] sm:px-6 sm:py-7"
        >
          <div className="flex justify-between items-center text-navy-ink">
            <h2 className="text-[22px]">Reset your password</h2>

            <RxCross2
              onClick={() => setShowLogin(false)}
              className="text-[22px] cursor-pointer text-muted transition-[0.2s] hover:text-navy-ink"
            />
          </div>

          <p>Enter your email and we'll send you a link to reset your password.</p>

          <div className="flex flex-col gap-[18px]">
            <input
              onChange={onChangeHandler}
              value={data.email}
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className={inputClass}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="border-none px-[13px] py-[13px] rounded-lg text-white bg-navy text-[15px] font-bold cursor-pointer transition-[0.25s] hover:bg-navy-deep"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p>
            Remembered your password?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-navy font-semibold cursor-pointer hover:text-accent"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed z-50 w-screen h-screen bg-navy-deep/55 backdrop-blur-[3px] grid">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[max(32vw,420px)] max-w-[92vw] max-h-[88vh] overflow-y-auto text-muted bg-white flex flex-col gap-[22px] px-[42px] py-[38px] rounded-[14px] text-[15px] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.4)] animate-[fadeIn_0.3s] sm:w-[92vw] sm:px-6 sm:py-7"
      >
        <div className="flex justify-between items-center text-navy-ink">
          <h2 className="text-[22px]">You need to {currentState}</h2>

          <RxCross2
            onClick={() => setShowLogin(false)}
            className="text-[22px] cursor-pointer text-muted transition-[0.2s] hover:text-navy-ink"
          />
        </div>

        <div className="flex flex-col gap-[18px]">
          {currentState == "Login" ? (
            ""
          ) : (
            <div className="flex flex-col gap-[18px]">
              <input
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className={inputClass}
              />

              <input
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className={inputClass}
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
            className={inputClass}
          />

          {currentState === "Sign Up" && (
            <>
              <select
                onChange={onChangeHandler}
                name="country"
                id="country"
                className={inputClass}
              >
                {countriesList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                onChange={onChangeHandler}
                name="state"
                id="state"
                className={inputClass}
              >
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
            className={inputClass}
          />
        </div>

        {currentState === "Login" && (
          <p className="text-right -mt-2.5">
            <span
              onClick={() => setCurrentState("Forgot Password")}
              className="text-accent font-semibold cursor-pointer text-[13px]"
            >
              Forgot password?
            </span>
          </p>
        )}

        {currentState === "Sign Up" && (
          <div className="flex items-start gap-2 -mt-1.5 text-[13px]">
            <input
              type="checkbox"
              required
              className="accent-accent w-min mt-[3px]"
            />
            <p>By Continuing, I agree to the terms of use and privacy policy.</p>
          </div>
        )}

        {currentState === "Sign Up" ? (
          <button
            disabled={loading}
            type="submit"
            className="border-none px-[13px] py-[13px] rounded-lg text-white bg-navy text-[15px] font-bold cursor-pointer transition-[0.25s] hover:bg-navy-deep"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        ) : (
          <button
            disabled={loading}
            type="submit"
            className="border-none px-[13px] py-[13px] rounded-lg text-white bg-navy text-[15px] font-bold cursor-pointer transition-[0.25s] hover:bg-navy-deep"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-navy font-semibold cursor-pointer hover:text-accent"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-navy font-semibold cursor-pointer hover:text-accent"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
