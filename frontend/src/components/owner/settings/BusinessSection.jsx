import { useEffect, useState } from "react";
import {
  Calendar,
  FileText,
  Building2,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import SettingsCard from "./SettingsCard";
import { updateGSTNumber } from "../../../redux/thunks/settingThunk.js";
import { resetSettingLoadState } from "../../../redux/features/owner/settingLoadSlice.js";

export default function BusinessSection({ restaurant }) {
  const dispatch = useDispatch();

  const { loading, success, error, reqtype } = useSelector(
    (state) => state.loadsetting
  );

  const [isEditing, setIsEditing] = useState(false);
  const [gstNumber, setGstNumber] = useState("");

  useEffect(() => {
    if (restaurant) {
      setGstNumber(restaurant.gstNumber || "");
    }
  }, [restaurant]);

  useEffect(() => {
    if (reqtype !== "updateGSTNumber") return;

    if (success) {
      toast.success("GST Number updated successfully.");
      setIsEditing(false);
      dispatch(resetSettingLoadState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetSettingLoadState());
    }
  }, [success, error, reqtype, dispatch]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleCancel = () => {
    setGstNumber(restaurant?.gstNumber || "");
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!gstNumber.trim()) {
      return toast.error("GST Number is required.");
    }

    dispatch(
      updateGSTNumber({
        gstNumber: gstNumber.trim(),
      })
    );
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
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              disabled={!isEditing}
              placeholder="GST Number"
              className={`w-full pl-11 rounded-xl px-4 py-3 border transition ${
                isEditing
                  ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
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

      <div className="flex justify-end gap-3 mt-8">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
          >
            <Pencil size={18} />
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              disabled={loading && reqtype === "updateGSTNumber"}
              className="flex items-center gap-2 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl transition"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading && reqtype === "updateGSTNumber"}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition min-w-[170px]"
            >
              {loading && reqtype === "updateGSTNumber" ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </>
        )}
      </div>
    </SettingsCard>
  );
}