const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div className="font-heading text-xl tracking-widest">
          DINERY
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer">
            Support
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Dinery. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
