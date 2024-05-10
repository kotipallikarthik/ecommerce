const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
// const { findOne } = require('./model/userModel/userModel')
const User=require('./model/userModel/userModel')
const { removeListener } = require('./model/userModel/userModel')
router.get("/",(req,res)=>{
   res.render('./userViews/login')
})
router.get("/sign-in",(req,res)=>{
    res.render('./userViews/signIn')
 })
 router.post("/create-user",async (req,res)=>{
   const {userName,userEmail,userNumber,userPassword}=req.body
   const existingUser= await User.findOne({userEmail})
   if(existingUser){
    return res.status(406).json({message:'user with this gmail is already existed'})
   }
   else{
    const user=new User({
        name:userName,
        email:userEmail,
        phone_number:userNumber,
        password:await bcrypt.hash(userPassword,12),
       
    })
    await user.save()
    res.redirect('/sign-in')
   }
   
 })
 router.post('/auth',async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(user){
        const passwordValid= await bcrypt.compare(password,user.password)
        if(passwordValid){
          req.session.isAuth=true,
          req.session.user=true
          if(user.role==0){
            res.render('../views/userViews/userDashboard')
          }else{
            res.redirect('../views/adminViews/adminDashboard')
          }
        }else{
            return res.status(406).json({message:'invalid password'})

        }
    }else{
        return res.status(406).json({message:'this email doesnt existed'})

    }
 })
router.get("/home",(req,res)=>{
    res.render('./adminViews/notFound')
})


module.exports=router