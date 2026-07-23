import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TopItemsChart = ({ data = [] }) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/10">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Top Selling Items
        </h2>

        <p className="text-sm text-zinc-400">
          Best performing menu items
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#3f3f46"
          />

          <XAxis
            dataKey="name"
            stroke="#a1a1aa"
          />

          <YAxis stroke="#a1a1aa" />

          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #facc15",
              borderRadius: 12,
              color: "#fff",
            }}
          />

          <Bar
            dataKey="quantity"
            fill="#facc15"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default TopItemsChart;