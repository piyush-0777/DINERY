const express = require("express");
const { addCategory, deletCategory, editCategory } = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const { uploadSingle } = require("../middlewares/multerMiddleware");

const router = express.Router();

// Protected: Only Owner or Admin can manage food categories
router.post(
  "/addcategory",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  uploadSingle,
  addCategory
);

router.delete(
  "/deletcategory/:categoryId",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  deletCategory
);

router.put(
  "/editcategory/:categoryId",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  uploadSingle,
  editCategory
);

module.exports = router;