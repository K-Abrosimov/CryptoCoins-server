const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const paymentController = require('../controllers/payment.controller')


const router = express.Router();

router.post('/create-checkout-session',authMiddleware,paymentController.createCheckoutSession)
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.webhook)




module.exports = router