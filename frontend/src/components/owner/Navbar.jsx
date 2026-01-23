import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";


import {
    LayoutDashboard,
    ShoppingCart,
    BarChart3,
    Menu,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
    "Dashboard",
    "Orders",
    "Menu",
    "Tables",
    "Staff",
    "Analytics",
    "Reports",
];

const mobileNav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Orders", icon: ShoppingCart },
    { name: "Analytics", icon: BarChart3 },
];

const Navbar = () => {
    const navigate = useNavigate()
    let timeout;
    const [showProfile, setShowProfile] = useState(false);
    const [active, setActive] = useState("Dashboard");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(()=>{
        console.log(active.toLowerCase())
        navigate(`/owner/${active.toLowerCase()}`);
    }, [active]);

    return (
        <>
            {/* Top Navbar */}
            <nav className="w-full select-none bg-black border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            aria-label="Toggle menu"
                            className="md:hidden flex items-center justify-center
                w-9 h-9 rounded-lg
                bg-[#111] border border-gray-800
                text-gray-300 hover:text-white
                transition-all"
                        >
                            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        {/* Desktop Logo + Brand */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* <img
                src="/logo.png"
                alt="Dinery Logo"
                className="w-9 h-9 object-contain"
              /> */}

                            <span
                                className="text-xl font-serif tracking-[0.28em]
                bg-gradient-to-r from-[#D4AF37] via-[#F5E6A8] to-[#B8962E]
                bg-clip-text text-transparent select-none"
                            >
                                DINERY
                            </span>
                        </div>

                        {/* Mobile Brand */}
                        <span
                            className="md:hidden text-lg font-serif tracking-wider
              bg-gradient-to-r from-[#D4AF37] via-[#F5E6A8] to-[#B8962E]
              bg-clip-text text-transparent"
                        >
                            DINERY
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li
                                key={item}
                                onClick={() => setActive(item)}
                                className={`relative cursor-pointer text-sm font-medium
                  transition-colors duration-300
                  ${active === item
                                        ? "text-[#F5E6A8]"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {item}

                                {/* Animated underline */}
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px]
                    bg-gradient-to-r from-[#D4AF37] to-[#B8962E]
                    transition-all duration-300
                    ${active === item
                                            ? "w-full opacity-100"
                                            : "w-0 opacity-0"
                                        }`}
                                />
                            </li>
                        ))}
                    </ul>

                    {/* Profile */}
                    <div
                        className="relative"
                        onMouseEnter={() => {
                            clearTimeout(timeout);
                            setShowProfile(true);
                        }}
                        onMouseLeave={() => {
                            timeout = setTimeout(() => setShowProfile(false), 200);
                        }}
                    >
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="profile"
                            className="w-9 h-9 rounded-full cursor-pointer
                ring-2 ring-gray-700 hover:ring-[#D4AF37]
                transition-all"
                        />

                        {showProfile && <ProfileCard />}
                    </div>
                </div>

                {/* Mobile Full Menu */}
                {mobileMenu && (
                    <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-4">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setActive(item);
                                    setMobileMenu(false);
                                }}
                                className={`block w-full text-left text-sm font-medium transition
                  ${active === item
                                        ? "text-[#F5E6A8]"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden
        bg-black border-t border-gray-800 z-40">
                <div className="flex justify-around items-center h-14">
                    {mobileNav.map(({ name, icon: Icon }) => (
                        <button
                            key={name}
                            onClick={() => setActive(name)}
                            className={`flex flex-col items-center text-xs transition
                ${active === name
                                    ? "text-[#F5E6A8]"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;


