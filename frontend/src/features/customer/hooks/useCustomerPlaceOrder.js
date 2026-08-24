import { useState } from "react";
import { useDispatch } from "react-redux";
import {CustomerPlaceOrder } from '../slice/customerThunk'

export const useCustomerPlaceOrder = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const customerPlaceOrder = async (data) => {
        setLoading(true)
        try{
            const resust = await dispatch(CustomerPlaceOrder(data)).unwrap();
            return resust
        } catch(error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading , customerPlaceOrder }
}