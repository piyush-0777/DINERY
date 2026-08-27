const express = require("express");
const {
  createTable,
  deleteTable,
  updateStatus,
  getTableById,
  getAllTable,
} = require("../controllers/tableController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");

const router = express.Router();

// Protected: Only Owner or Admin can manage tables
router.get("/getalltable", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), getAllTable);
router.post("/createtable", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), createTable);
router.delete("/deletetable/:tableId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), deleteTable);
router.put("/updatetablestatus/:tableId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), updateStatus);
router.get("/getTable/:tableId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), getTableById);

module.exports = router;