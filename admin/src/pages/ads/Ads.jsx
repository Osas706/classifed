import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { HiOutlineViewColumns, HiOutlineSquares2X2 } from "react-icons/hi2";
import Pagination from "../../components/Pagination";

const ADS_PER_PAGE_LIST = 10;
const ADS_PER_PAGE_GRID = 12;

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingAdId, setDeletingAdId] = useState(null);
  const [deletingSellerId, setDeletingSellerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState(() => localStorage.getItem("admin_ads_view") || "list");

  const changeView = (v) => {
    setView(v);
    localStorage.setItem("admin_ads_view", v);
    setCurrentPage(1);
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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

  const perPage = view === "grid" ? ADS_PER_PAGE_GRID : ADS_PER_PAGE_LIST;
  const numberOfPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageAds = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy font-sora">Ads</h1>
          <p className="text-slate-500">{ads.length} ads posted</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden shrink-0">
            <button
              onClick={() => changeView("list")}
              title="List view"
              className={`p-2.5 transition ${view === "list" ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <HiOutlineViewColumns className="text-lg" />
            </button>
            <button
              onClick={() => changeView("grid")}
              title="Grid view"
              className={`p-2.5 transition border-l border-slate-300 ${view === "grid" ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <HiOutlineSquares2X2 className="text-lg" />
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category or seller email..."
            className="border border-slate-300 rounded-lg px-4 py-2.5 w-full sm:w-80 outline-none focus:border-accent flex-1 min-w-[200px]"
          />
        </div>
      </div>

      {loading && <p className="text-slate-400 text-center py-8">Loading ads...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-slate-400 text-center py-8">No ads found</p>
      )}

      {!loading && filtered.length > 0 && view === "list" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
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
              {pageAds.map((ad) => (
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
      )}

      {!loading && filtered.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {pageAds.map((ad) => (
            <div key={ad._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
              <img
                src={ad.adImage || "https://placehold.co/300x180?text=No+Image"}
                alt={ad.title}
                className="w-full h-36 object-cover bg-slate-100"
              />

              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-navy truncate">{ad.title}</h3>
                <p className="text-sm text-slate-500 capitalize">{ad.category || "—"}</p>
                <p className="text-sm font-semibold text-navy">₦{Number(ad.price || 0).toLocaleString()}</p>

                <div className="text-xs text-slate-500 mt-1">
                  {ad.user ? (
                    <Link to={`/sellers/${ad.user._id}`} className="text-navy hover:text-accent">
                      {ad.user.firstName} {ad.user.lastName}
                    </Link>
                  ) : (
                    <span className="text-slate-400">Unknown seller</span>
                  )}
                  <span className="mx-1">·</span>
                  {new Date(ad.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-3">
                  <button
                    disabled={deletingAdId === ad._id}
                    onClick={() => handleDeleteAd(ad._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-40"
                  >
                    <FaTrash /> {deletingAdId === ad._id ? "Deleting..." : "Delete Ad"}
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
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onChange={setCurrentPage} />
      )}
    </div>
  );
};

export default Ads;
