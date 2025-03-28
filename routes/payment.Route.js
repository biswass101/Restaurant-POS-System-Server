const router = require('express').Router();
const { createOrder, callback } = require('../controllers/payment.Controller');
const { bkashAuth } = require('../middleware/bkashAuth');
const { isVerifiedUser } = require('../middleware/tokenVerification');

router.post('/bkash/create-order', bkashAuth, createOrder);
router.get('/bkash/callback',bkashAuth ,callback);

module.exports = router;