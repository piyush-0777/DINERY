const express = require("express");
const {
  UpdateRestaurantProfile,
  UpdateOwnerInformation,
  UpdateGSTNumber,
  UpdatePassword,
} = require("../controllers/settingController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const { uploadSingle } = require("../middlewares/multerMiddleware");

const router = express.Router();

// Protected: Only Owner or Admin can update restaurant settings
router.patch(
  "/RestaurantProfileUpdate",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  uploadSingle,
  UpdateRestaurantProfile
);

router.patch(
  "/OwnerInformationUpdate",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  UpdateOwnerInformation
);

router.patch(
  "/GSTNumberUpdate",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  UpdateGSTNumber
);

router.patch(
  "/PasswordUpdate",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  UpdatePassword
);

module.exports = router;