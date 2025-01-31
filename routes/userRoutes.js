const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router.get('/products', userController.getProducts)
router.get('/get-reviews', userController.getReviews)
router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router
