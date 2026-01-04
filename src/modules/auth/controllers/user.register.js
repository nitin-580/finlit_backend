const User = require('../model/user.model');

async function createUser(req,res){
    const {name,email,password} = req.body;
    try{
        if(!email || !password || !name){
            return res.status(400).json({
                message:'All fields are required',
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:'User Already Exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
    });
        return res.status(201).json({
            message:'User create Successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}
module.exports = {
    createUser
}