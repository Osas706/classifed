import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingAdId, setDeletingAdId] = useState(null);
  const [deletingSellerId, setDeletingSellerId] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await api.get("/api/admin/ads");
      setAds(res.data.ads);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load ads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Delete this ad?")) return;

    try {
      setDeletingAdId(adId);
      await api.delete(`/api/admin/ads/${adId}`);
      setAds((prev) => prev.filter((a) => a._id !== adId));
      toast.success("Ad deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete ad");
    } finally {
      setDeletingAdId(null);
    }
  };

  const handleDeleteSeller = async (sellerId, sellerName) => {
    if (!window.confirm(`Delete seller ${sellerName} and all of their ads?`)) return;

    try {
      setDeletingSellerId(sellerId);
      await api.delete(`/api/admin/sellers/${sellerId}`);
      setAds((prev) => prev.filter((a) => a.user?._id !== sellerId));
      toast.success("Seller deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete seller");
    } finally {
      setDeletingSellerId(null);
    }
  };

  const filtered = ads.filter((ad) =>
    `${ad.title} ${ad.category} ${ad.user?.email || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy font-sora">Ads</h1>
          <p className="text-slate-500">{ads.length} ads posted</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category or seller email..."
          className="border border-slate-300 rounded-lg px-4 py-2.5 w-80 outline-none focus:border-accent"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Ad</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Seller</th>
              <th className="px-5 py-3 font-medium">Posted</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  Loading ads...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  No ads found
                </td>
              </tr>
            )}

            {filtered.map((ad) => (
              <tr key={ad._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={ad.adImage || "https://placehold.co/60x60?text=—"}
                      alt={ad.title}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <span className="font-medium text-navy truncate max-w-[220px]">{ad.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600 capitalize">{ad.category || "—"}</td>
                <td className="px-5 py-3 text-slate-600">₦{Number(ad.price || 0).toLocaleString()}</td>
                <td className="px-5 py-3">
                  {ad.user ? (
                    <Link to={`/sellers/${ad.user._id}`} className="text-navy hover:text-accent">
                      {ad.user.firstName} {ad.user.lastName}
                    </Link>
                  ) : (
                    <span className="text-slate-400">Unknown</span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-600">{new Date(ad.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      disabled={deletingAdId === ad._id}
                      onClick={() => handleDeleteAd(ad._id)}
                      title="Delete ad"
                      className="text-red-500 hover:text-red-700 transition disabled:opacity-40"
                    >
                      <FaTrash />
                    </button>

                    {ad.user && (
                      <button
                        disabled={deletingSellerId === ad.user._id}
                        onClick={() => handleDeleteSeller(ad.user._id, `${ad.user.firstName} ${ad.user.lastName}`)}
                        className="text-xs text-red-400 hover:text-red-600 underline disabled:opacity-40"
                      >
                        delete seller
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ads;
