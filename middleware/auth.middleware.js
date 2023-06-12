const jwt=require("jsonwebtoken")
const { blacklist } = require("../blacklist")
require('dotenv').config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        if(blacklist.includes(token)){
            res.json({msg:"Please login Again"})
        }
        try {
            const decoded=jwt.verify(token,process.env.secretKey)
            if(decoded){
                req.body.userId=decoded.userId;
                req.body.user=decoded.user;
                next()
            }else{
                res.status(200).json({msg:"Please Login"})
            }
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }else{
        res.json({msg:"Please login"})
    }
}

module.exports={
    auth
}