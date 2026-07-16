import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import SettingsCard from "./SettingsCard";

export default function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SettingsCard
      title="Security"
      icon={<ShieldCheck className="text-orange-500" size={22} />}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {/* Current Password */}
        <PasswordInput
          label="Current Password"
          show={showCurrent}
          setShow={setShowCurrent}
        />

        {/* New Password */}
        <PasswordInput
          label="New Password"
          show={showNew}
          setShow={setShowNew}
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          show={showConfirm}
          setShow={setShowConfirm}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-300">
          Update Password
        </button>
      </div>
    </SettingsCard>
  );
}

function PasswordInput({ label, show, setShow }) {
  return (
    <div>
      <label className="block mb-2 text-sm text-zinc-400">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type={show ? "text" : "password"}
          placeholder={label}
          className="w-full pl-11 pr-12 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-orange-500 transition"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}