const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

async function refreshToken(req,res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized: No refresh token provided"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id).select("+refreshToken")
        if(!user || user.refreshToken !== token){
            return res.status(401).json({
                message:"Forbidden"
            })
        }
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({ message: "Token refreshed" });
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized: Invalid refresh token"
        })
    }
}
module.exports = { refreshToken };