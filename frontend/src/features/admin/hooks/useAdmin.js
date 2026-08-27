import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getAdminStatsThunk,
  getAllRestaurantsThunk,
  getAllUsersThunk,
  getPricingThunk,
  updatePricingThunk,
  grantPremiumThunk,
  createRestaurantThunk,
  deleteRestaurantThunk,
  revokePremiumThunk,
} from "../slice/adminThunk";

export const useAdmin = () => {
  const dispatch = useDispatch();
  const { stats, restaurants, users, pricing, loading, error } = useSelector(
    (state) => state.admin || {}
  );

  const fetchStats = useCallback(async () => {
    return await dispatch(getAdminStatsThunk()).unwrap();
  }, [dispatch]);

  const fetchRestaurants = useCallback(async () => {
    return await dispatch(getAllRestaurantsThunk()).unwrap();
  }, [dispatch]);

  const fetchUsers = useCallback(async () => {
    return await dispatch(getAllUsersThunk()).unwrap();
  }, [dispatch]);

  const fetchPricing = useCallback(async () => {
    return await dispatch(getPricingThunk()).unwrap();
  }, [dispatch]);

  const updatePrice = useCallback(
    async (planKey, data) => {
      return await dispatch(updatePricingThunk({ planKey, data })).unwrap();
    },
    [dispatch]
  );

  const grantSubscription = useCallback(
    async (restaurantId, data) => {
      return await dispatch(grantPremiumThunk({ restaurantId, data })).unwrap();
    },
    [dispatch]
  );

  const createRestaurantOwner = useCallback(
    async (formData) => {
      return await dispatch(createRestaurantThunk(formData)).unwrap();
    },
    [dispatch]
  );

  const deleteRestaurantOwner = useCallback(
    async (restaurantId) => {
      return await dispatch(deleteRestaurantThunk(restaurantId)).unwrap();
    },
    [dispatch]
  );

  const revokeSubscription = useCallback(
    async (restaurantId) => {
      return await dispatch(revokePremiumThunk(restaurantId)).unwrap();
    },
    [dispatch]
  );

  const loadAllAdminData = useCallback(async () => {
    await Promise.allSettled([
      fetchStats(),
      fetchRestaurants(),
      fetchUsers(),
      fetchPricing(),
    ]);
  }, [fetchStats, fetchRestaurants, fetchUsers, fetchPricing]);

  return {
    stats: stats || {},
    restaurants: restaurants || [],
    users: users || [],
    pricing: pricing || [],
    loading,
    error,
    fetchStats,
    fetchRestaurants,
    fetchUsers,
    fetchPricing,
    updatePrice,
    grantSubscription,
    revokeSubscription,
    createRestaurantOwner,
    deleteRestaurantOwner,
    loadAllAdminData,
  };
};
