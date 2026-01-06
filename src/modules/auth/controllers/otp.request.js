const {redis} = require('../../../config/redis.config');
const { checkOtpRateLimit } = require('../service/otp.reqRateLimit');
const {generateOtp} = require('../utils/uttil.generateOtp')
async function requestOtp(req,res){
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                message:"Email or Phone Number is required"
            })
        }
        await checkOtpRateLimit(email);
        const {otp,otpHash}=await generateOtp(email);

        const key = `otp:${email}`;

        await redis.hset(key,{otpHash,attempts:0});
        await redis.expire(key,300)
        console.log(`DEBUG OTP for ${email}: ${otp}`);
        return res.status(200).json({
            message: "OTP sent successfully (debug mode)"
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}
module.exports ={
    requestOtp
}