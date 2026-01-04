const express = require('express')
const app = express()
const PORT= 8000
const userRoute = require('./src/modules/auth/routes/user.routes');

app.use(express.urlencoded({extended:true}));

app.get('/api/v1/',(req,res)=>{
    return res.json({message:'This is a homepage'})
})
app.use('/api/v1/auth',userRoute);

app.listen(PORT,()=>console.log('The Server is running on PORT',PORT));