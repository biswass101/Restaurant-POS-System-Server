const express = require('express');
const { register, login, getUserData } = require('../controllers/user.Controller');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const router = express.Router();


//authentication Routes
router.post('/register', register)
router.post('/login', login)
router.get('/', isVerifiedUser ,getUserData)

module.exports = router