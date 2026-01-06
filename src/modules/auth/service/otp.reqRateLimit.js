async function checkOtpRateLimit(email){
    const key = `otp:req:${email}`
    const limit = 5;
    const ttl = 3600;

    const count = await redis.incr(key);
    if(count === 1){
        await redis.expire(key,ttl);
    }

    if(count > limit){
        throw new Error("Too many OTP requests. Please try again later.");
    }
}
module.exports={
    checkOtpRateLimit
}