import React from "react";
import { Store, Users, Gem, DollarSign } from "lucide-react";

const AdminStatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Restaurants",
      value: stats?.totalRestaurants || 0,
      icon: Store,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Registered Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions || 0,
      icon: Gem,
      color: "bg-amber-500",
      textColor: "text-amber-500",
    },
    {
      title: "Admin Premium Earnings",
      subtitle: "Subscription Revenue",
      value: `₹${(stats?.adminRevenue ?? stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-transform hover:-translate-y-1"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {card.title}
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-gray-900 dark:text-white">
                {card.value}
              </h3>
              {card.subtitle && (
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {card.subtitle}
                </p>
              )}
            </div>
            <div className={`p-3.5 rounded-2xl ${card.color} bg-opacity-10 dark:bg-opacity-20`}>
              <Icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatsCards;
