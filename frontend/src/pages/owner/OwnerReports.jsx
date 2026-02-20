import ReportCard from "../../components/owner/report/ReportCard";
import ReportTable from "../../components/owner/report/ReportTable";
import { useState } from "react";

const ReportsPage = () => {

  const [dateFilter, setDateFilter] = useState("Today");

  // Dummy Data
  const dailySales = [
    { Date: "2026-02-20", Orders: 120, Revenue: "₹ 45,000" },
  ];

  const monthlyRevenue = [
    { Month: "Jan", Revenue: "₹ 9,50,000" },
    { Month: "Feb", Revenue: "₹ 8,75,000" },
  ];

  const gstReport = [
    { Month: "Feb", GST_Collected: "₹ 1,57,500" },
  ];

  const staffPerformance = [
    { Name: "Rahul", Orders_Handled: 85 },
    { Name: "Amit", Orders_Handled: 70 },
  ];

  const cancelledOrders = [
    { Order_ID: "#1021", Reason: "Customer Cancelled" },
    { Order_ID: "#1028", Reason: "Payment Failed" },
  ];

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

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <ReportCard title="Total Revenue" value="₹ 8,75,000" />
        <ReportCard title="GST Collected" value="₹ 1,57,500" />
        <ReportCard title="Total Orders" value="850" />
        <ReportCard title="Cancelled Orders" value="25" />
      </div>

      {/* Tables */}
      <div className="space-y-8 mt-10">
        <ReportTable title="Daily Sales Report" data={dailySales} />
        <ReportTable title="Monthly Revenue Report" data={monthlyRevenue} />
        <ReportTable title="GST Report" data={gstReport} />
        <ReportTable title="Staff Performance Report" data={staffPerformance} />
        <ReportTable title="Cancelled Orders Report" data={cancelledOrders} />
      </div>

    </div>
  );
};

export default ReportsPage;