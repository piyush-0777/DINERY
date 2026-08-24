import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadDashbordThunk } from "../slice/loardDashbordThunk";

export const useLoardDashbord = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loardDashbord = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await dispatch(loadDashbordThunk()).unwrap();
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loardDashbord();
    }, []);

    return {
        loading,
        error,
        loardDashbord
    };
};