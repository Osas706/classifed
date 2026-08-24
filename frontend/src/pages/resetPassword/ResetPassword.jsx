import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStore } from "react-icons/fa6";
import useStore from "../../store/useStore";

const ResetPassword = () => {
  const { url } = useStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Please enter a stronger password (min 6 characters)");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);

      const res = await axios.post(`${url}/api/user/reset-password`, formData);

      if (res.data.success) {
        toast.success(res.data.message);
        setDone(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center gap-10 p-5">
      <Link
        to="/"
        className="text-2xl font-extrabold text-navy flex items-center"
      >
        247
        <span className="text-navy-ink ml-px flex items-center gap-1">
          Market <FaStore />
        </span>
      </Link>

      <div className="w-[min(400px,90vw)] bg-white rounded-2xl px-[30px] py-9 shadow-[0_20px_40px_-20px_rgba(7,19,40,0.25)] text-center">
        {done ? (
          <>
            <h2 className="text-navy text-[22px] mb-2.5">Password updated</h2>
            <p className="text-muted text-sm mb-6">
              You can now log in with your new password. Redirecting you home...
            </p>
          </>
        ) : (
          <>
            <h2 className="text-navy text-[22px] mb-2.5">Set a new password</h2>
            <p className="text-muted text-sm mb-6">
              Choose a strong password you haven't used before.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-3.5 py-3 rounded-lg border border-[#e0e0e0] outline-none text-sm focus:border-accent"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="px-3.5 py-3 rounded-lg border border-[#e0e0e0] outline-none text-sm focus:border-accent"
              />

              <button
                disabled={loading}
                type="submit"
                className="bg-navy text-white border-none px-3 py-3 rounded-lg font-bold cursor-pointer transition-[0.25s] hover:bg-navy-deep"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
