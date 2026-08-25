import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { API_URL } from "../api";

const validateKey = async (key) => {
  try {
    const res = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: { "x-admin-key": key },
    });
    return { ok: res.status === 200 };
  } catch (err) {
    const status = err?.response?.status;

    if (status === 404) {
      return {
        ok: false,
        reason:
          "The backend at this URL doesn't have the admin API deployed yet (404 Not Found). This isn't a wrong key — the /api/admin routes aren't live on this backend. Deploy the branch with the admin routes first.",
      };
    }

    if (status === 401) {
      return { ok: false, reason: "Incorrect admin key. Please try again." };
    }

    return {
      ok: false,
      reason: "Couldn't reach the backend to verify the key. Check your connection and try again.",
    };
  }
};

const AdminKeyGate = ({ children }) => {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("admin_key");

    if (!storedKey) {
      setChecking(false);
      return;
    }

    validateKey(storedKey).then(({ ok }) => {
      if (ok) {
        setUnlocked(true);
      } else {
        localStorage.removeItem("admin_key");
      }
      setChecking(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { ok, reason } = await validateKey(key);

    if (ok) {
      localStorage.setItem("admin_key", key);
      setUnlocked(true);
    } else {
      setError(reason);
    }

    setSubmitting(false);
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-sand" />;
  }

  if (unlocked) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand px-4">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] max-w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-navy">Admin Access</h1>
        <p className="text-sm text-slate-500">
          Enter the admin key configured in the backend's <code>ADMIN_SECRET</code> env var.
        </p>

        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            required
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError("");
            }}
            placeholder="Admin key"
            className={`w-full border rounded-lg px-4 py-3 pr-11 outline-none focus:border-accent ${
              error ? "border-red-400" : "border-slate-300"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            aria-label={showKey ? "Hide admin key" : "Show admin key"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showKey ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-navy hover:bg-navy-deep text-white font-semibold rounded-lg py-3 transition disabled:opacity-50"
        >
          {submitting ? "Checking..." : "Unlock Admin Panel"}
        </button>
      </form>
    </div>
  );
};

export default AdminKeyGate;
