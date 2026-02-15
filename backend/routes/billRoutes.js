const express = require('express')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const {getBillById , BillCashPayment} = require('../controllers/billController')

const router = express.Router()

router.get('/:billId'  ,authenticateResturant ,getBillById)
router.put('/cashPayment/:tableId/:billId' ,authenticateResturant ,BillCashPayment )

module.exports = router;