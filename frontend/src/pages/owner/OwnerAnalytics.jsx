import AnalyticsCard from "../../components/owner/Analytics/AnalyticsCard";
import AnalyticsCharts from "../../components/owner/Analytics/AnalyticsCharts";

const OwnerAnalytics = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-yellow-400">
          Analytics
        </h1>

        <select className="bg-[#111] border border-gray-700 
                           text-yellow-400 px-4 py-2 rounded-lg 
                           hover:border-yellow-500 transition">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <AnalyticsCard title="Total Orders" value="450" />
        <AnalyticsCard title="Revenue" value="₹ 2,45,000" />
        <AnalyticsCard title="Avg Order Value" value="₹ 540" />
        <AnalyticsCard title="Peak Hour" value="8 PM - 10 PM" />
      </div>

      {/* Charts Section */}
      <AnalyticsCharts />

    </div>
  );
};

export default OwnerAnalytics;