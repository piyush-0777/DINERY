import { useCallback } from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useRazorpay = () => {
  const displayRazorpay = useCallback(
    async ({
      orderId,
      amount,
      currency = "INR",
      keyId,
      planTitle = "Dinery Premium Plan",
      ownerName = "",
      ownerEmail = "",
      ownerPhone = "",
      onSuccess,
      onDismiss,
    }) => {
      // If backend is in test/simulation mode
      if (orderId && orderId.startsWith("order_sim_")) {
        console.log("ℹ Simulating successful test checkout");
        onSuccess({
          razorpay_payment_id: `pay_sim_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: "simulated_signature",
        });
        return;
      }

      const res = await loadRazorpayScript();

      if (!res) {
        throw new Error(
          "Razorpay SDK failed to load. Please check your internet connection."
        );
      }

      const options = {
        key: keyId,
        amount: Math.round(amount * 100),
        currency: currency.toUpperCase(),
        name: "Dinery Restaurant OS",
        description: `Upgrade: ${planTitle}`,
        image: "/logo.png",
        order_id: orderId,
        prefill: {
          name: ownerName,
          email: ownerEmail,
          contact: ownerPhone,
        },
        theme: {
          color: "#f59e0b", // Amber 500
        },
        modal: {
          ondismiss: () => {
            if (onDismiss) onDismiss();
          },
        },
        handler: (response) => {
          if (onSuccess) {
            onSuccess(response);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    },
    []
  );

  return { displayRazorpay };
};
