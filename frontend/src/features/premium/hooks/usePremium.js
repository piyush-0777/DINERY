import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getPlansThunk,
  getSubscriptionStatusThunk,
  activateSubscriptionThunk,
  createOrderThunk,
  verifyPaymentThunk,
} from "../slice/premiumThunk";
import { setCurrency } from "../slice/premiumSlice";

export const usePremium = () => {
  const dispatch = useDispatch();
  const { plans, currentSubscription, currency, loading, error } = useSelector(
    (state) => state.premium || {}
  );

  const fetchPlans = useCallback(async () => {
    return await dispatch(getPlansThunk()).unwrap();
  }, [dispatch]);

  const fetchStatus = useCallback(async () => {
    return await dispatch(getSubscriptionStatusThunk()).unwrap();
  }, [dispatch]);

  const createOrder = useCallback(
    async ({ planKey }) => {
      return await dispatch(
        createOrderThunk({
          planKey,
          currency,
        })
      ).unwrap();
    },
    [dispatch, currency]
  );

  const verifyPayment = useCallback(
    async ({ orderId, paymentId, signature, planKey }) => {
      return await dispatch(
        verifyPaymentThunk({
          orderId,
          paymentId,
          signature,
          planKey,
          currency,
        })
      ).unwrap();
    },
    [dispatch, currency]
  );

  const activatePlan = useCallback(
    async ({ planKey, paymentMethod = "direct", paymentId = "manual" }) => {
      return await dispatch(
        activateSubscriptionThunk({
          planKey,
          currency,
          paymentMethod,
          paymentId,
        })
      ).unwrap();
    },
    [dispatch, currency]
  );

  const switchCurrency = useCallback(
    (newCurrency) => {
      dispatch(setCurrency(newCurrency));
    },
    [dispatch]
  );

  return {
    plans: plans || [],
    currentSubscription: currentSubscription || {},
    currency: currency || "INR",
    loading,
    error,
    fetchPlans,
    fetchStatus,
    createOrder,
    verifyPayment,
    activatePlan,
    switchCurrency,
  };
};
