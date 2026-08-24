import { useState } from "react";
import { useDispatch } from "react-redux";
import {cashPaymentThunk} from "../slice/billThunk"

export const useCashPayment = () =>{
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const cashPayment = async (id) => {
        setLoading(true)
        try {
            const result =await dispatch(cashPaymentThunk(id)).unwrap()
            return result;
        } catch (error) {
            throw error;
        } finally{
            setLoading(false)
        }
    }

    return {loading , cashPayment}

}