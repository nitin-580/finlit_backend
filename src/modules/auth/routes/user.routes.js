const express = require('express')
console.log("user.routes.js: starting import");

const {createUser}= require('../controllers/user.register');
console.log("loaded user.register");

const {loginUser}= require('../controllers/user.login');
console.log("loaded user.login");

const {refreshToken}= require('../controllers/user.refresh');
console.log("loaded user.refresh");

const {logoutUser}= require('../controllers/user.logout');
console.log("loaded user.logout");

const {getMe}= require('../controllers/user.getMe');
console.log("loaded user.getme");

const {authMiddleware} = require('../middlewares/auth.middleware');
console.log("loaded auth.middleware");

const {ipRateLimiting} = require('../middlewares/ipRateLimiting.middleware');
console.log("loaded ipRateLimiting.middleware");

const {requestOtp} = require('../controllers/otp.request');
console.log("loaded otp.request");

const {verifyOtp} = require('../controllers/otp.verify');
console.log("loaded otp.verify");

const {forgotPassword} = require('../controllers/user.forgot');
console.log("loaded user.forgot");
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