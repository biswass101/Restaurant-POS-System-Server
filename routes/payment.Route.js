const router = require('express').Router();
const { createOrder } = require('../controllers/payment.Controller');
const { isVerifiedUser } = require('../middleware/tokenVerification');

router.post('/create-order', isVerifiedUser, createOrder)

module.exports = router;