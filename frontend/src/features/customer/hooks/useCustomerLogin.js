import { useState } from "react";
import { useDispatch } from "react-redux";
import {customerLoginThunk } from '../slice/customerThunk'

export const useCustomerLogin = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const customerLogin = async (data) => {
        setLoading(true)
        try{
            const resust = await dispatch(customerLoginThunk(data)).unwrap();
            return resust
        } catch(error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading , customerLogin }
}