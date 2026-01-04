const User = require('../model/user.model');

async function getMe(req, res){
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password -refreshToken -__v -createdAt -updatedAt');

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          });
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}
module.exports ={
    getMe
}