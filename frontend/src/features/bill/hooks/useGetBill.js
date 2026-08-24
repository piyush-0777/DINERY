import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBillThunk } from "../slice/billThunk";

export const useGetBill = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getBill = async (id) => {
    setLoading(true);
    try {
      const result = await dispatch(getBillThunk(id)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(true);
    }
  };
  return {loading , getBill}
};
