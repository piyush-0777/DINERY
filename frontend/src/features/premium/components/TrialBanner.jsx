import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, AlertTriangle, ArrowRight } from "lucide-react";

const TrialBanner = ({ subscription }) => {
  const navigate = useNavigate();

  if (!subscription) return null;

  const { status, daysLeft, isSubscriptionActive } = subscription;

  // Paid active subscribers don't need a warning banner unless expiring soon (<= 3 days)
  if (status === "active" && daysLeft > 3) {
    return null;
  }

  const isExpired = !isSubscriptionActive || status === "expired";

  return (
    <div
      className={`w-full px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-3 text-sm font-medium transition-all ${
        isExpired
          ? "bg-red-600 text-white"
          : daysLeft <= 2
          ? "bg-amber-600 text-white"
          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isExpired ? (
          <AlertTriangle className="w-5 h-5 animate-pulse text-yellow-300" />
        ) : (
          <Sparkles className="w-5 h-5 text-yellow-200" />
        )}
        <span>
          {isExpired ? (
            <>
              <strong>Your Premium Trial has expired!</strong> Full restaurant features are locked.
            </>
          ) : status === "trial" ? (
            <>
              <strong>7-Day Free Premium Trial Active:</strong> You have{" "}
              <span className="underline font-bold text-yellow-200">{daysLeft} day(s)</span> remaining.
            </>
          ) : (
            <>
              <strong>Subscription Expiring Soon:</strong> Only{" "}
              <span className="underline font-bold text-yellow-200">{daysLeft} day(s)</span> remaining.
            </>
          )}
        </span>
      </div>

      <button
        onClick={() => navigate("/owner/getpremium")}
        className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition shadow-sm text-xs uppercase tracking-wide cursor-pointer"
      >
        <span>{isExpired ? "Unlock App" : "Upgrade Plan"}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default TrialBanner;
