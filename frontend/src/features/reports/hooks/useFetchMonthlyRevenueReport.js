import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchMonthlyRevenueReportThunk} from '../slice/reportThunk'

export const useFetchMonthlyRevenueReport = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchMonthlyRevenueReport = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchMonthlyRevenueReportThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchMonthlyRevenueReport}
}