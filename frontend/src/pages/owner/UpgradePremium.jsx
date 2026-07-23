import { useState , useEffect } from "react";
import { motion } from "framer-motion";

import PricingToggle from "../../components/owner/upgradepremium/PricingToggle";
import PlanCard from "../../components/owner/upgradepremium/PlanCard";
import FeatureComparison from "../../components/owner/upgradepremium/FeatureComparison";
import PaymentCard from "../../components/owner/upgradepremium/PaymentCard";
import FAQSection from "../../components/owner/upgradepremium/FAQSection";
import PremiumBadge from "../../components/owner/upgradepremium/PremiumBadge";

const UpgradePremium = () => {
  const [billing, setBilling] = useState("monthly");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // or "auto"
    });
  }, []);

  const freeFeatures = [
    {
      label: "Up to 10 Restaurant Tables",
      available: true,
    },
    {
      label: "Unlimited Orders",
      available: true,
    },
    {
      label: "QR Ordering",
      available: true,
    },
    {
      label: "Basic Sales Dashboard",
      available: true,
    },
    {
      label: "Menu Management",
      available: true,
    },
    {
      label: "Inventory Management",
      available: false,
    },
    {
      label: "Analytics Dashboard",
      available: false,
    },
    {
      label: "Staff Accounts",
      available: false,
    },
    {
      label: "Customer History",
      available: false,
    },
    {
      label: "Priority Support",
      available: false,
    },
  ];

  const premiumFeatures = [
    {
      label: "Unlimited Restaurant Tables",
      available: true,
    },
    {
      label: "Unlimited Orders",
      available: true,
    },
    {
      label: "QR Ordering",
      available: true,
    },
    {
      label: "Kitchen Display System",
      available: true,
    },
    {
      label: "Inventory Management",
      available: true,
    },
    {
      label: "Advanced Analytics",
      available: true,
    },
    {
      label: "Unlimited Staff Accounts",
      available: true,
    },
    {
      label: "Customer History",
      available: true,
    },
    {
      label: "Reports Export",
      available: true,
    },
    {
      label: "Priority Support",
      available: true,
    },
  ];

  const comparisonFeatures = [
    {
      name: "Restaurant Tables",
      free: "10",
      premium: "Unlimited",
    },
    {
      name: "Orders",
      free: true,
      premium: true,
    },
    {
      name: "QR Ordering",
      free: true,
      premium: true,
    },
    {
      name: "Kitchen Display",
      free: false,
      premium: true,
    },
    {
      name: "Inventory",
      free: false,
      premium: true,
    },
    {
      name: "Analytics",
      free: false,
      premium: true,
    },
    {
      name: "Reports",
      free: false,
      premium: true,
    },
    {
      name: "Staff Accounts",
      free: "1",
      premium: "Unlimited",
    },
    {
      name: "Customer History",
      free: false,
      premium: true,
    },
    {
      name: "Priority Support",
      free: false,
      premium: true,
    },
  ];

  const handlePayment = () => {
    alert("Integrate Razorpay Here");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <PremiumBadge />

          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
            Upgrade To Premium
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Unlock advanced restaurant management features,
            analytics, unlimited tables, staff management,
            inventory tracking and priority support.
          </p>

          <div className="mt-10 flex justify-center">
            <PricingToggle
              billing={billing}
              setBilling={setBilling}
            />
          </div>
        </motion.div>

        {/* Pricing */}

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          <PlanCard
            title="Free"
            price={0}
            period="month"
            description="Perfect for small restaurants just getting started."
            features={freeFeatures}
            currentPlan
          />

          <PlanCard
            premium
            title="Premium"
            price={billing === "monthly" ? 499 : 4999}
            period={billing === "monthly" ? "month" : "year"}
            description="Everything you need to manage and grow your restaurant."
            features={premiumFeatures}
            onSelect={handlePayment}
          />

        </div>

        {/* Compare */}

        <div className="mt-20">
          <FeatureComparison
            features={comparisonFeatures}
          />
        </div>

        {/* Payment */}

        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-xl">
            <PaymentCard
              billing={billing}
              monthlyPrice={499}
              yearlyPrice={4999}
              onPay={handlePayment}
            />
          </div>
        </div>

        {/* FAQ */}

        <div className="mt-20">
          <FAQSection />
        </div>

      </div>
    </div>
  );
};

export default UpgradePremium;