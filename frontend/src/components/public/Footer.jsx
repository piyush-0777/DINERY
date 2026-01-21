const Footer = () => {
  return (
    <footer className="bg-black border-t select-none border-zinc-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="font-heading text-2xl tracking-widest text-white mb-4">
              DINERY
            </h2>
            <p className="text-sm leading-relaxed">
              Dinery is a modern real-time restaurant POS system
              designed to simplify ordering, improve kitchen
              efficiency, and enhance customer experience.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">
                Owner Dashboard
              </li>
              <li className="hover:text-white cursor-pointer">
                Live Orders
              </li>
              <li className="hover:text-white cursor-pointer">
                Menu Management
              </li>
              <li className="hover:text-white cursor-pointer">
                Table Ordering
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">
                About Dinery
              </li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-white cursor-pointer">
                Support
              </li>
            </ul>
          </div>

          {/* Owner */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Creator
            </h3>
            <p className="text-sm mb-2">
              Built & maintained by
            </p>
            <p className="text-white font-medium">
              PiyushRK
            </p>
            <a
              href="https://piyushrk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-yellow-500 hover:text-yellow-400 transition"
            >
              piyushrk.in →
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Dinery. All rights reserved.
          </p>

          <p>
            Made with ❤️ for restaurants
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
