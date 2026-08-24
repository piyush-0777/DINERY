import { Crown, CheckCircle2, Star } from "lucide-react";
import SettingsCard from "./SettingsCard";
import { useNavigate } from "react-router-dom";

export default function SubscriptionCard({ restaurant }) {
  const navigate = useNavigate()
  const isPremium = restaurant?.isPremium;

  const activatedDate = restaurant?.premiumActivatedAt
    ? new Date(restaurant.premiumActivatedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;


    const goToUpgradePremiumPage = () =>{
     navigate(`/owner/getpremium`);
    }

  return (
    <SettingsCard
      title="Subscription Plan"
      icon={<Crown className="text-yellow-400" size={22} />}
    >
      <div
        className={`rounded-2xl border p-6 transition-all duration-300 ${
          isPremium
            ? "border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
            : "border-zinc-800 bg-zinc-950"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                {isPremium ? "Premium Plan" : "Free Plan"}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isPremium
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-700 text-zinc-200"
                }`}
              >
                {restaurant?.plan?.toUpperCase()}
              </span>
            </div>

            <p className="text-zinc-400 mt-3">
              {isPremium
                ? "Your restaurant has access to premium features."
                : "Upgrade your restaurant to unlock premium features."}
            </p>

            {isPremium && activatedDate && (
              <p className="text-sm text-yellow-400 mt-3">
                Activated on {activatedDate}
              </p>
            )}
          </div>

          {/* Right */}
          {!isPremium && (
            <button 
            onClick={goToUpgradePremiumPage}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition">
              Upgrade to Premium
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Feature
            title="Unlimited Tables"
            active={isPremium}
          />

          <Feature
            title="Unlimited Orders"
            active={isPremium}
          />

          <Feature
            title="Advanced Reports"
            active={isPremium}
          />

          <Feature
            title="Priority Support"
            active={isPremium}
          />
        </div>
      </div>
    </SettingsCard>
  );
}

function Feature({ title, active }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-3">
      {active ? (
        <CheckCircle2 size={20} className="text-green-500" />
      ) : (
        <Star size={20} className="text-zinc-500" />
      )}

      <span className="text-white text-sm font-medium">
        {title}
      </span>
    </div>
  );
}