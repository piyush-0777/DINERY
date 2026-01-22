import { useState } from "react";
import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRestaurnatThunk } from "../../redux/thunks/authThunk"



const Register = () => {
  const dispatch = useDispatch();
  const [showOtp, setShowOtp] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const restaurant = useSelector(state => state.restaurant)
  console.log(restaurant)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  // STEP 1: Get OTP
  const handleGetOtp = () => {
    const { ownerEmail, ownerPhone } = getValues();

    if (!ownerEmail || !ownerPhone) {
      alert("Please enter email and phone number first");
      return;
    }

    // call SEND OTP API
    console.log("Sending OTP to:", ownerEmail, ownerPhone);

    setShowOtp(true);
  };


  // handle verify otp
  const handleVerifyOtp = async () => {
    const { otp } = getValues();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    setVerifyingOtp(true);

    // 🔥 call VERIFY OTP API here
    console.log("Verifying OTP:", otp);

    // mock success
    setTimeout(() => {
      setOtpVerified(true);
      setVerifyingOtp(false);
    }, 1000);
  };


  // STEP 2: Submit Registration
  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // TODO: call register API with OTP verification
  };

  return (
    <PublicLayout>
      <div className="min-h-[90vh] bg-black flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">

          {/* Left Image */}
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              alt="Restaurant Register"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center px-8">
                <h2 className="font-heading text-4xl text-white mb-4">
                  DINERY
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Register your restaurant and start
                  managing orders in real time.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 sm:p-12 text-white">
            <h3 className="font-heading text-3xl mb-2">
              Register Restaurant
            </h3>
            <p className="text-gray-400 mb-8 text-sm">
              Create your Dinery owner account
            </p>

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
                    disabled={otpVerified}
                  />

                  {!otpVerified ? (
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifyingOtp}
                      className="px-4 bg-zinc-800 border border-zinc-700
                   rounded-lg hover:border-green-500 hover:text-green-500
                   transition disabled:opacity-50"
                    >
                      {verifyingOtp ? "Verifying..." : "Verify OTP"}
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
                  className="w-full py-3 bg-zinc-800 text-white font-semibold
                             rounded-lg border border-zinc-700
                             hover:border-yellow-500 hover:text-yellow-500
                             transition-all duration-300"
                >
                  Get OTP
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-zinc-800 text-white font-semibold
                             rounded-lg border border-zinc-700
                             hover:border-green-500 hover:text-green-500
                             disabled:opacity-50 transition-all duration-300"
                >
                  {isSubmitting ? "Creating Account..." : "Submit & Register"}
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

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-8 text-center">
              © {new Date().getFullYear()} Dinery — Built by PiyushRK
            </p>
          </div>

        </div>
      </div>

      {/* Tailwind input utility */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 0.75rem;
            background: black;
            border: 1px solid #3f3f46;
            border-radius: 0.5rem;
            color: white;
            outline: none;
            transition: border 0.3s;
          }
          .input:focus {
            border-color: #eab308;
          }
        `}
      </style>
    </PublicLayout>
  );
};

export default Register;
