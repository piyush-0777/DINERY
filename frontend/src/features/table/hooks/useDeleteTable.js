import { useState } from "react";
import {useDispatch} from 'react-redux'
import {deleteTableThunk } from '../slice/tableThunk'

export const useDeleteTable = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const deleteTable = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(deleteTableThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {loading , deleteTable}
}