import React, { useState } from "react";
import {
  Search,
  Gift,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ShieldOff,
} from "lucide-react";

const OwnersTable = ({
  restaurants,
  onSelectRestaurant,
  onOpenCreateModal,
  onDeleteRestaurant,
  onRevokePremium,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (restaurants || []).filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.restaurantName?.toLowerCase().includes(term) ||
      r.ownerEmail?.toLowerCase().includes(term) ||
      r.ownerName?.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (r) => {
    const now = new Date();
    const isTrial =
      r.subscriptionStatus === "trial" &&
      r.trialExpiresAt &&
      new Date(r.trialExpiresAt) > now;
    const isActive =
      r.subscriptionStatus === "active" &&
      r.subscriptionExpiresAt &&
      new Date(r.subscriptionExpiresAt) > now;

    if (isActive) {
      const days = Math.ceil((new Date(r.subscriptionExpiresAt) - now) / (1000 * 60 * 60 * 24));
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Active ({days}d left)
        </span>
      );
    }

    if (isTrial) {
      const days = Math.ceil((new Date(r.trialExpiresAt) - now) / (1000 * 60 * 60 * 24));
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          <Clock className="w-3.5 h-3.5" />
          Trial ({days}d left)
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
        <ShieldAlert className="w-3.5 h-3.5" />
        Expired (Locked)
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header & Search & Create Action */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Restaurant Owners & Subscriptions
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Total {restaurants.length} registered restaurant accounts
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Owner</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 dark:bg-gray-700/30 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="py-3.5 px-5">Restaurant</th>
              <th className="py-3.5 px-5">Owner</th>
              <th className="py-3.5 px-5">Plan</th>
              <th className="py-3.5 px-5">Subscription Status</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No restaurants matching search query.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {r.restaurantName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {r.address}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {r.ownerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {r.ownerEmail} • {r.ownerPhone}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold uppercase">
                      {r.currentPlan || r.plan || "Free"}
                    </span>
                  </td>

                  <td className="py-4 px-5">{getStatusBadge(r)}</td>

                  <td className="py-4 px-5 text-right space-x-2">
                    <button
                      onClick={() => onSelectRestaurant(r)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Give Premium</span>
                    </button>

                    {onRevokePremium && (r.subscriptionStatus === "active" || r.subscriptionStatus === "trial") && (
                      <button
                        onClick={() => onRevokePremium(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-400 font-bold text-xs rounded-xl border border-red-200 dark:border-red-800 transition-all cursor-pointer"
                        title="Revoke / Remove Premium Access"
                      >
                        <ShieldOff className="w-3.5 h-3.5" />
                        <span>Remove Plan</span>
                      </button>
                    )}

                    {onDeleteRestaurant && (
                      <button
                        onClick={() => onDeleteRestaurant(r)}
                        className="inline-flex items-center p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all cursor-pointer"
                        title="Delete Restaurant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnersTable;
