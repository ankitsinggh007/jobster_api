const JWT=require('jsonwebtoken');
const UserModal = require('../models/User');

require("dotenv").config();
const AuthMiddlware=async (req,res,next)=>{
try {
    const {headers}=req;
    const auth=headers.authorization;
    const token=auth?.split(" ")[1];
    if(!token){
        res.status(401).json({
            success:true,
            message:"invalid request"   
        });
    }
    const payload=JWT.verify(token,process.env.Secret);
    const user=await UserModal.findById(payload.id).select('-password');
    req.user=user;
    next();

} catch (error) {
    res.status(401).json({
        success:false,
        message:`${error.message}`,
        data:[],
        error:error,   
    });
} 
    
    
}
module.exports=AuthMiddlware;