import { useState } from "react";
import { useDispatch } from "react-redux";
import {LoadCustomerDashbord } from '../slice/customerThunk'

export const useLoadCustomerDashbord = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false) 
    
    const loadCustomerDashbord = async (data) => {
        setLoading(true)
        try{
            const resust = await dispatch(LoadCustomerDashbord(data)).unwrap();
            return resust
        } catch(error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading , loadCustomerDashbord }
}