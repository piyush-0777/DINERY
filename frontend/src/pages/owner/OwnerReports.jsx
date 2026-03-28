import ReportCard from "../../components/owner/report/ReportCard";
import ReportTable from "../../components/owner/report/ReportTable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCustomerReportThunk,
  fetchDailySaleReportThunk,
  fetchGSTReportThunk,
  fetchMonthlyRevenueReportThunk,
} from "../../redux/thunks/reportThunk";

const ReportsPage = () => {

  const dispatch = useDispatch();

  const [dateFilter, setDateFilter] = useState("Today");

  // ✅ data store
  const {
    customer,
    dailySale,
    gst,
    monthlyRevenue,
  } = useSelector((state) => state.report);
  console.log( {
    customer,
    dailySale,
    gst,
    monthlyRevenue,
  });

  // ✅ loading store
  const { loading, reqtype , error } = useSelector((state) => state.loadReport);
  console.log({ loading, reqtype , error })


  // =======================
  // API CALL
  // =======================
  useEffect(() => {
    console.log('i am collad')
    dispatch(fetchCustomerReportThunk());
    dispatch(fetchDailySaleReportThunk());
    dispatch(fetchGSTReportThunk());
    dispatch(fetchMonthlyRevenueReportThunk());
  }, []);


  // =======================
  // FORMAT DATA
  // =======================

  const dailySales = dailySale.map((item) => ({
    Date: item.date,
    Orders: item.totalorder,
    Revenue: `₹ ${item.totalrevenu}`,
  }));

  const monthlyRevenueData = monthlyRevenue.map((item) => ({
    Month: item.month,
    Revenue: `₹ ${item.totalrevenu}`,
  }));

  const gstReport = gst.map((item) => ({
    Month: item.month,
    GST_Collected: `₹ ${item.gst_collected}`,
  }));

  const customerReport = customer.map((item) => ({
    Name: item.name,
    Order_ID: item.orderId,
    Bill: `₹ ${item.billPrice}`,
  }));


  // =======================
  // SUMMARY
  // =======================

  const totalRevenue = monthlyRevenue.reduce(
    (sum, item) => sum + (item.totalrevenu || 0),
    0
  );

  const totalGST = gst.reduce(
    (sum, item) => sum + (item.gst_collected || 0),
    0
  );

  const totalOrders = dailySale.reduce(
    (sum, item) => sum + (item.totalorder || 0),
    0
  );
  if(loading == true) return (
    <div><p>loadinng.....</p></div>
  )


  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-yellow-400">
          Reports
        </h1>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-[#111] border border-gray-700 
                     text-yellow-400 px-4 py-2 rounded-lg 
                     hover:border-yellow-500 transition"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* 🔥 GLOBAL LOADING */}
      {loading && (
        <div className="text-center text-yellow-400 mt-4">
          Loading {reqtype} report...
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <ReportCard title="Total Revenue" value={`₹ ${totalRevenue}`} />
        <ReportCard title="GST Collected" value={`₹ ${totalGST}`} />
        <ReportCard title="Total Orders" value={totalOrders} />
        <ReportCard title="Cancelled Orders" value="0" />
      </div>

      {/* Tables */}
      <div className="space-y-8 mt-10">

        {/* Daily Sale */}
        {loading && reqtype === "dailySale" ? (
          <p className="text-yellow-400">Loading Daily Sales...</p>
        ) : (
          <ReportTable title="Daily Sales Report" data={dailySales} />
        )}

        {/* Monthly Revenue */}
        {loading && reqtype === "monthlyRevenue" ? (
          <p className="text-yellow-400">Loading Monthly Revenue...</p>
        ) : (
          <ReportTable title="Monthly Revenue Report" data={monthlyRevenueData} />
        )}

        {/* GST */}
        {loading && reqtype === "gst" ? (
          <p className="text-yellow-400">Loading GST Report...</p>
        ) : (
          <ReportTable title="GST Report" data={gstReport} />
        )}

        {/* Customer */}
        {loading && reqtype === "customer" ? (
          <p className="text-yellow-400">Loading Customer Report...</p>
        ) : (
          <ReportTable title="Customer Report" data={customerReport} />
        )}

        {/* Cancelled */}
        <ReportTable title="Cancelled Orders Report" data={[]} />

      </div>

    </div>
  );
};

export default ReportsPage;