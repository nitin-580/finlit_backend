const userModel = require('../model/user.model');
async function forgotPassword(req,res){
    const {email} = req.body;
    try{
        if(!email){
            return res.status(400).json({
                message: 'Email is required',
            })
        }
        const existingUser = await User.findOne({email});
            if(!existingUser){
                return res.status(404).json({
                    message: 'User not found',
                })
            }
            
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}