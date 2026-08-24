import { Link } from "react-router-dom";
import RegisterForm from "../../features/auth/components/RegisterForm";




const Register = () => {
 
  // state for hendel otp
 

  return (
    <>
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

           <RegisterForm/>

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
    </>
  );
};

export default Register;
