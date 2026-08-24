import { useState } from "react";
import {useDispatch} from 'react-redux'
import {addTableThunk } from '../slice/tableThunk'

export const useAddTable = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const addTable = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(addTableThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {loading , addTable}
}