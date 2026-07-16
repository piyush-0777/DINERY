import { Calendar, FileText, Building2 } from "lucide-react";
import SettingsCard from "./SettingsCard";

export default function BusinessSection({ restaurant }) {
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <SettingsCard
      title="Business Information"
      icon={<Building2 className="text-orange-500" size={22} />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GST Number */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            GST Number
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              defaultValue={restaurant?.gstNumber || ""}
              placeholder="GST Number"
              className="w-full pl-11 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        {/* Created At */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Restaurant Created
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={formatDate(restaurant?.createdAt)}
              readOnly
              className="w-full pl-11 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Restaurant ID */}
        <div>
          <label className="block text-zinc-400 mb-2 text-sm">
            Restaurant ID
          </label>

          <input
            value={restaurant?._id || ""}
            readOnly
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed"
          />
        </div>
      </div>
    </SettingsCard>
  );
}