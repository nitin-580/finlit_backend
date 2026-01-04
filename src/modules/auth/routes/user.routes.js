const express = require('express')
const {createUser}= require('../controllers/user.register');
const {loginUser}= require('../controllers/user.login');
const {refreshToken}= require('../controllers/user.refresh');
const {logoutUser}= require('../controllers/user.logout');
const {getMe}= require('../controllers/user.getme');
const {authMiddleware} = require('../middlewares/auth.middleware')
const router = express.Router();

router.post('/register',createUser);
router.post('/login',loginUser)
router.post('/refresh-token',refreshToken)
router.get('/me',authMiddleware,getMe)
router.post('/logout',logoutUser)
router.post('/forgot-password', (req, res) => {
    res.json({ message: 'Forgot password API not implemented yet' });
});
router.get('/test',(req,res)=>{
    return res.json({message:'Authentication api'})
})

module.exports = router;