import { useState } from "react";
import { useDispatch } from "react-redux";
import {verifyOTP} from "../slices/otpThunk"

export const useVerifyOTP = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false);

    const varifyOtp = async (data) => {
        setLoading(true)
        try {
            const result = await dispatch(varifyOtp(data)).unwrap()

           return result
        } catch(error) {
            throw error
        } finally {
            setLoading(false);
        }
    }
    return {loading, varifyOtp}
}