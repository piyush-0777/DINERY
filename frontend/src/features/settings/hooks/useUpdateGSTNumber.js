import { useState } from "react";
import {useDispatch} from "react-redux"
import {updateGSTNumber} from '../slice/settingThunk.js'

export const useUpdateGSTNumber = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const UpdateGSTNumber = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(updateGSTNumber(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , UpdateGSTNumber}
}