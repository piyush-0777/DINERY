const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const { getBillById, BillCashPayment } = require("../controllers/billController");

const router = express.Router();

// Owner, Admin, or User can view bill details
router.get("/:billId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN, ROLES.USER), getBillById);

// Only Owner or Admin can settle cash payments and clear tables
router.put("/cashPayment/:tableId/:billId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), BillCashPayment);

module.exports = router;