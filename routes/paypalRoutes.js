const express = require('express')
const paypalController = require('../controllers/paypal')

const router = express.Router()

router.post('/pay', paypalController.createOrder)
router.get('/complete-order', paypalController.completeOrder)

module.exports = router
