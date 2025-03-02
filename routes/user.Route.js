const express = require('express');
const { register, login } = require('../controllers/user.Controller');
const router = express.Router();


//authentication Routes
router.post('/register', register)
router.post('/login', login)

module.exports = router