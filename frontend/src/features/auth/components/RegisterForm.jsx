import React from 'react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useRegister } from '../hooks/useRegister'
import { useGetOTP } from '../hooks/useGetOTP';
import { useVerifyOTP } from '../hooks/useVerifyOTP'
const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getOtp = useGetOTP()
    const varifyOTP = useVerifyOTP()
    const RegisterResturant = useRegister()
    const [showOtp, setShowOtp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    //auth state




const otpLoading = (getOtp.loading || varifyOTP.loading) == true ? true : false;

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

    // STEP 1: Get OTP
    const handleGetOtp = async () => {
        const { restaurantName, ownerEmail, ownerPhone } = getValues();

        if (!restaurantName) {
            toast.error("Restaurant name is required");
            return;
        }

        if (!ownerEmail) {
            toast.error("Email is required");
            return;
        }

        if (!ownerPhone) {
            toast.error("Phone number is required");
            return;
        }

        try {
            const result = await getOtp.getOTP({
                restaurantName,
                ownerEmail,
            })
            console.log(result)
            toast.success(result.payload.message);
            setShowOtp(true)
        } catch (error) {
             console.log(error)
            if (error?.status === 500) {
                toast.error("Server down");
            } else if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("otp sending error.");
            }
        }
    }




    // handle verify otp
    const handleVerifyOtp = async () => {
        const { ownerEmail, otp } = getValues();

        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        try {
            const result = await varifyOTP.varifyOtp({
                email: ownerEmail,
                otp,
            })
            toast.success(result.payload.data.message);
            setOtpVerified(true)
        } catch (error) {
            if (error?.status === 500) {
                toast.error("Server down");
            } else if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("otp varification faild");
            }
        }
    };

    // STEP 2: Submit Registration
    const onSubmit = async (data) => {

        if (!verified) {
            toast.error("Please verify your OTP first.");
            return;
        }
        try {
            const result = await RegisterResturant.Register(data)
            toast.success("Registration successful 🎉");
            navigate("/owner/dashboard");
        } catch (error) {
           
            if (error?.status === 500) {
                toast.error("Server down");
            } else if (errorr?.message) {
                toast.error(error.message);
            } else {
                toast.error("registion faild");
            }
        }



    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            {/* Restaurant Name */}
            <input
                required
                placeholder="Restaurant Name"
                {...register("restaurantName", { required: true })}
                className="input"
            />

            {/* Owner Name */}
            <input
                placeholder="Owner Name"
                {...register("ownerName", { required: true })}
                className="input"
            />

            {/* Owner Phone */}
            <input
                placeholder="Owner Phone"
                {...register("ownerPhone", { required: true })}
                className="input"
            />

            {/* Owner Email */}
            <input
                type="email"
                placeholder="Owner Email"
                {...register("ownerEmail", { required: true })}
                className="input"
            />

            {/* Address */}
            <textarea
                placeholder="Restaurant Address"
                {...register("address", { required: true })}
                className="input resize-none h-20"
            />

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: true,
                    minLength: 6,
                })}
                className="input"
            />

            {/* OTP Field (conditional) */}
            {showOtp && (
                <div className="flex gap-2">
                    <input
                        placeholder="Enter OTP"
                        {...register("otp", { required: true })}
                        className="input flex-1 border-yellow-500"
                        disabled={verified}
                    />

                    {!verified ? (
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading}
                            className="px-4 bg-zinc-800 border border-zinc-700
                   rounded-lg hover:border-green-500 hover:text-green-500
                   transition disabled:opacity-50"
                        >
                            {otpLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                    ) : (
                        <span className="px-4 flex items-center text-green-500 font-semibold">
                            ✓ Verified
                        </span>
                    )}
                </div>
            )}

            {/* Buttons */}
            {!showOtp ? (
                <button
                    type="button"
                    onClick={handleGetOtp}
                    disabled={otpLoading}
                    className="w-full py-3 bg-zinc-800 text-white font-semibold
                             rounded-lg border border-zinc-700
                             hover:border-yellow-500 hover:text-yellow-500
                             transition-all duration-300"
                >
                    {otpLoading ? "Sending..." : "Get OTP"}
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isSubmitting || !verified}
                    className="w-full py-3 bg-zinc-800 text-white font-semibold
                             rounded-lg border border-zinc-700
                             hover:border-green-500 hover:text-green-500
                             disabled:opacity-50 transition-all duration-300"
                >
                    {RegisterResturant.loading ? "Creating Account..." : "Submit & Register"}
                </button>

            )}
            <p className="text-sm text-center text-gray-400 ">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-yellow-500 hover:text-yellow-400 transition"
                >
                    Login here
                </Link>
            </p>

        </form>
    )
}

export default RegisterForm
