import React, { useState } from "react";
import { Tag, Save, Check } from "lucide-react";
import { toast } from "react-toastify";

const PricingConfigModal = ({ pricing, onUpdatePrice }) => {
  const [plansData, setPlansData] = useState(
    pricing.reduce((acc, p) => {
      acc[p.planKey] = {
        priceINR: p.priceINR,
        priceUSD: p.priceUSD,
        discountPercent: p.discountPercent || 0,
        badge: p.badge || "",
      };
      return acc;
    }, {})
  );

  const [savingKey, setSavingKey] = useState(null);

  const handleChange = (planKey, field, val) => {
    setPlansData((prev) => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        [field]: val,
      },
    }));
  };

  const handleSave = async (planKey) => {
    try {
      setSavingKey(planKey);
      await onUpdatePrice(planKey, plansData[planKey]);
      toast.success(`Pricing updated for ${planKey}!`);
    } catch (err) {
      toast.error(err.message || "Failed to update pricing");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-amber-500" />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Live Subscription Pricing Configuration
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Changes made here update the upgrade screen and checkout tiers immediately in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricing.map((plan) => {
          const current = plansData[plan.planKey] || {
            priceINR: plan.priceINR,
            priceUSD: plan.priceUSD,
            discountPercent: plan.discountPercent,
            badge: plan.badge,
          };

          return (
            <div
              key={plan.planKey}
              className="p-5 bg-gray-50 dark:bg-gray-700/40 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    {plan.title}
                  </h3>
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                    {plan.durationDays} Days
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                      Price in INR (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={current.priceINR}
                        onChange={(e) =>
                          handleChange(plan.planKey, "priceINR", Number(e.target.value))
                        }
                        className="w-full pl-8 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                      Price in USD ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={current.priceUSD}
                        onChange={(e) =>
                          handleChange(plan.planKey, "priceUSD", Number(e.target.value))
                        }
                        className="w-full pl-8 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                      Badge / Tagline
                    </label>
                    <input
                      type="text"
                      value={current.badge}
                      onChange={(e) =>
                        handleChange(plan.planKey, "badge", e.target.value)
                      }
                      placeholder="e.g. Save 25%"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => handleSave(plan.planKey)}
                  disabled={savingKey === plan.planKey}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingKey === plan.planKey ? "Saving..." : "Save Pricing"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingConfigModal;
