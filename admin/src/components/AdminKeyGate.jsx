import React, { useState } from "react";

const AdminKeyGate = ({ children }) => {
  const [key, setKey] = useState(localStorage.getItem("admin_key") || "");
  const [unlocked, setUnlocked] = useState(!!localStorage.getItem("admin_key"));

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_key", key);
    setUnlocked(true);
  };

  if (unlocked) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] max-w-[90vw] bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-navy">Admin Access</h1>
        <p className="text-sm text-slate-500">
          Enter the admin key configured in the backend's <code>ADMIN_SECRET</code> env var.
        </p>

        <input
          type="password"
          required
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-accent"
        />

        <button
          type="submit"
          className="bg-navy hover:bg-navy-deep text-white font-semibold rounded-lg py-3 transition"
        >
          Unlock Admin Panel
        </button>
      </form>
    </div>
  );
};

export default AdminKeyGate;
