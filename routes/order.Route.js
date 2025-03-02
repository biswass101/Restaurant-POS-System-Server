const express = require('express');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const { addOrder, getOrders, getOrder, updateOrder } = require('../controllers/order.Controller');
const router = express.Router();

router.post('/', isVerifiedUser, addOrder);
router.get('/', isVerifiedUser, getOrders);
router.get('/:id', isVerifiedUser, getOrder);
router.put('/:id', isVerifiedUser, updateOrder)

module.exports = router;