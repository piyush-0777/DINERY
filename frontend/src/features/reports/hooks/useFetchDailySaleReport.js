import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchDailySaleReportThunk} from '../slice/reportThunk'

export const useFetchDailySaleReport = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchDailySaleReport = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchDailySaleReportThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchDailySaleReport}
}