import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";

import {SettingsCard , useUpdateOwnerInformation} from '../index.js'


export default function OwnerSection({ restaurant }) {
  const updateOwnerInformation = useUpdateOwnerInformation()

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        ownerName: restaurant.ownerName || "",
        ownerPhone: restaurant.ownerPhone || "",
        ownerEmail: restaurant.ownerEmail || "",
      });
    }
  }, [restaurant]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      ownerName: restaurant.ownerName,
      ownerPhone: restaurant.ownerPhone,
      ownerEmail: restaurant.ownerEmail,
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formData.ownerName.trim()) {
      return toast.error("Owner name is required.");
    }

    if (!formData.ownerPhone.trim()) {
      return toast.error("Phone number is required.");
    }

    if (!formData.ownerEmail.trim()) {
      return toast.error("Email is required.");
    }

    try {
      const result = await updateOwnerInformation.UpdateOwnerInformation(formData);
       toast.success("Owner information updated successfully.");
      setIsEditing(false);
      
    } catch (error) {
      toast.error(error?.message);
    }
  };

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
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-11 rounded-xl px-4 py-3 border transition ${
                isEditing
                  ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
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
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-11 rounded-xl px-4 py-3 border transition ${
                isEditing
                  ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
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
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-11 rounded-xl px-4 py-3 border transition ${
                isEditing
                  ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
            />
          </div>
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
              disabled={updateOwnerInformation.loading}
              className="flex items-center gap-2 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl transition"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={updateOwnerInformation.loading}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition min-w-[170px]"
            >
              {updateOwnerInformation.loading ? (
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