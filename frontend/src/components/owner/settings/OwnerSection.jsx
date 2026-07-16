import { User, Phone, Mail } from "lucide-react";
import SettingsCard from "./SettingsCard";

export default function OwnerSection({ restaurant }) {
  return (
    <SettingsCard
      title="Owner Information"
      icon={<User className="text-orange-500" size={22} />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Owner Name */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Owner Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              defaultValue={restaurant?.ownerName}
              className="w-full pl-11 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              defaultValue={restaurant?.ownerPhone}
              className="w-full pl-11 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-zinc-400 mb-2 text-sm">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="email"
              defaultValue={restaurant?.ownerEmail}
              className="w-full pl-11 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}