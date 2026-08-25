"use client";

import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { GetCountries, GetState } from "react-country-state-city";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaStore } from "react-icons/fa6";
import { toast } from "react-toastify";

const Logo = () => (
  <div className="flex justify-center mb-1">
    <span className="text-xl font-bold text-[#0f447a] flex items-center">
      247
      <span className="text-navy-ink ml-px flex items-center gap-1">
        Market <FaStore />
      </span>
    </span>
  </div>
);

const inputClass =
  "outline-none border border-[#dcdcdc] px-3.5 py-[13px] rounded-lg text-[15px] transition-[0.2s] focus:border-accent";

interface LoginProps {
  setShowLogin: (v: boolean) => void;
}

const Login = ({ setShowLogin }: LoginProps) => {
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
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });

    if (name === "country") {
      const country = countriesList[Number(value)];
      setData({ ...data, [name]: country?.name });

      GetState(country?.id).then((result: any) => {
        setStateList(result);
      });
    }

    if (name === "state") {
      const state = stateList[Number(value)];
      setData({ ...data, [name]: state?.name });
    }
  };

  const onLogin = async (e: React.FormEvent) => {
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
      newUrl += currentState === "Login" ? "/api/user/login" : "/api/user/register";

      const res = await axios.post(newUrl, formData);

      if (res.data.success) {
        setUser(res?.data?.userInfo?._id);
        toast.success("Welcome, Now create your ad");
        localStorage.setItem("user", res?.data?.userInfo?._id);
        setUserDetails(res?.data?.userInfo);
        setShowLogin(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async (e: React.FormEvent) => {
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
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountriesList(result);
    });
  }, []);

  if (currentState === "Forgot Password") {
    return (
      <div className="fixed z-50 w-screen h-screen bg-navy-deep/55 backdrop-blur-[3px] grid">
        <form
          onSubmit={onForgotPassword}
          className="place-self-center w-[clamp(420px,32vw,480px)] max-w-[92vw] max-h-[88vh] overflow-y-auto text-muted bg-white flex flex-col gap-[22px] px-6 py-7 sm:px-[42px] sm:py-[38px] rounded-[14px] text-[15px] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.4)] animate-[fadeIn_0.3s]"
        >
          <div className="flex justify-end -mb-4">
            <RxCross2
              onClick={() => setShowLogin(false)}
              className="text-[22px] cursor-pointer text-muted transition-[0.2s] hover:text-navy-ink"
            />
          </div>

          <Logo />

          <h2 className="text-[22px] text-navy-ink text-center -mt-2">Reset your password</h2>

          <p className="text-center">Enter your email and we&apos;ll send you a link to reset your password.</p>

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
        className="place-self-center w-[clamp(420px,32vw,480px)] max-w-[92vw] max-h-[88vh] overflow-y-auto text-muted bg-white flex flex-col gap-[22px] px-6 py-7 sm:px-[42px] sm:py-[38px] rounded-[14px] text-[15px] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.4)] animate-[fadeIn_0.3s]"
      >
        <div className="flex justify-end -mb-4">
          <RxCross2
            onClick={() => setShowLogin(false)}
            className="text-[22px] cursor-pointer text-muted transition-[0.2s] hover:text-navy-ink"
          />
        </div>

        <Logo />

        <h2 className="text-[22px] text-navy-ink text-center -mt-2">You need to {currentState}</h2>

        <div className="flex flex-col gap-[18px]">
          {currentState !== "Login" && (
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
              <select onChange={onChangeHandler} name="country" id="country" className={inputClass}>
                {countriesList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select onChange={onChangeHandler} name="state" id="state" className={inputClass}>
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
            <input type="checkbox" required className="accent-accent w-min mt-[3px]" />
            <p>By Continuing, I agree to the terms of use and privacy policy.</p>
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="border-none px-[13px] py-[13px] rounded-lg text-white bg-navy text-[15px] font-bold cursor-pointer transition-[0.25s] hover:bg-navy-deep"
        >
          {currentState === "Sign Up"
            ? loading ? "Creating Account..." : "Create Account"
            : loading ? "Loading..." : "Login"}
        </button>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")} className="text-navy font-semibold cursor-pointer hover:text-accent">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")} className="text-navy font-semibold cursor-pointer hover:text-accent">
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
