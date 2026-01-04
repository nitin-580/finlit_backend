const express = require('express')
const {createUser}= require('../controllers/user.register');
const {loginUser}= require('../controllers/user.login');
const {refreshToken}= require('../controllers/user.refresh');
const {logoutUser}= require('../controllers/user.logout');
const router = express.Router();

router.post('/register',createUser);
router.post('/login',loginUser)
router.post('/refresh-token',refreshToken)
router.get('/me')
router.post('/logout',logoutUser)
router.post('/forgot-password')

router.get('/test',(req,res)=>{
    return res.json({message:'Authentication api'})
})

module.exports = router;