import request from "../../../services/api";

export const settingService = {
  // Restaurant Profile
  updateRestaurantProfile: (formData) =>
    request(
      "/setting/RestaurantProfileUpdate",
      "PATCH",
      formData,
      true // FormData
    ),

  // Owner Information
  updateOwnerInformation: (data) =>
    request(
      "/setting/OwnerInformationUpdate",
      "PATCH",
      data
    ),

  // GST Number
  updateGSTNumber: (data) =>
    request(
      "/setting/GSTNumberUpdate",
      "PATCH",
      data
    ),

  // Change Password
  updatePassword: (data) =>
    request(
      "/setting/PasswordUpdate",
      "PATCH",
      data
    ),
};