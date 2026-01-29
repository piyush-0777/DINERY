const express = require('express')
const {createTable} = require('../controllers/tableController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/createtable',authenticateResturant , createTable);

module.exports = router