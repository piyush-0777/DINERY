const express = require('express')
const {createTable , deleteTable , updateStatus} = require('../controllers/tableController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/getalltable' ,authenticateResturant, )
router.post('/createtable',authenticateResturant , createTable)
router.delete('/deletetable/:tableId' ,authenticateResturant, deleteTable )
router.put('/updatetablestatus/:tableId',authenticateResturant ,updateStatus )


module.exports = router