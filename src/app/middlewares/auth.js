const jwt =require("jsonwebtoken")
const authConfig= require("../../config/auth");
const {promisify}=require("util")

module.exports=async (req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error:"Token not exists"})
    }

    const [bearer,token]=authHeader.split(' ');

    try{
        const decoded=await promisify(jwt.verify)(token,authConfig.secret);
        console.log(decoded);
        req.userId=decoded.id;
        return next();

    }catch(err){
        return res.status(401).json({error:"token invalid"})
    };

    console.log(authHeader)

    return next();
}