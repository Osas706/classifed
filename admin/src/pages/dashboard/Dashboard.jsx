import React, { useEffect, useState } from "react";
import api from "../../api";
import { MdOutlinePeople, MdOutlineLocalOffer, MdTrendingUp } from "react-icons/md";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center text-2xl">
      <Icon />
    </div>
    <div>
      <p className="text-2xl font-bold text-navy font-sora">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

const MiniBarChart = ({ title, data }) => {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-sora font-bold text-navy mb-4">{title}</h3>

      {data.length === 0 ? (
        <p className="text-sm text-slate-400">No activity in the last 14 days</p>
      ) : (
        <div className="flex items-end gap-2 h-40">
          {data.map((d) => (
            <div key={d._id} className="flex-1 flex flex-col items-center gap-2 group">
              <div
                className="w-full bg-accent/80 group-hover:bg-accent rounded-t-md transition-all"
                style={{ height: `${(d.count / max) * 100}%`, minHeight: "4px" }}
                title={`${d.count} on ${d._id}`}
              />
              <span className="text-[10px] text-slate-400 rotate-0">{d._id.slice(5)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-navy font-sora">Dashboard</h1>
        <p className="text-slate-500">Monitor growth across sellers and ads.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={MdOutlinePeople} label="Total Sellers" value={stats.totalUsers} />
        <StatCard icon={MdOutlineLocalOffer} label="Total Ads" value={stats.totalAds} />
        <StatCard
          icon={MdTrendingUp}
          label="New Ads (14d)"
          value={stats.adsByDay.reduce((sum, d) => sum + d.count, 0)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MiniBarChart title="New Sellers (last 14 days)" data={stats.usersByDay} />
        <MiniBarChart title="New Ads (last 14 days)" data={stats.adsByDay} />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-sora font-bold text-navy mb-4">Ads by Category</h3>

        {stats.adsByCategory.length === 0 ? (
          <p className="text-sm text-slate-400">No ads yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.adsByCategory.map((c) => {
              const max = Math.max(...stats.adsByCategory.map((x) => x.count));
              return (
                <div key={c._id || "uncategorized"} className="flex items-center gap-3">
                  <span className="w-32 text-sm text-slate-600 capitalize truncate">
                    {c._id || "Uncategorized"}
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full"
                      style={{ width: `${(c.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 w-8 text-right">{c.count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
