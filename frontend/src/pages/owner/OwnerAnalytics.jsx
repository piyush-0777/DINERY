import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchOrdersAnalyticsThunk,
  fetchRevenueThunk,
  fetchTopItemsThunk,
} from "../../redux/thunks/analysisThunk";

import AnalyticsCard from "../../components/owner/analysis/AnalyticsCard";
import AnalyticsCharts from "../../components/owner/analysis/AnalyticsCharts";

const Analysis = () => {
  const dispatch = useDispatch();

  const [option, setOption] = useState("week");

  const analysis = useSelector((state) => state.analysis);
  const load = useSelector((state) => state.loadAnalysis);

  const now = new Date();

  const query = {
    type: option,
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    week: Math.ceil(now.getDate() / 7),
  };

  useEffect(() => {
    dispatch(fetchOrdersAnalyticsThunk(query));
    dispatch(fetchRevenueThunk(query));
    dispatch(fetchTopItemsThunk(query));
  }, [dispatch, option]);

  useEffect(() => {
    if (load.error) {
      toast.error(load.error || "Failed to load analytics");
    }
  }, [load.error]);

  const totalOrders = useMemo(() => {
    return analysis.orders?.reduce(
      (sum, item) => sum + (item.totalOrder || 0),
      0
    );
  }, [analysis.orders]);

  const totalRevenue = useMemo(() => {
    return analysis.revenue?.reduce(
      (sum, item) => sum + (item.totalRevenue || 0),
      0
    );
  }, [analysis.revenue]);

  const averageOrderValue =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  if (load.loading) {
    return (
      <div className="min-h-screen bg-[#070707] text-white p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-60 bg-neutral-800 rounded-lg"></div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-neutral-900 border border-neutral-800"
              />
            ))}
          </div>

          <div className="h-[450px] rounded-3xl bg-neutral-900 border border-neutral-800"></div>
        </div>
      </div>
    );
  }

  if (load.error) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-5">
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-10 text-center max-w-md">
          <h2 className="text-red-400 text-2xl font-bold">
            Unable to load analytics
          </h2>

          <p className="text-gray-400 mt-3">{load.error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

          <div>
            <h1 className="text-4xl font-bold">
              Restaurant Analytics
            </h1>

            <p className="text-neutral-400 mt-2">
              Monitor orders, revenue and business performance.
            </p>
          </div>

          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="bg-[#111] border border-neutral-700 rounded-xl px-5 py-3 text-yellow-400 outline-none focus:border-yellow-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-10">

          <AnalyticsCard
            title="Total Orders"
            value={totalOrders}
          />

          <AnalyticsCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })}`}
          />

          <AnalyticsCard
            title="Average Order"
            value={`₹${averageOrderValue}`}
          />

        </div>

        {/* Charts */}

        <div className="mt-10 rounded-3xl border border-neutral-800 bg-[#111] p-6">
          <AnalyticsCharts />
        </div>

      </div>
    </div>
  );
};

export default Analysis;