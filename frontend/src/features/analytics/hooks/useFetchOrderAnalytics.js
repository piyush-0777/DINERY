import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchOrdersAnalyticsThunk} from '../slice/analysisThunk'

export const useFetchOrdereAnalytics = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchOrderAnalytics = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchOrdersAnalyticsThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchOrderAnalytics}
}