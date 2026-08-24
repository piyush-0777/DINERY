import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchGSTReportThunk} from '../slice/reportThunk'

export const useFetchGSTReport = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchGSTReport = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchGSTReportThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchGSTReport}
}