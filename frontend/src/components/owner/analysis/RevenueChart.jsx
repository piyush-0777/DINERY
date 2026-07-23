import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const RevenueChart = ({ data }) => {
  const revenue = data?.totalRevenue || 0;
  const growth = data?.growth || 0;

  return (
    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            Total Revenue
          </p>

          <h2 className="mt-2 flex items-center text-4xl font-bold text-white">

            <IndianRupee size={30} />

            {revenue.toLocaleString()}

          </h2>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">

            <TrendingUp size={16} />

            {growth}% this month

          </div>

        </div>

        <div className="rounded-2xl bg-yellow-400/10 p-5 transition duration-300 group-hover:bg-yellow-400">

          <IndianRupee
            size={36}
            className="text-yellow-400 group-hover:text-black"
          />

        </div>

      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-green-400 transition-all duration-700"
          style={{
            width: `${Math.min(growth, 100)}%`,
          }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">

        <span className="text-zinc-500">
          Revenue Performance
        </span>

        <span className="flex items-center gap-1 text-yellow-400">

          View Details

          <ArrowUpRight size={16} />

        </span>

      </div>

    </div>
  );
};

export default RevenueChart;