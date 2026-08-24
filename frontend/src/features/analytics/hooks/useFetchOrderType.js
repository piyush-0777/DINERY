import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchOrderTypeThunk} from '../slice/analysisThunk'

export const useFetchOrderType = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchOrderType = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchOrderTypeThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchOrderType}
}