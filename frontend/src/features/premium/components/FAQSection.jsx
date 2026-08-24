import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const defaultFaqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your Premium subscription at any time. Your Premium features remain active until the end of your billing period.",
  },
  {
    question: "Will I lose my restaurant data if I downgrade?",
    answer:
      "No. Your restaurant data is always safe. Premium-only features become unavailable after downgrading, but your data remains stored.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "You can pay using UPI, Credit/Debit Cards, Net Banking, Wallets, and other Razorpay-supported payment methods.",
  },
  {
    question: "Can I switch between monthly and yearly plans?",
    answer:
      "Yes. You can upgrade or change your billing cycle anytime from the subscription settings.",
  },
  {
    question: "Do Premium users receive future updates?",
    answer:
      "Absolutely. Every Premium subscription includes all future Premium features and improvements at no additional cost during your active subscription.",
  },
];

const FAQSection = ({ faqs = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Everything you need to know before upgrading.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const open = openIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() =>
                  setOpenIndex(open ? -1 : index)
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>

                <motion.div
                  animate={{
                    rotate: open ? 180 : 0,
                  }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 px-5 py-4 text-gray-600 dark:border-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;