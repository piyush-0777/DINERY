import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Shield,
  RefreshCw,
  LayoutDashboard,
  Tag,
  Store,
  LogOut,
  Users,
} from "lucide-react";
import {
  AdminStatsCards,
  OwnersTable,
  UsersTable,
  GrantPremiumModal,
  PricingConfigModal,
  CreateOwnerModal,
  useAdmin,
} from "../../features/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    stats,
    restaurants,
    users,
    pricing,
    loading,
    loadAllAdminData,
    grantSubscription,
    revokeSubscription,
    createRestaurantOwner,
    deleteRestaurantOwner,
    updatePrice,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("restaurants"); // 'restaurants', 'users', 'pricing'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [granting, setGranting] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadAllAdminData().catch((err) => {
      console.error("loadAllAdminData error:", err);
      toast.error(err.message || "Failed to load admin data");
    });
  }, [loadAllAdminData]);

  const handleGrantPremium = async (restaurantId, data) => {
    try {
      setGranting(true);
      await grantSubscription(restaurantId, data);
      toast.success("Premium subscription successfully granted!");
      setSelectedRestaurant(null);
      await loadAllAdminData();
    } catch (err) {
      toast.error(err.message || "Failed to grant premium");
    } finally {
      setGranting(false);
    }
  };

  const handleCreateOwner = async (formData) => {
    try {
      setCreating(true);
      await createRestaurantOwner(formData);
      toast.success("New Restaurant Owner created successfully!");
      setShowCreateModal(false);
      await loadAllAdminData();
    } catch (err) {
      toast.error(err.message || "Failed to create restaurant owner");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRestaurant = async (restaurant) => {
    const confirm = window.confirm(
      `Are you sure you want to delete '${restaurant.restaurantName}'? This cannot be undone.`
    );
    if (!confirm) return;

    try {
      await deleteRestaurantOwner(restaurant._id);
      toast.success(`Restaurant '${restaurant.restaurantName}' deleted.`);
      await loadAllAdminData();
    } catch (err) {
      toast.error(err.message || "Failed to delete restaurant");
    }
  };

  const handleRevokePremium = async (restaurant) => {
    const confirm = window.confirm(
      `Are you sure you want to remove the premium subscription for '${restaurant.restaurantName}'? Their account will be expired and restricted immediately.`
    );
    if (!confirm) return;

    try {
      await revokeSubscription(restaurant._id);
      toast.success(`Premium plan removed for '${restaurant.restaurantName}'.`);
      await loadAllAdminData();
    } catch (err) {
      toast.error(err.message || "Failed to remove premium plan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 lg:p-10 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl text-black shadow-md font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Platform Admin Console
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Manage restaurant accounts, create owners, grant premium, and configure live pricing.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => navigate("/owner/dashboard")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm transition cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Restaurant View</span>
            </button>

            <button
              onClick={() => loadAllAdminData()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global KPI Stats Cards */}
        <AdminStatsCards stats={stats} />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "restaurants"
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Restaurants & Owners ({restaurants?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "users"
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Platform Users ({users?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "pricing"
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Plan Pricing Configuration</span>
          </button>
        </div>

        {/* Tab 1: Restaurants & Owners */}
        {activeTab === "restaurants" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <OwnersTable
              restaurants={restaurants}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onOpenCreateModal={() => setShowCreateModal(true)}
              onDeleteRestaurant={handleDeleteRestaurant}
              onRevokePremium={handleRevokePremium}
            />
          </div>
        )}

        {/* Tab 2: Users & Diners */}
        {activeTab === "users" && (
          <div className="animate-in fade-in duration-200">
            <UsersTable users={users} />
          </div>
        )}

        {/* Tab 3: Pricing Configuration */}
        {activeTab === "pricing" && (
          <div className="animate-in fade-in duration-200">
            <PricingConfigModal pricing={pricing} onUpdatePrice={updatePrice} />
          </div>
        )}
      </div>

      {/* Grant Premium Modal */}
      {selectedRestaurant && (
        <GrantPremiumModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onGrant={handleGrantPremium}
          loading={granting}
        />
      )}

      {/* Create Restaurant Owner Modal */}
      {showCreateModal && (
        <CreateOwnerModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateOwner}
          loading={creating}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
