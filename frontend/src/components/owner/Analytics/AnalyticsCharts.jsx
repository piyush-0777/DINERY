import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const ordersData = [
  { name: "Mon", orders: 40 },
  { name: "Tue", orders: 55 },
  { name: "Wed", orders: 30 },
  { name: "Thu", orders: 70 },
  { name: "Fri", orders: 90 },
];

const revenueData = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 6500 },
  { name: "Wed", revenue: 3000 },
  { name: "Thu", revenue: 8500 },
  { name: "Fri", revenue: 10000 },
];

const topItems = [
  { name: "Pizza", sales: 120 },
  { name: "Burger", sales: 90 },
  { name: "Pasta", sales: 70 },
];

const orderType = [
  { name: "Dine-in", value: 70 },
  { name: "Online", value: 30 },
];

const COLORS = ["#EAB308", "#444"];

const AnalyticsCharts = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">

      {/* Orders Trend */}
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition">
        <h3 className="text-yellow-400 mb-4">Orders Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={ordersData}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#EAB308" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Trend */}
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition">
        <h3 className="text-yellow-400 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#EAB308" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Selling Items */}
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition">
        <h3 className="text-yellow-400 mb-4">Top Selling Items</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topItems}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="sales" fill="#EAB308" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Type */}
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition">
        <h3 className="text-yellow-400 mb-4">Order Type</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={orderType} dataKey="value" outerRadius={80}>
              {orderType.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsCharts;