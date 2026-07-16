import { Building2, ImagePlus, MapPin } from "lucide-react";
import SettingsCard from "./SettingsCard";

export default function ProfileSection({ restaurant }) {
  return (
    <SettingsCard
      title="Restaurant Profile"
      icon={<Building2 className="text-orange-500" size={22} />}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                restaurant?.profileImg ||
                "https://placehold.co/180x180/18181b/ffffff?text=Restaurant"
              }
              alt="Restaurant"
              className="w-40 h-40 rounded-full object-cover border-4 border-zinc-700"
            />

            <button
              className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition"
            >
              <ImagePlus size={18} className="text-white" />
            </button>
          </div>

          <p className="text-zinc-500 text-sm mt-4 text-center">
            Restaurant Logo
          </p>
        </div>

        {/* Details */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 mb-2 text-sm">
              Restaurant Name
            </label>

            <input
              defaultValue={restaurant?.restaurantName}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2 text-sm">
              Address
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                defaultValue={restaurant?.address}
                className="w-full pl-11 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}