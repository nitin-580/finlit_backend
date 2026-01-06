const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../service/otp.service');

async function loginUser(req, res){
    const {email, password}=req.body
    try{
        if(!email || !password){
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        const user = await User.findOne({email}).select("+password");;
        if(!user){
            return res.status(404).json({
                message: "User not found, please register"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const accesstoken = jwt.sign(
            { id: user._id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );
        const refreshtoken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        user.refreshToken = refreshtoken;
        await user.save();

        res
        .cookie("accessToken",accesstoken,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken",refreshtoken,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        await sendOtp({
            email,
            context: 'login'
          });
        
        return res.status(200).json({
            message: "Login successful",
            accesstoken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
          });      

    }catch(error){
        return res.status(400).json({
            message:"Internal Server Error",
            error: error.message,
        })
    }
}
module.exports = {
    loginUser
}