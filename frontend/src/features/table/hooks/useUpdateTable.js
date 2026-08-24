import { useState } from "react";
import {useDispatch} from 'react-redux'
import {updateTableThunk } from '../slice/tableThunk'

export const useUpdateTable = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const updateTable = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(updateTableThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {loading , updateTable}
}