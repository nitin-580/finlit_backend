const express = require('express')
const {createUser}= require('../controllers/user.register');
const {loginUser}= require('../controllers/user.login');
const {refreshToken}= require('../controllers/user.refresh');
const {logoutUser}= require('../controllers/user.logout');
const {getMe}= require('../controllers/user.getme');
const {authMiddleware} = require('../middlewares/auth.middleware')
const {ipRateLimiting} = require('../middlewares/ipRateLimiting.middleware')
const {requestOtp} = require('../controllers/otp.request')
const {verifyOtp} = require('../controllers/otp.verify')
const {forgotPassword} = require('../controllers/user.forgot')
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/register',ipRateLimiting,createUser);
router.post('/login',ipRateLimiting,loginUser)
router.post('/refresh-token',refreshToken)
router.get('/me',authMiddleware,getMe)
router.post('/logout',authMiddleware,logoutUser)
router.post('/forgot-password',ipRateLimiting,forgotPassword);
router.post('/request-otp',ipRateLimiting,requestOtp)
router.post('/verify-otp',verifyOtp)
router.get('/test',(req,res)=>{
    return res.json({message:'Authentication api'})
})

module.exports = router;