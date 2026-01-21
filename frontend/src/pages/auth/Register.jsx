import PublicLayout from "../../layouts/PublicLayout";

const Register = () => {
  return (
    <PublicLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <form className="w-96 bg-gray-900 p-8 rounded">
          <h2 className="font-heading text-3xl text-center mb-6">
            Register Restaurant
          </h2>

          <input
            className="w-full mb-4 p-3 bg-black border border-gray-700 rounded"
            placeholder="Restaurant Name"
          />

          <input
            className="w-full mb-4 p-3 bg-black border border-gray-700 rounded"
            placeholder="Owner Email"
          />

          <input
            type="password"
            className="w-full mb-6 p-3 bg-black border border-gray-700 rounded"
            placeholder="Password"
          />

          <button className="w-full py-3 bg-white text-black rounded">
            Create Account
          </button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Register;
