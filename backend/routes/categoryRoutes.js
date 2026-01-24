const express = require('express')
const {addCategory} = require('../controllers/categoryController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const {uploadSingle} = require('../middlewares/multerMiddleware')

const router = express.Router()


router.post('/addcategory', authenticateResturant,uploadSingle , addCategory)

module.exports = router;