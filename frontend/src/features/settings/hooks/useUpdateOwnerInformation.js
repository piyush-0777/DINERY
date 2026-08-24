import { useState } from "react";
import {useDispatch} from "react-redux"
import {updateOwnerInformation} from '../slice/settingThunk.js'

export const useUpdateOwnerInformation = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const UpdateOwnerInformation = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(updateOwnerInformation(data)).unwrap()
            return result
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , UpdateOwnerInformation}
}