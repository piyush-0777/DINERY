const express = require('express')
const {createTable , deleteTable , updateStatus , getTableById , getAllTable} = require('../controllers/tableController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/getalltable' ,authenticateResturant, getAllTable )
router.post('/createtable',authenticateResturant , createTable)
router.delete('/deletetable/:tableId' ,authenticateResturant, deleteTable )
router.put('/updatetablestatus/:tableId',authenticateResturant ,updateStatus)
router.get('/getTable/:tableId' , authenticateResturant , getTableById) 


module.exports = router