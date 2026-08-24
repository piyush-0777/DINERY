import { useState } from "react";
import { useDispatch } from "react-redux";
import {updateOrderStatusThunk } from '../slice/ordersThunk'

export const useUpdateOrderStatus = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const updateOrderStatus = async (data) => {
        setLoading(true)
        try{
            const resust = await dispatch(updateOrderStatusThunk(data)).unwrap();
            return resust
        } catch(error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading , updateOrderStatus}
}