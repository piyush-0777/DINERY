import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRestaurantThunk } from "../slices/authThunk";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);

    try {
      const result = await dispatch(loginRestaurantThunk(credentials)).unwrap();
      return result;
    } catch (err) {
      throw err; // Optional: lets the component handle it too
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
