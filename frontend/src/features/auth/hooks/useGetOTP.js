import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP } from "../slices/otpThunk";

export const useGetOTP = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getOTP = async (data) => {
    setLoading(true);
    try {
      const res = await dispatch(sendOTP(data)).unwrap();

      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getOTP,
  };
};
