async function generateOtp(req,res){
    try{
        const otp = Math.floor(100000 + Math.random() * 900000).toString;
        const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
        return res.status(200).json({
            otp: otp,
            otphash : otpHash
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}

module.exports={
    generateOtp
}