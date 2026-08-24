import { useState } from "react";
import { useDispatch } from "react-redux";
import {fetchOrdersThunk } from '../slice/ordersThunk'

export const useFetchOrder = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchOrders = async (data) => {
        setLoading(true)
        try{
            const resust = await dispatch(fetchOrdersThunk(data)).unwrap();
            return resust
        } catch(error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading , fetchOrders }
}