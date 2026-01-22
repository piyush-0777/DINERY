import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { useDispatch , useSelector} from "react-redux"
import {loginRestaurantThunk} from "../../redux/thunks/authThunk"

const Login = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  console.log(auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    
    // TODO: call login API here
    console.log("Login Data:", data);
    dispatch(loginRestaurantThunk(data))
    
  };

  return (
   
      <div className="min-h-[90vh] bg-black flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid md:grid-cols-2 bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">

          {/* Image Section */}
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              alt="Restaurant POS"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center px-8">
                <h2 className="font-heading text-4xl text-white mb-4">
                  DINERY
                </h2>
                <p className="text-gray-300 text-sm">
                  Smart restaurant POS system for real-time operations
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-10 sm:p-12 text-white">
            <h3 className="font-heading text-3xl mb-2">
              Owner Login
            </h3>
            <p className="text-gray-400 mb-8 text-sm">
              Login to manage your restaurant
            </p>

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
                {isSubmitting ? "Logging in..." : "Login to Dinery"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-8 text-center">
              © {new Date().getFullYear()} Dinery — Built by PiyushRK
            </p>
          </div>

        </div>
      </div>
   
  );
};

export default Login;

