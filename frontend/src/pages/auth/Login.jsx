import PublicLayout from "../../layouts/PublicLayout";

const Login = () => {
  return (
    <PublicLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <form className="w-96 bg-gray-900 p-8 rounded">
          <h2 className="font-heading text-3xl text-center mb-6">
            Owner Login
          </h2>

          <input
            className="w-full mb-4 p-3 bg-black border border-gray-700 rounded"
            placeholder="Email"
          />

          <input
            type="password"
            className="w-full mb-6 p-3 bg-black border border-gray-700 rounded"
            placeholder="Password"
          />

          <button className="w-full py-3 bg-white text-black rounded">
            Login
          </button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Login;
