import { useState } from "react";
import {useDispatch} from "react-redux"
import {updateRestaurantProfile} from '../slice/settingThunk.js'

export const useUpdateRestaurantProfile = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const UpdateRestaurantProfile = async(data) => {
        setLoading(true)
        try{
            const result = await dispatch(updateRestaurantProfile(data)).unwrap()
            return result
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {loading , UpdateRestaurantProfile}
}