import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchCustomerReportThunk} from '../slice/reportThunk'

export const useFetchCustomerReport = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchCustomerReport = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchCustomerReportThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchCustomerReport}
}