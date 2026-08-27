const express = require("express");
const { uploadSingle } = require("../middlewares/multerMiddleware");
const { createFood, deletFood, editFood, changeAvailablity } = require("../controllers/foodController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");

const router = express.Router();

// Protected: Only Owner or Admin can manage food items
router.post(
  "/create",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  uploadSingle,
  createFood
);

router.delete(
  "/deletfood/:foodId",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  deletFood
);

router.put(
  "/updatefood/:foodId",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  uploadSingle,
  editFood
);

router.put(
  "/changeavailablity/:foodId",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  changeAvailablity
);

module.exports = router;