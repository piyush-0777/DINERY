import React, { useState } from "react";
import { X, Gift, Calendar, Check } from "lucide-react";

const GrantPremiumModal = ({ restaurant, onClose, onGrant, loading }) => {
  const [duration, setDuration] = useState("1_month");
  const [customDays, setCustomDays] = useState(30);

  if (!restaurant) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGrant(restaurant._id, {
      duration,
      customDays: duration === "custom" ? Number(customDays) : undefined,
    });
  };

  const options = [
    { key: "1_month", label: "1 Month (30 Days)" },
    { key: "3_months", label: "3 Months (90 Days)" },
    { key: "12_months", label: "12 Months (1 Year)" },
    { key: "custom", label: "Custom Days" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-500">
            <Gift className="w-5 h-5" />
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Grant / Extend Premium
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50">
            <div className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase">
              Target Restaurant
            </div>
            <div className="font-extrabold text-gray-900 dark:text-white text-lg mt-0.5">
              {restaurant.restaurantName}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {restaurant.ownerName} ({restaurant.ownerEmail})
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Select Subscription Duration
            </label>
            <div className="grid grid-cols-1 gap-2">
              {options.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => setDuration(opt.key)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    duration === opt.key
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </div>
                  {duration === opt.key && <Check className="w-4 h-4 text-amber-500" />}
                </button>
              ))}
            </div>
          </div>

          {duration === "custom" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Enter Number of Days
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Granting..." : "Confirm & Unlock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrantPremiumModal;
