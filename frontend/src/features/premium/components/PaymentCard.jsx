import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Wallet,
  BadgeCheck,
} from "lucide-react";

const PaymentCard = ({
  billing = "monthly",
  monthlyPrice = 499,
  yearlyPrice = 4999,
  onPay,
  loading = false,
}) => {
  const price =
    billing === "monthly" ? monthlyPrice : yearlyPrice;

  const period =
    billing === "monthly" ? "Month" : "Year";

  const savings = monthlyPrice * 12 - yearlyPrice;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-amber-300 bg-gradient-to-br from-white to-amber-50 p-8 shadow-xl dark:border-amber-500/30 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-500 p-3 text-white">
          <CreditCard size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Premium Plan
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secure payment
          </p>
        </div>
      </div>

      <div className="my-8 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Subscription
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{price}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Billing
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {period}
          </span>
        </div>

        {billing === "yearly" && (
          <div className="flex justify-between">
            <span className="text-green-600">
              You Save
            </span>

            <span className="font-bold text-green-600">
              ₹{savings}
            </span>
          </div>
        )}

        <div className="border-t border-dashed border-gray-300 pt-4 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total
            </span>

            <span className="text-3xl font-bold text-amber-500">
              ₹{price}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={loading}
        className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Processing..." : "Upgrade Now"}
      </button>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ShieldCheck
            size={18}
            className="text-green-500"
          />
          Secure encrypted payment
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <BadgeCheck
            size={18}
            className="text-green-500"
          />
          Cancel anytime
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Wallet
            size={18}
            className="text-green-500"
          />
          Supports UPI, Cards & Net Banking
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentCard;