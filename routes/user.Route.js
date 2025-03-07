const express = require('express');
const { register, login, getUserData, logout } = require('../controllers/user.Controller');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const router = express.Router();


//authentication Routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', isVerifiedUser, logout)
router.get('/', isVerifiedUser ,getUserData)

module.exports = router