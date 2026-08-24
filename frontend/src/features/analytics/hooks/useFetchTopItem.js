import { useState } from "react";
import {useDispatch} from "react-redux"
import {fetchTopItemsThunk} from '../slice/analysisThunk'

export const useFetchTopItems = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const fetchTopItems = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(fetchTopItemsThunk(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , fetchTopItems}
}