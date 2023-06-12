const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { userModel } = require('../model/users.model');
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
  const {name,email,gender,password,age,city,is_married}=req.body
  try {
    const existing = await userModel.findOne({email});
    if(existing){
      return res.status(400).json({error:"User is already exists"})
    }
    bcrypt.hash(password,5,async(err,hash)=>{
      if(err){
        return res.status(400).json({error:err.message})
      }
      const user=new userModel({name,email,gender,password:hash,age,city,is_married})
      await user.save()
    })
  } catch (error) {
    return res.status(400).json({error:err.message})
  }
})

userRouter.post('/login', async(req,res)=>{
  const {email,password}=req.body;
  try {
      const user=await userModel.findOne({email})
      if(user){
bcrypt.compare(password,user.password,(err,result)=>{
  if(result){
      let token=jwt.sign({userId:user._id,user:user.name},process.env.secretKey)
      res.json({msg:"Login Success",token})
  }else{
      res.json({msg:"Login Failure//Wrong credantials"})
  }
})
      }else{
          res.json({msg:"user not found"})
      }
  } catch (error) {
      res.json({error:error.message})
  }
})

userRouter.get("/logout",(req,res)=>{
  const token=req.headers.authorization?.split(" ")[1];
  try {
      blacklist.push(token)
      res.status(200).json({msg:"User has been logged out"})
  } catch (error) {
      res.status(400).json({error:error.message})

  }
})


module.exports={
  userRouter
}