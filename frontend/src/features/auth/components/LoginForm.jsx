import React from 'react'
import { useForm } from "react-hook-form";
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const LoginForm = () => {

  const navigate = useNavigate()
  const { loading, login } = useLogin()



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      const token = result.data?.token || result.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      const userRole = result.data?.role || result.role;
      if (userRole) {
        localStorage.setItem("userRole", userRole);
      }

      toast.success("Login successful 🎉");

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/owner/dashboard");
      }
    } catch (err) {
      if (err?.status === 500) {
        toast.error("Server down");
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Login failed");
      }
    }
  };




  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Restaurant Name */}
      <div>
        <input
          type="text"
          placeholder="Restaurant Name"
          {...register("restaurantName", {
            required: "Restaurant name is required",
          })}
          className="w-full p-3 bg-black border border-zinc-700 rounded-lg
                             focus:outline-none focus:border-yellow-500 transition"
        />
        {errors.restaurantName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.restaurantName.message}
          </p>
        )}
      </div>

      {/* Owner Name */}
      <div>
        <input
          type="text"
          placeholder="Owner Name"
          {...register("ownerName", {
            required: "Owner name is required",
          })}
          className="w-full p-3 bg-black border border-zinc-700 rounded-lg
                             focus:outline-none focus:border-yellow-500 transition"
        />
        {errors.ownerName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ownerName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="ownerEmail"
          placeholder="Email Address"
          {...register("ownerEmail", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full p-3 bg-black border border-zinc-700 rounded-lg
                             focus:outline-none focus:border-yellow-500 transition"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className="w-full p-3 bg-black border border-zinc-700 rounded-lg
                             focus:outline-none focus:border-yellow-500 transition"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-zinc-800 text-white font-semibold
                           rounded-lg border border-zinc-700
                           hover:border-yellow-500 hover:text-yellow-500
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300"
      >
        {loading ? "Logging in..." : "Login to Dinery"}
      </button>
    </form>
  )
}

export default LoginForm
