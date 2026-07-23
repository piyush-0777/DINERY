import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#a855f7",
];

const OrderTypeChart = ({ data = [] }) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/10">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Order Types
        </h2>

        <p className="text-sm text-zinc-400">
          Distribution of customer orders
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #facc15",
              borderRadius: 12,
              color: "#fff",
            }}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default OrderTypeChart;