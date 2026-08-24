import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryThunk  } from "../slice/manuThunk";

export const useAddCategory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addCategory = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(addCategoryThunk(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addCategory };
};
