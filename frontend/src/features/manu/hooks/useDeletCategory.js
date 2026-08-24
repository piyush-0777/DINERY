import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletCategoryThunk  } from "../slice/manuThunk";

export const useDeletCategory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deletCategory = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(deletCategoryThunk(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deletCategory };
};
