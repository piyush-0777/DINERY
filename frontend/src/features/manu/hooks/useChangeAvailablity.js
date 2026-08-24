import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeAvailablityThunk } from "../slice/manuThunk";

export const useChangeAvailablity = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeAvailablity = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(changeAvailablityThunk(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, changeAvailablity };
};
