import { useState } from "react";
import {useDispatch} from 'react-redux'
import {updateStatusThunk } from '../slice/tableThunk'

export const useUpdateTableStatus = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const updateTableStatus = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(updateStatusThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {loading , updateTableStatus}
}