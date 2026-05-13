const express = require('express')
const emailController = require('../controllers/email.controller')

const router = express.Router()

router.post('/send-payment-confirmation', emailController.sendPaymentConfirmation)

module.exports = router
