import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister } from "../hooks/useRegister";
import { useGetOTP } from "../hooks/useGetOTP";
import { useVerifyOTP } from "../hooks/useVerifyOTP";

const RegisterForm = () => {
  const navigate = useNavigate();
  const getOtp = useGetOTP();
  const varifyOTP = useVerifyOTP();
  const RegisterResturant = useRegister();
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);

  const otpLoading = Boolean(getOtp.loading || varifyOTP.loading);

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
      });
      console.log("OTP Sent Result:", result);
      toast.success(result?.message || "OTP sent successfully to your email!");
      setShowOtp(true);
    } catch (error) {
      console.error("OTP Send Error:", error);
      const msg =
        error?.data?.message ||
        error?.message ||
        "Error sending OTP. Please check the email address.";
      toast.error(msg);
    }
  };

  // STEP 2: Verify OTP
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
      });
      console.log("OTP Verify Result:", result);
      toast.success(result?.message || "OTP verified successfully!");
      setVerified(true);
    } catch (error) {
      console.error("OTP Verify Error:", error);
      const msg =
        error?.data?.message ||
        error?.message ||
        "Invalid OTP. Please try again.";
      toast.error(msg);
    }
  };

  // STEP 3: Submit Registration
  const onSubmit = async (data) => {
    if (!verified) {
      toast.error("Please verify your OTP first.");
      return;
    }

    try {
      await RegisterResturant.Register(data);
      toast.success("Registration successful 🎉");
      navigate("/owner/dashboard");
    } catch (error) {
      console.error("Registration Error:", error);
      const msg =
        error?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            placeholder="Enter 6-digit OTP"
            {...register("otp", { required: true })}
            className="input flex-1 border-yellow-500 font-mono tracking-widest text-center"
            disabled={verified}
          />

          {!verified ? (
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpLoading}
              className="px-4 bg-zinc-800 border border-zinc-700
                   rounded-lg hover:border-green-500 hover:text-green-500
                   transition disabled:opacity-50 cursor-pointer text-sm font-semibold"
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>
          ) : (
            <span className="px-4 flex items-center text-green-500 font-semibold text-sm">
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
                     transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {otpLoading ? "Sending..." : "Get OTP"}
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || !verified || RegisterResturant.loading}
          className="w-full py-3 bg-zinc-800 text-white font-semibold
                     rounded-lg border border-zinc-700
                     hover:border-green-500 hover:text-green-500
                     disabled:opacity-50 transition-all duration-300 cursor-pointer"
        >
          {RegisterResturant.loading ? "Creating Account..." : "Submit & Register"}
        </button>
      )}

      <p className="text-sm text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-yellow-500 hover:text-yellow-400 transition"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
