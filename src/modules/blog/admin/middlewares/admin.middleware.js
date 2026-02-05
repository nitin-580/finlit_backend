const adminMiddleware = (req,res,next)=>{
    try{
        if (req.user.role !== "admin"){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
        next();

    }catch(err){
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

module.exports = {adminMiddleware};