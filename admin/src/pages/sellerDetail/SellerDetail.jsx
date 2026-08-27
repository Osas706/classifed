import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const SellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSeller, setDeletingSeller] = useState(false);
  const [deletingAdId, setDeletingAdId] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const fetchSeller = async () => {
    try {
      const res = await api.get(`/api/admin/sellers/${id}`);
      setSeller(res.data.seller);
      setAds(res.data.ads);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load seller");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, [id]);

  const handleDeleteSeller = async () => {
    if (!window.confirm("Delete this seller and all of their ads? This cannot be undone.")) return;

    try {
      setDeletingSeller(true);
      await api.delete(`/api/admin/sellers/${id}`);
      toast.success("Seller deleted");
      navigate("/sellers");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete seller");
    } finally {
      setDeletingSeller(false);
    }
  };

  const handleVerify = async () => {
    try {
      setVerifying(true);
      await api.post(`/api/admin/sellers/${id}/verify`);
      setSeller((prev) => ({ ...prev, status: "verified" }));
      toast.success("Seller verified");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to verify seller");
    } finally {
      setVerifying(false);
    }
  };

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

  if (loading) return <p className="text-slate-500">Loading seller...</p>;
  if (!seller) return <p className="text-red-500">Seller not found</p>;

  return (
    <div className="flex flex-col gap-6">
      <Link to="/sellers" className="flex items-center gap-2 text-slate-500 hover:text-navy w-fit text-sm">
        <HiOutlineArrowLeft /> Back to Sellers
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img
            src={seller.displayImage || "https://api.dicebear.com/7.x/initials/svg?seed=" + seller.firstName}
            alt={seller.firstName}
            className="w-16 h-16 rounded-full object-cover bg-accent-soft"
          />

          <div>
            <h1 className="text-xl font-bold text-navy font-sora flex items-center gap-2">
              {seller.firstName} {seller.lastName}
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  seller.status === "verified"
                    ? "bg-green-50 text-green-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {seller.status === "verified" ? "Verified" : "Submitted"}
              </span>
            </h1>
            <p className="text-slate-500">{seller.email}</p>
            <p className="text-slate-400 text-sm">
              {[seller.state, seller.country].filter(Boolean).join(", ") || "No location set"} · Joined{" "}
              {new Date(seller.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {seller.status !== "verified" && (
            <button
              disabled={verifying}
              onClick={handleVerify}
              className="flex items-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2.5 rounded-lg font-medium text-sm transition disabled:opacity-50"
            >
              <FaCheckCircle /> {verifying ? "Verifying..." : "Verify Seller"}
            </button>
          )}

          <button
            disabled={deletingSeller}
            onClick={handleDeleteSeller}
            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg font-medium text-sm transition disabled:opacity-50"
          >
            <FaTrash /> {deletingSeller ? "Deleting..." : "Delete Seller"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-navy font-sora mb-3">Ads by this seller ({ads.length})</h2>

        {ads.length === 0 ? (
          <p className="text-slate-400 text-sm">This seller hasn't posted any ads.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <div key={ad._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <img
                  src={ad.adImage || "https://placehold.co/300x180?text=No+Image"}
                  alt={ad.title}
                  className="w-full h-36 object-cover bg-slate-100"
                />

                <div className="p-4 flex flex-col gap-1">
                  <h3 className="font-semibold text-navy truncate">{ad.title}</h3>
                  <p className="text-sm text-slate-500">
                    ₦{Number(ad.price || 0).toLocaleString()} · {ad.category}
                  </p>

                  <button
                    disabled={deletingAdId === ad._id}
                    onClick={() => handleDeleteAd(ad._id)}
                    className="mt-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-40"
                  >
                    <FaTrash /> {deletingAdId === ad._id ? "Deleting..." : "Delete Ad"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDetail;
