import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

import {
  FeatureComparison,
  FAQSection,
  PremiumBadge,
  CurrencyToggle,
  usePremium,
  useRazorpay,
} from "../../features/premium";

const UpgradePremium = () => {
  const navigate = useNavigate();
  const restaurant = useSelector((state) => state.restaurant?.restaurant);
  const {
    plans,
    currentSubscription,
    currency,
    switchCurrency,
    fetchPlans,
    fetchStatus,
    createOrder,
    verifyPayment,
  } = usePremium();

  const { displayRazorpay } = useRazorpay();
  const [processingPlan, setProcessingPlan] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchPlans();
    fetchStatus();
  }, [fetchPlans, fetchStatus]);

  const handleRazorpayCheckout = async (plan) => {
    try {
      setProcessingPlan(plan.planKey);

      // 1. Create order on backend
      const order = await createOrder({ planKey: plan.planKey });

      // 2. Open Razorpay modal
      await displayRazorpay({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency || currency,
        keyId: order.keyId,
        planTitle: plan.title,
        ownerName: restaurant?.ownerName || "",
        ownerEmail: restaurant?.ownerEmail || "",
        ownerPhone: restaurant?.ownerPhone || "",
        onSuccess: async (response) => {
          try {
            // 3. Verify cryptographic HMAC signature on backend
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planKey: plan.planKey,
            });

            toast.success("🎉 Payment verified! Your restaurant subscription is active.");
            navigate("/owner/dashboard");
          } catch (verifyErr) {
            toast.error(verifyErr.message || "Payment verification failed");
          } finally {
            setProcessingPlan(null);
          }
        },
        onDismiss: () => {
          setProcessingPlan(null);
          toast.info("Payment cancelled.");
        },
      });
    } catch (error) {
      toast.error(error.message || "Failed to initiate payment");
      setProcessingPlan(null);
    }
  };

  const comparisonFeatures = [
    { name: "Restaurant Tables", free: "10", premium: "Unlimited" },
    { name: "QR Menu & Orders", free: true, premium: true },
    { name: "Kitchen Display System", free: false, premium: true },
    { name: "Live Business Analytics", free: false, premium: true },
    { name: "Sales & Tax Reports Export", free: false, premium: true },
    { name: "Unlimited Staff Accounts", free: "1", premium: "Unlimited" },
    { name: "Customer Dining History", free: false, premium: true },
    { name: "Priority 24/7 Support", free: false, premium: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <PremiumBadge />

          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Unlock Full Restaurant Power
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Choose a plan to activate unlimited tables, real-time analytics, kitchen displays,
            and automated tax reporting. Pay easily via UPI, Credit/Debit Cards, or NetBanking.
          </p>

          {/* Currency Switcher */}
          <div className="mt-8 flex justify-center">
            <CurrencyToggle currency={currency} setCurrency={switchCurrency} />
          </div>
        </motion.div>

        {/* 3 Dynamic Subscription Tier Cards with Real Razorpay Checkout */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = currency === "USD" ? plan.priceUSD : plan.priceINR;
            const symbol = currency === "USD" ? "$" : "₹";
            const isCurrent =
              currentSubscription.plan === plan.planKey &&
              currentSubscription.isSubscriptionActive;

            const isProcessing = processingPlan === plan.planKey;

            return (
              <motion.div
                key={plan.planKey}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all shadow-lg ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-amber-500/10 to-transparent dark:from-amber-500/5 border-2 border-amber-500 shadow-amber-500/10"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                }`}
              >
                {/* Popular / Best Value Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {plan.durationDays} Days
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 min-h-[32px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                      {symbol}
                      {price}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      / {plan.planKey.replace("_", " ")}
                    </span>
                  </div>

                  {plan.discountPercent > 0 && (
                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Save {plan.discountPercent}% compared to monthly
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {(plan.features || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => handleRazorpayCheckout(plan)}
                    disabled={isProcessing || isCurrent}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isCurrent
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                        : plan.isPopular
                        ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25"
                        : "bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Current Active Plan</span>
                      </>
                    ) : isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Opening Razorpay...</span>
                      </span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Pay with Razorpay</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <FeatureComparison features={comparisonFeatures} />
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default UpgradePremium;
