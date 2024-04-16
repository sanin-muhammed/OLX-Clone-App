const express = require('express');
const { post_signup, post_login, verify_otp } = require('../controllers/authController');
const router = express.Router()

router.post('/signup',post_signup)
router.post('/login',post_login)
router.post('/verify-otp',verify_otp)


module.exports = router