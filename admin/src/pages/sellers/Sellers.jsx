import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchSellers = async () => {
    try {
      const res = await api.get("/api/admin/sellers");
      setSellers(res.data.sellers);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleDelete = async (e, id, name) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm(`Delete ${name} and all of their ads? This cannot be undone.`)) return;

    try {
      setDeletingId(id);
      await api.delete(`/api/admin/sellers/${id}`);
      setSellers((prev) => prev.filter((s) => s._id !== id));
      toast.success("Seller deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete seller");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = sellers.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy font-sora">Sellers</h1>
          <p className="text-slate-500">{sellers.length} registered sellers</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border border-slate-300 rounded-lg px-4 py-2.5 w-72 outline-none focus:border-accent"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Ads</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  Loading sellers...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  No sellers found
                </td>
              </tr>
            )}

            {filtered.map((seller) => (
              <tr key={seller._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-5 py-3">
                  <Link to={`/sellers/${seller._id}`} className="font-medium text-navy hover:text-accent">
                    {seller.firstName} {seller.lastName}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{seller.email}</td>
                <td className="px-5 py-3 text-slate-600">
                  {[seller.state, seller.country].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="px-5 py-3 text-slate-600">{seller.adsCount}</td>
                <td className="px-5 py-3 text-slate-600">
                  {new Date(seller.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    disabled={deletingId === seller._id}
                    onClick={(e) => handleDelete(e, seller._id, `${seller.firstName} ${seller.lastName}`)}
                    className="text-red-500 hover:text-red-700 transition disabled:opacity-40"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
