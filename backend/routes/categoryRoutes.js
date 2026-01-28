const express = require('express')
const {addCategory , deletCategory , editCategory} = require('../controllers/categoryController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const {uploadSingle} = require('../middlewares/multerMiddleware')

const router = express.Router()


router.post('/addcategory', authenticateResturant,uploadSingle , addCategory)
router.delete('/deletcategory/:categoryId',authenticateResturant ,deletCategory )
router.put('/editcategory/:categoryId',authenticateResturant , uploadSingle , editCategory )

module.exports = router;