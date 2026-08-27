import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Sparkles, ArrowRight } from "lucide-react";

const SubscriptionGuard = ({ subscription, children }) => {
  const navigate = useNavigate();

  // If active trial or paid plan, render children normally
  if (subscription?.isSubscriptionActive !== false && subscription?.status !== "expired") {
    return <>{children}</>;
  }

  // If expired, render the paywall lock screen
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-6">
      {/* Blurred Background Preview */}
      <div className="absolute inset-0 filter blur-md opacity-20 pointer-events-none overflow-hidden">
        {children}
      </div>

      {/* Paywall Modal Card */}
      <div className="relative z-20 max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-900/60 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shadow-inner">
          <Lock className="w-8 h-8 text-amber-500" />
        </div>

        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 rounded-full">
          Trial Expired
        </span>

        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
          Restaurant Features Locked
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
          Your 7-day free trial has ended. To continue managing menu items, tables, accepting QR
          orders, and viewing reports, please choose a plan.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/owner/getpremium")}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Subscription Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate("/owner/setting")}
            className="w-full py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
          >
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGuard;
