import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { StatCard } from "../../components/owner/StatCard";
import { StatusCard } from "../../components/owner/StatusCard";
import { OrdersTrend } from "../../components/owner/OrdersTrend";

const OwnerDashboard = () => {
  const { list = [] } = useSelector((state) => state.orders);


  const isToday = (date) => {
    const orderDate = new Date(date);
    const today = new Date();

    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  };

  const dashboard = useMemo(() => {
    const todayOrders = list.filter((order) => isToday(order.createdAt));

    const totalOrders = todayOrders.length;

    const totalRevenue = todayOrders.reduce(
      (sum, order) =>
        order.status !== "cancelled" ? sum + (order.totalAmount || 0) : sum,
      0
    );

    const avgOrderValue =
      totalOrders > 0
        ? Math.round(totalRevenue / totalOrders)
        : 0;

    const activeOrders = todayOrders.filter(
      (order) =>
        order.status === "pending" ||
        order.status === "preparing" ||
        order.status === "served"
    ).length;

    const preparing = todayOrders.filter(
      (order) => order.status === "preparing"
    ).length;

    const completed = todayOrders.filter(
      (order) => order.status === "completed"
    ).length;

    const cancelled = todayOrders.filter(
      (order) => order.status === "cancelled"
    ).length;

    const recentOrders = [...list]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 7);

    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      activeOrders,
      preparing,
      completed,
      cancelled,
      recentOrders,
    };
  }, [list]);

  return (
    <div className="p-6 bg-black min-h-screen overflow-y-auto scrollbar-hide">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders (Today)"
          value={dashboard.totalOrders}
          icon="🧾"
        />

        <StatCard
          title="Total Revenue (Today)"
          value={`₹${dashboard.totalRevenue.toLocaleString()}`}
          icon="💰"
        />

        <StatCard
          title="Avg Order Value"
          value={`₹${dashboard.avgOrderValue.toLocaleString()}`}
          icon="📈"
        />

        <StatCard
          title="Active Orders"
          value={dashboard.activeOrders}
          icon="⏱"
        />
      </div>

      {/* Middle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <OrdersTrend />
        </div>

        <div className="space-y-4">
          <StatusCard
            label="Preparing"
            count={dashboard.preparing}
            color="border-yellow-500"
          />

          <StatusCard
            label="Completed"
            count={dashboard.completed}
            color="border-green-500"
          />

          <StatusCard
            label="Cancelled"
            count={dashboard.cancelled}
            color="border-red-500"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10 bg-neutral-900 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">
          Last 7 Orders
        </h3>

        <div className="space-y-3">
          {dashboard.recentOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <div>
                <p className="text-white font-medium">
                  #{order._id.slice(-6).toUpperCase()}
                </p>

                <p className="text-sm text-gray-400">
                  {order.table?.tableNumber
                    ? `Table ${order.table.tableNumber}`
                    : "Online"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-white">
                  ₹{order.totalAmount}
                </p>

                <span
                  className={`text-xs font-semibold capitalize ${
                    order.status === "completed"
                      ? "text-green-400"
                      : order.status === "preparing"
                      ? "text-yellow-400"
                      : order.status === "pending"
                      ? "text-blue-400"
                      : order.status === "served"
                      ? "text-purple-400"
                      : "text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;