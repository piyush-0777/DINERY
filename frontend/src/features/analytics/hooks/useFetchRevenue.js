import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchRevenueThunk} from '../slice/analysisThunk'

export const useFetchRevenue = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchRevenue = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchRevenueThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchRevenue}
}