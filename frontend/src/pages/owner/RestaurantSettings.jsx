import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  SettingsHeader ,
  ProfileSection ,
  OwnerSection ,
  BusinessSection ,
  SubscriptionCard ,
  ChangePasswordCard ,
  SaveButton ,

} from '../../features/settings'

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

        
      </div>
    </div>
  );
};

export default RestaurantSettings;