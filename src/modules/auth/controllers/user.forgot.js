async function forgotPassword(req,res){
    const {email} = req.body;
    try{
        if(!email){
            return res.status(400).json({
                message: 'Email is required',
            })
        }
        
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error',
            error: error.message,
        })
    }
}