import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCategoryThunk } from "../slice/manuThunk";

export const useEditCategory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const editCategory = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(editCategoryThunk(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, editCategory };
};
