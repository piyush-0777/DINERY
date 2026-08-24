import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFoodThunk } from "../slice/manuThunk";

export const useUpdateFood = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateFood = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(updateFoodThunk(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateFood };
};
