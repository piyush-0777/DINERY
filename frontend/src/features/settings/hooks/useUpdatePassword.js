import { useState } from "react";
import {useDispatch} from "react-redux"
import {updatePassword} from '../slice/settingThunk.js'

export const useUpdatePassword = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const UpdatePassword = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(updatePassword(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , UpdatePassword}
}