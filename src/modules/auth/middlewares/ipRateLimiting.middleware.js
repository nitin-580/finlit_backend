const {redis} = require("../../../config/redis.config");

async function ipRateLimiting(req,res,next){
    const ip = req.ip;
    const key = `rate-limit:${ip}`;
    const limit = 100;
    const window = 900;

    const count = await redis.incr(key);
    if(count === 1){
        await redis.expire(key,window);
    }

    if(count > limit){
        return res.status(429).json({
            message: "Too many requests from this"
        })
    }
    next();
}
module.exports ={
    ipRateLimiting
}