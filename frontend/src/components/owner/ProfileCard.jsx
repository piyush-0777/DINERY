import { Settings, LogOut } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="absolute right-0 mt-4 w-72 rounded-2xl 
      bg-gradient-to-br from-[#0f0f0f] to-[#141414]
      border border-gray-800 shadow-2xl p-4 z-50
      backdrop-blur-xl animate-fadeIn">

      {/* User Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100"
            alt="owner"
            className="w-14 h-14 rounded-full border border-gray-700"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111] rounded-full" />
        </div>

        <div>
          <p className="text-white font-semibold leading-tight">
            Piyush
          </p>
          <p className="text-gray-400 text-xs">
            Restaurant Owner
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-3" />

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Restaurant</span>
          <span className="text-white font-medium">Dinery</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Email</span>
          <span className="text-white">owner@dinery.com</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-1">
        <button
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
          text-gray-300 hover:text-white
          hover:bg-gray-800 transition-all"
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <button
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
          text-red-400 hover:text-red-500
          hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-gray-500 mt-5 text-center">
        © {new Date().getFullYear()} Dinery · Built by PiyushRK
      </p>
    </div>
  );
};

export default ProfileCard;

