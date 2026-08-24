import { useState } from "react";
import {useDispatch} from 'react-redux'
import {getTableThunk } from '../slice/tableThunk'

export const useGetTable = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const getTable = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(getTableThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {loading , getTable}
}