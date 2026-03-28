import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrdersAnalyticsThunk,
  fetchRevenueThunk,
  fetchTopItemsThunk,
  fetchOrderTypeThunk,
} from "../../redux/thunks/analysisThunk";
import { toast } from "react-toastify";


import AnalyticsCard from "../../components/owner/analysis/AnalyticsCard";
import AnalyticsCharts from "../../components/owner/analysis/AnalyticsCharts";

const OwnerAnalytics = () => {


  const dispatch = useDispatch();
  const [opction , setOpction] = useState('week')
  console.log(opction)

  const analysis = useSelector((s) => s.analysis);
  console.log(analysis)
  const load = useSelector((s) => s.loadAnalysis);

  const totalOrder = useMemo(()=>{
    let total = 0;
    analysis.orders.map((e)=>{
      total = total + e.totalOrder;
    })
    return total;
  })

  const totalRevenue = useMemo(()=>{
    let total = 0;
    analysis.revenue.map((e)=>{
      total = total + e.totalRevenue;
    })
    return total;
  })

  useEffect(() => {
    const now = new Date();
    dispatch(fetchOrdersAnalyticsThunk({type:opction ,year:now.getFullYear() , month:(now.getMonth()+1) ,week:now.getDate/7}));
    dispatch(fetchRevenueThunk({type:opction,year:now.getFullYear() , month:(now.getMonth()+1) ,week:now.getDate/7}));
    // dispatch(fetchPeakThunk());
    dispatch(fetchTopItemsThunk({type:opction,year:now.getFullYear() , month:(now.getMonth()+1) ,week:now.getDate/7}));
    //dispatch(fetchOrderTypeThunk());

  }, [opction]);


  useEffect(() => {

    if (load.error) {
      toast.error("Error loading analytics");
    }

  }, [load.error]);

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-yellow-400">
          Analytics
        </h1>

        <select 
         onChange={(e) => setOpction(e.target.value)}
        className="bg-[#111] border border-gray-700 
                           text-yellow-400 px-4 py-2 rounded-lg 
                           hover:border-yellow-500 transition">
          <option value='week'>This Week</option>
          <option value='month'>This Month</option>
          <option value='year'>This Year</option>
        </select>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <AnalyticsCard title="Total Orders" value={totalOrder} />
        <AnalyticsCard title="Revenue" value={`₹ ${totalRevenue}`} />
        <AnalyticsCard title="Avg Order Value" value={`₹ ${totalRevenue/totalOrder}`} />
        {/* <AnalyticsCard title="Peak Hour" value="8 PM - 10 PM" /> */}
      </div>

      {/* Charts Section */}
      <AnalyticsCharts />

    </div>
  );
};

export default OwnerAnalytics;