import { useState } from "react";
import { useDispatch } from "react-redux";
import {registerRestaurnatThunk} from '../slices/authThunk'


export const useRegister = () => {

    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const Register = async (data) =>{
        setLoading(true)
      try  {
            const res = await dispatch(registerRestaurnatThunk(data)).unwrap()
            return res;
        } catch(error) {
        throw error
            
        } finally {
            setLoding(false)
        }
    }

    return {
        loading  , Register
    }
}