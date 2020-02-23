const User =require("../models/User")
const jwt =require("jsonwebtoken")
const Yup=require("yup")

const authConfig=require('../../config/auth')

class SessionController{
    async store(req,res){
        const schema=Yup.object().shape({
            email:Yup.string().email().required(),
            password:Yup.string().required(),
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({"vali":"failed"});
        }
        
        const {email, password}=req.body;
        const user=await User.findOne({where:{email}})

        if(!user){
            return res.status(401).json({erros:"user not exist"})
        }
        if(!(await user.checkPassword(password))){
            return res.status(401).json({error:"pass not match"})
        }
        const {id, name}=user;
        return res.json({
            user:{
                id,
                name,
                email,
            },
            token:jwt.sign({id},authConfig.secret,{
                expiresIn:authConfig.expiresIn,
            }),
        })
    }
}

module.exports=new SessionController();