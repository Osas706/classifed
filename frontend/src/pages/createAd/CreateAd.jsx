import React, { useEffect, useState } from "react";
import UploadImg from "/upload.png";
import DisplayUploadImg from "/hi.png";
import { FiSend } from "react-icons/fi";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { GetCountries, GetState } from "react-country-state-city";
import Background from "../../components/Background";
import useStore from "../../store/useStore";
import axios from "axios";
import { toast } from "react-toastify";
import Map from "../../components/map/Map";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { id: 1, label: "Ad Details" },
  { id: 2, label: "Location" },
  { id: 3, label: "Your Details" },
  { id: 4, label: "Review" },
];

const CreateAd = () => {
  const { url, user } = useStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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
  const navigate = useNavigate();

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

  const validateStep = (targetStep) => {
    if (targetStep === 1) {
      if (!adData.title || !adData.category || !adData.condition) {
        toast.error("Please fill in title, category and condition");
        return false;
      }
    }

    if (targetStep === 3) {
      if (!adData.firstName || !adData.lastName || !adData.email || !adData.phoneNumber) {
        toast.error("Please fill in your name, email and phone number");
        return false;
      }
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

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
        navigate(`/app/ad/${res.data.ad?._id}`);
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
    <form onSubmit={handleSubmit} className="mx-auto my-[30px] mb-20 flex w-[92%] sm:w-[92%] max-w-[720px] flex-col gap-[30px]">
      <Background />

      <div className="text-center">
        <h2 className="mb-1 text-[36px] sm:text-[26px] text-navy-ink">Create Your Ad</h2>
        <p className="mb-[26px] text-base text-muted">What can we advertise for you today?</p>

        <div className="flex items-center justify-center">
          {STEPS.map((s, index) => (
            <React.Fragment key={s.id}>
              <div className="flex min-w-[90px] flex-col items-center gap-1.5">
                <span
                  className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 text-sm font-bold transition-[0.25s] ${
                    step > s.id
                      ? "border-accent bg-accent text-white"
                      : step === s.id
                      ? "border-navy bg-navy text-white"
                      : "border-[#c9c9c9] bg-white text-[#808080]"
                  }`}
                >
                  {step > s.id ? "✓" : s.id}
                </span>
                <span
                  className={`max-[750px]:hidden whitespace-nowrap text-xs font-semibold ${
                    step === s.id ? "text-navy" : "text-[#808080]"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <span className="mb-5 h-0.5 w-10 max-[750px]:w-[22px] bg-[#d9d9d9]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-navy/10 bg-white/75 p-[34px_30px] max-[750px]:p-[24px_18px] shadow-[0_20px_40px_-24px_rgba(7,19,40,0.3)] backdrop-blur-[8px]">
        {step === 1 && (
          <div className="flex animate-[fadeIn_0.3s] flex-col gap-[18px]">
            <label htmlFor="title" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Title
              <input
                type="text"
                name="title"
                placeholder="Enter your ad title..."
                required
                value={adData.title}
                onChange={onChangeHandler}
                className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
              />
            </label>

            <label htmlFor="description" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Ad Description
              <textarea
                name="description"
                placeholder="Describe your ad..."
                value={adData.description}
                onChange={onChangeHandler}
                className="min-h-[130px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] pt-3 text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
              />
            </label>

            <div className="flex w-full items-center gap-5 max-[750px]:flex-col max-[750px]:items-stretch">
              <label htmlFor="category" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Select Category
                <select id="category" name="category" value={adData.category} onChange={onChangeHandler} className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white">
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

              <label htmlFor="condition" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Select Condition
                <select id="condition" name="condition" value={adData.condition} onChange={onChangeHandler} className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white">
                  <option value="">Select Condition</option>
                  <option value="Old">Old</option>
                  <option value="Fairly Used">Fairly Used</option>
                  <option value="Slightly New">Slightly New</option>
                  <option value="Brand New">Brand New</option>
                </select>
              </label>
            </div>

            <label htmlFor="price" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Price (₦)
              <input
                type="number"
                name="price"
                value={adData.price}
                onChange={onChangeHandler}
                className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
              />
            </label>

            <label htmlFor="terms" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Your Terms
              <div className="flex h-6 items-center gap-6">
                <label htmlFor="fixedPrice" className="flex flex-row items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    name="fixedPrice"
                    id="Fixed Price"
                    onChange={onChangeHandler}
                    checked={adData?.terms === "Fixed Price"}
                    className="w-min accent-navy"
                  />
                  Fixed Price
                </label>

                <label htmlFor="negotiable" className="flex flex-row items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    name="negotiable"
                    id="Negotiable"
                    onChange={onChangeHandler}
                    checked={adData?.terms === "Negotiable"}
                    className="w-min accent-navy"
                  />
                  Negotiable
                </label>
              </div>
            </label>

            <label htmlFor="adImage" className="h-[220px] w-full">
              Upload Ad Image
              <img
                src={
                  adData?.adImage
                    ? URL?.createObjectURL(adData?.adImage)
                    : UploadImg
                }
                className="h-[90%] w-full cursor-pointer rounded-[10px] border border-dashed border-[#b6b6b6] bg-[#f7faf9] object-contain"
              />
              <input
                type="file"
                name="adImage"
                id="adImage"
                hidden
                onChange={onChangeHandler}
              />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="flex animate-[fadeIn_0.3s] flex-col gap-[18px]">
            <span className="text-sm font-medium text-[#808080]">
              Feel free to adjust latitude and longitude to the exact location of your ad (use google map to get latitude & longitude)...
            </span>

            <div className="flex w-full items-center gap-5 max-[750px]:flex-col max-[750px]:items-stretch">
              <label htmlFor="lat" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Latitude
                <input
                  type="text"
                  name="lat"
                  placeholder="Latitude Loading..."
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
                />
              </label>

              <label htmlFor="long" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Longitude
                <input
                  type="text"
                  name="long"
                  placeholder="Longitude Loading..."
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                  className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
                />
              </label>
            </div>

            {(lat || long) && (
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Location on map
                <div className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-[10px]">
                  <Map lat={lat} long={long} title={adData?.title} />
                </div>
              </label>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex animate-[fadeIn_0.3s] flex-col gap-[18px]">
            <label htmlFor="displayImage" className="mx-auto h-[140px] w-[120px] cursor-pointer">
              <img
                src={
                  adData?.displayImage
                    ? URL?.createObjectURL(adData?.displayImage)
                    : DisplayUploadImg
                }
                className="h-[90%] w-full rounded-full border border-navy bg-[#f7faf9] object-cover"
              />
              <input
                type="file"
                name="displayImage"
                id="displayImage"
                hidden
                onChange={onChangeHandler}
              />
            </label>

            <div className="flex w-full items-center gap-5 max-[750px]:flex-col max-[750px]:items-stretch">
              <label htmlFor="firstName" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                First Name
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your firstName"
                  value={adData.firstName}
                  onChange={onChangeHandler}
                  className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
                />
              </label>

              <label htmlFor="lastName" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your lastName"
                  value={adData.lastName}
                  onChange={onChangeHandler}
                  className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
                />
              </label>
            </div>

            <label htmlFor="email" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter valid email address"
                value={adData.email}
                onChange={onChangeHandler}
                className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
              />
            </label>

            <label htmlFor="phoneNumber" className="flex flex-col gap-1.5 text-sm font-semibold text-navy-ink">
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                placeholder="xxx-xxx-xxx-xxxx"
                value={adData.phoneNumber}
                onChange={onChangeHandler}
                className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white"
              />
            </label>

            <div className="flex w-full items-center gap-5 max-[750px]:flex-col max-[750px]:items-stretch">
              <label htmlFor="country" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                Country
                <select onChange={onChangeHandler} name="country" id="country" className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white">
                  <option value="">Select country</option>
                  {countriesList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="state" className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-navy-ink">
                State
                <select onChange={onChangeHandler} name="state" id="state" className="h-[46px] w-full rounded-lg border border-[#d7d7d7] bg-[#f7faf9] p-[10px_14px] text-[15px] font-normal text-navy-ink outline-none transition-[0.2s] focus:border-accent focus:bg-white">
                  <option value="">Select state</option>
                  {stateList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex animate-[fadeIn_0.3s] flex-col gap-6">
            <div className="flex gap-[18px] rounded-2xl border border-[#e2e8e6] bg-[#f7faf9] p-[18px] max-[750px]:flex-col max-[750px]:items-center max-[750px]:text-center">
              <img
                src={adData?.adImage ? URL?.createObjectURL(adData?.adImage) : UploadImg}
                alt="ad preview"
                className="h-[100px] w-[100px] shrink-0 rounded-[10px] bg-white object-cover"
              />

              <div>
                <h3 className="mb-1.5 text-lg text-navy-ink">{adData.title || "Untitled ad"}</h3>
                <p className="mb-2.5 text-sm text-muted">{adData.description || "No description provided"}</p>

                <ul className="flex flex-col gap-1 text-[13px] text-[#333] list-none">
                  <li><strong>Category:</strong> {adData.category || "—"}</li>
                  <li><strong>Condition:</strong> {adData.condition || "—"}</li>
                  <li><strong>Price:</strong> ₦{Number(adData.price || 0).toLocaleString()}</li>
                  <li><strong>Terms:</strong> {adData.terms}</li>
                  <li><strong>Location:</strong> {adData.state || "—"}, {adData.country || "—"}</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-[18px] rounded-2xl border border-[#e2e8e6] bg-[#f7faf9] p-[18px] max-[750px]:flex-col max-[750px]:items-center max-[750px]:text-center">
              <img
                src={adData?.displayImage ? URL?.createObjectURL(adData?.displayImage) : DisplayUploadImg}
                alt="advertiser"
                className="h-[100px] w-[100px] shrink-0 rounded-full bg-white object-cover"
              />

              <div>
                <h3 className="mb-1.5 text-lg text-navy-ink">{adData.firstName} {adData.lastName}</h3>
                <ul className="flex flex-col gap-1 text-[13px] text-[#333] list-none">
                  <li><strong>Email:</strong> {adData.email || "—"}</li>
                  <li><strong>Phone:</strong> {adData.phoneNumber || "—"}</li>
                </ul>
              </div>
            </div>

            <label className="flex flex-row items-center gap-2 text-sm font-medium text-navy-ink">
              <input type="checkbox" required className="w-min accent-navy" />
              By Continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#d7d7d7] bg-white p-[14px_26px] text-base font-bold text-navy-ink transition-[0.25s] hover:bg-[#f2f2f2]"
          >
            <HiOutlineArrowLeft /> Back
          </button>
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={goNext}
            className="ml-auto flex items-center justify-center gap-2 rounded-full border-none bg-navy p-[14px_26px] text-base font-bold text-white transition-[0.25s] hover:bg-navy-deep"
          >
            Next <HiOutlineArrowRight />
          </button>
        ) : (
          <button
            disabled={loading}
            type="submit"
            className="ml-auto flex items-center justify-center gap-2 rounded-full border-none bg-navy p-[14px_26px] text-base font-bold text-white transition-[0.25s] hover:bg-navy-deep"
          >
            {loading ? "Posting Ad..." : "Post Ad"} <FiSend className="text-lg" />
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateAd;
