import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-heading text-2xl tracking-widest">
          DINERY
        </span>

        <div className="flex gap-6 text-sm">
          <Link className="hover:text-gray-400" to="/home">Home</Link>
          <Link className="hover:text-gray-400" to="/about">About</Link>
          <Link className="hover:text-gray-400" to="/login">Login</Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
