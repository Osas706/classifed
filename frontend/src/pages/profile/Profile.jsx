import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DisplayUploadImg from "/hi.png";
import useStore from "../../store/useStore";
import { toast } from "react-toastify";
import { formatMemberSinceDate } from "../../utils/utils";
import AdItem from "../../components/adItem/AdItem";
import { FaTrash } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { TbMoodCry } from "react-icons/tb";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const MY_ADS_PER_PAGE = 6;

const Profile = () => {
  const displayImageRef = useRef(null);
  const { url, user, setUser } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
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
  
  const [myAdList, setMyAdList] = useState([]);
  
  const [displayImage, setDisplayImage] = useState(null);
  const [joinedSinceDate, setJoinedSinceDate] = useState(null);
  const [updatedSinceDate, setUpdatedSinceDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.max(1, Math.ceil(myAdList.length / MY_ADS_PER_PAGE));
  const pageAds = myAdList.slice((currentPage - 1) * MY_ADS_PER_PAGE, currentPage * MY_ADS_PER_PAGE);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);


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

    setUserData(res?.data);
    setDisplayImage(res?.data?.displayImage);
    setJoinedSinceDate(formatMemberSinceDate(res?.data?.createdAt));
    setUpdatedSinceDate(formatMemberSinceDate(res?.data?.updatedAt));
  };

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

  //fetch my ads
  const fetchMyAds = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/ads/my-ads/${user}`);
      
      setMyAdList(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //delete ad
  const deleteAd = async (adId) => {
    try {
      setDelLoading(true)
      toast.warning('Deleting ad now ...')
      const res = await axios.delete(`${url}/api/ads/delete/${adId}`);

      if (res?.data?.success === true) {
        setMyAdList(
          myAdList.filter(ad => ad._id !== adId)
        );   

        toast.success(res?.data?.message)
      };

    } catch (error) {
      console.log(error);
      // toast.error(error)
    }finally{
      setDelLoading(false);
    }
  };

  //delete account
  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      setDeleteAccountLoading(true);

      const formData = new FormData();
      formData.append("password", deletePassword);

      const res = await axios.delete(`${url}/api/user/delete-account/${user}`, {
        data: formData,
      });

      if (res?.data?.success) {
        toast.success("Account deleted");
        localStorage.removeItem("user");
        setUser("");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMyAds();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [myAdList.length]);


  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center">
      <h1 className="text-[45px] max-[750px]:text-[30px] text-navy-ink dark:text-white">Profile</h1>

      <form onSubmit={handleUpdate} className="mt-[30px] flex flex-col gap-5">
        <input
          onChange={(e) => handleImgChange(e, "displayImage")}
          type="file"
          ref={displayImageRef}
          name="displayImage"
          hidden
          accept="image/*"
          required
        />

        <img
          onClick={() => displayImageRef.current.click()}
          src={displayImage ? displayImage : DisplayUploadImg}
          alt="profile"
          className="h-[150px] w-[130px] self-center rounded-[60px] border-[3px] border-black bg-accent-soft object-cover cursor-pointer"
        />

        <span className="text-center font-extrabold text-navy dark:text-accent">{parseInt(joinedSinceDate) || updatedSinceDate}</span>

        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            value={userData?.firstName}
            onChange={onChangeHandler}
            className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
          />

          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={userData?.lastName}
            onChange={onChangeHandler}
            className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={userData?.email}
          onChange={onChangeHandler}
          className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          id="phoneNumber"
          name="phoneNumber"
          value={userData?.phoneNumber}
          onChange={onChangeHandler}
          required
          className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
        />

        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
            value={userData?.country}
            onChange={onChangeHandler}
            required
            className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
          />

          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            value={userData?.state}
            onChange={onChangeHandler}
            // required
            className="h-[45px] rounded-lg border border-navy dark:border-white/20 bg-accent-soft dark:bg-white/10 p-0 px-5 text-base text-navy-ink dark:text-white outline-none"
          />
        </div>

        {/* <div className="doubleInput">
          <input
            type="text"
            placeholder="Password"
            id="password"
            name="password"
            onChange={onChangeHandler}
          />

          <input
            type="text"
            placeholder="New Password"
            id="newPassword"
            name="newPassword"
            onChange={onChangeHandler}
          />
        </div> */}

        <button className="mx-auto my-2.5 rounded border-none bg-navy px-5 py-2.5 text-base text-white" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <h2 className="mt-[50px] text-navy-ink dark:text-white">My Ads</h2>
      <p className="text-muted dark:text-white/60">All ads created by you...</p>

      <div className="mt-5 w-[92vw] max-w-[1100px] rounded-2xl border border-white/[0.61] dark:border-white/10 bg-white/[0.42] dark:bg-white/[0.03] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-[10.4px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pageAds.map((item) => (
            <div key={item._id} className="relative">
              <AdItem
                id={item?._id}
                title={item.title}
                description={item.description}
                price={item?.price}
                adImage={item?.adImage}
                state={item?.state}
                condition={item?.condition}
                terms={item?.terms}
                item={item}
              />

              <button disabled={delLoading}  onClick={() => deleteAd(item?._id) } >
                {delLoading ? (
                  <GiSandsOfTime className="absolute right-3 top-3 cursor-pointer rounded-full border-2 border-navy bg-white p-2 text-2xl text-navy hover:border-white hover:bg-navy hover:text-white" />
                ) : (
                  <FaTrash className="absolute right-3 top-3 cursor-pointer rounded-full border-2 border-navy bg-white p-2 text-2xl text-navy hover:border-white hover:bg-navy hover:text-white" />
                )}
              </button>
            </div>
          ))}
        </div>

        {loading && (
          <div className="mx-auto my-[50px] flex h-5 w-[400px] items-center justify-center rounded-[20px] bg-transparent px-5">
            <span className="ballLoader"></span>
          </div>
        )}

        {!loading && myAdList.length === 0 && (
          <div className="mx-auto my-10 flex flex-col items-center gap-2.5">
            <h3 className="flex items-center text-navy dark:text-white">Currently, you havent created any ad.<TbMoodCry /></h3>
            <p className="text-muted dark:text-white/60">You can click on the button below to create a new ad</p>
            <Link className="rounded bg-navy px-[15px] py-2.5 text-white" to={'/app/create-ad'}>Post an Ad</Link>
          </div>
        )}

        {!loading && numberOfPages > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
            >
              <HiOutlineArrowLeft /> Prev
            </button>

            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`rounded-lg px-3 py-1.5 text-sm border ${
                  currentPage === n
                    ? "bg-navy text-white border-navy dark:bg-accent dark:text-navy-deep dark:border-accent"
                    : "border-navy/30 dark:border-white/20 text-navy dark:text-white"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(numberOfPages, p + 1))}
              disabled={currentPage === numberOfPages}
              className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
            >
              Next <HiOutlineArrowRight />
            </button>
          </nav>
        )}
      </div>

      <div className="mx-auto mb-10 mt-[60px] w-[80vw] max-w-[600px] rounded-xl border-2 border-[#e34b4b] bg-white/60 dark:bg-white/[0.03] p-6 text-center">
        <h3 className="mt-0 text-[#e34b4b]">Danger Zone</h3>
        <p className="my-2 mb-[18px] text-sm text-[#5a5a5a] dark:text-white/60">Deleting your account permanently removes your profile. This cannot be undone.</p>
        <button
          type="button"
          className="cursor-pointer rounded-md border-none bg-[#e34b4b] px-[22px] py-2.5 font-semibold text-white transition-[0.25s] hover:bg-[#c53a3a]"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.55]">
          <form onSubmit={handleDeleteAccount} className="flex w-[min(400px,90vw)] animate-[fadeIn_0.25s] flex-col gap-3.5 rounded-xl bg-white p-[28px_26px]">
            <h3 className="m-0 text-navy-ink">Delete your account?</h3>
            <p className="m-0 text-sm text-muted">This action is permanent. Enter your password to confirm.</p>

            <input
              type="password"
              placeholder="Your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              required
              className="rounded-lg border border-[#d0d0d0] p-[10px_14px] text-sm outline-none"
            />

            <div className="mt-1.5 flex gap-2.5">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-md border-none bg-[#eeeeee] p-2.5 font-semibold text-[#333] transition-[0.25s] hover:bg-[#e0e0e0]"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                }}
              >
                Cancel
              </button>

              <button disabled={deleteAccountLoading} type="submit" className="flex-1 cursor-pointer rounded-md border-none bg-[#e34b4b] p-2.5 font-semibold text-white transition-[0.25s] hover:bg-[#c53a3a]">
                {deleteAccountLoading ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
