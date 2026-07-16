import { useSelector } from "react-redux";
import { motion } from "framer-motion";


import SettingsHeader from "../../components/owner/settings/SettingsHeader";
import ProfileSection from "../../components/owner/settings/ProfileSection";
import OwnerSection from "../../components/owner/settings/OwnerSection";
import BusinessSection from "../../components/owner/settings/BusinessSection";
import SubscriptionCard from "../../components/owner/settings/SubscriptionCard";
import ChangePasswordCard from "../../components/owner/settings/ChangePasswordCard";
import SaveButton from "../../components/owner/settings/SaveButton";

const RestaurantSettings = () => {
  const restaurant = useSelector(
    (state) => state.restaurant.restaurant
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <SettingsHeader />

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-8 space-y-8"
        >
          {/* Restaurant Profile */}
          <ProfileSection restaurant={restaurant} />

          {/* Owner Details */}
          <OwnerSection restaurant={restaurant} />

          {/* Business Information */}
          <BusinessSection restaurant={restaurant} />

          {/* Subscription */}
          <SubscriptionCard restaurant={restaurant} />

          {/* Change Password */}
          <ChangePasswordCard />
        </motion.div>

        {/* Bottom Save Button */}
        <div className="sticky bottom-0 mt-10 py-5 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B] to-transparent">
          <div className="flex justify-end">
            <SaveButton
              onClick={() => {
                console.log("Save Restaurant Settings");
                // Dispatch updateRestaurant thunk here
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettings;