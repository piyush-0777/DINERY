import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ImagePlus,
  MapPin,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";

import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SettingsCard, useUpdateRestaurantProfile } from "../index.js";

export default function ProfileSection({ restaurant }) {
  const updateRestaurantProfile = useUpdateRestaurantProfile();

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (restaurant) {
      setFormData({
        restaurantName: restaurant.restaurantName || "",
        address: restaurant.address || "",
      });

      setPreview(restaurant.profileImg);
    }
  }, [restaurant]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.restaurantName.trim()) {
      toast.error("Restaurant name is required.");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required.");
      return;
    }

    const data = new FormData();

    data.append("restaurantName", formData.restaurantName);
    data.append("address", formData.address);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const result =
        await updateRestaurantProfile.UpdateRestaurantProfile(data);
      toast.success("Restaurant profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      restaurantName: restaurant.restaurantName,
      address: restaurant.address,
    });

    setPreview(restaurant.profileImg);
    setImageFile(null);

    setIsEditing(false);
  };

  return (
    <SettingsCard
      title="Restaurant Profile"
      icon={<Building2 className="text-orange-500" size={22} />}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                preview ||
                "https://placehold.co/180x180/18181b/ffffff?text=Restaurant"
              }
              alt="Restaurant"
              className="w-40 h-40 rounded-full object-cover border-4 border-zinc-700"
            />

            <>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition"
                >
                  <ImagePlus size={18} className="text-white" />
                </button>
              )}
            </>
          </div>

          <p className="text-zinc-500 text-sm mt-4">Restaurant Logo</p>
        </div>

        {/* Form */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-zinc-400 mb-2 text-sm">
                Restaurant Name
              </label>

              <input
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full rounded-xl px-4 py-3 border transition
                  ${
                    isEditing
                      ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
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
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 rounded-xl px-4 py-3 border transition
                    ${
                      isEditing
                        ? "bg-zinc-950 border-zinc-700 focus:border-orange-500 text-white"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed"
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl transition"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={updateRestaurantProfile.loading}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition min-w-[170px]"
                >
                  {updateRestaurantProfile.loading ? (
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
        </div>
      </div>
    </SettingsCard>
  );
}
