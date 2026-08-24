import { useForm  } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginForm from "../../features/auth/components/LoginForm"

const Login = () => {

  return (
   
      <div className="min-h-[100vh] bg-black flex items-center justify-center px-6">
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

            <LoginForm/>
            <p className="text-sm pt-1 text-center text-gray-400 ">
                            Don't have an account?{" "}
                            <Link
                              to="/register"
                              className="text-yellow-500 hover:text-yellow-400 transition"
                            >
                              Register here
                            </Link>
                          </p>

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

