import { useState } from "react";
import { useDispatch } from "react-redux";
import {getOrderThunk } from '../slice/ordersThunk'

export const useGetOrder = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const getOrder = async (id) => {
        setLoading(true)
        try{
            const result = await dispatch(getOrderThunk(id)).unwrap()
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , getOrder}
}