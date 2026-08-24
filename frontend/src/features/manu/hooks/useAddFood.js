import { useState } from "react";
import { useDispatch } from "react-redux";
import {addFoodThunk} from '../slice/manuThunk'

export const useAddFood = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const addFood = async (data) => {
        setLoading(true)
        try {
            const result = await dispatch(addFoodThunk(data)).unwrap()
            return result; 
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return {loading , addFood}
}