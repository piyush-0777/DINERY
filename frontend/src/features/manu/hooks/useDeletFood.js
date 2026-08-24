import { useState } from "react";
import { useDispatch } from "react-redux";
import {deletFoodThunk } from '../slice/manuThunk'

export const useDeletFood = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const deletFood = async (data) => {
        setLoading(true)
        try {
            const result = await dispatch(deletFoodThunk(data)).unwrap()
            return result;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    
    return {loading , deletFood}
}