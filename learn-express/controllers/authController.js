import jwt from 'jsonwebtoken'
import schemaUser from '../models/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { createToken } from '../middleware/createToken.js'
dotenv.config()

 const login = async(req,res) => {
    // const {userName, password} = req.body
    const user= await schemaUser.findOne({email:req.body.email})
    if (!user) {
        return res.json({errr:"user doesn't exist"}).status(400)
    }else{
        const Password = user.password
        bcrypt.compare(req.body.password , Password).then(async (match) =>{
            if (!match) {
                return res.json("password is invalid")
            }else{
               const token = createToken(user)
               return res.send(token).status(200)
            }
        })
       
    }
}
 const sign = async (req,res) =>{
    try {    

        const userExist = await schemaUser.findOne({email: req.body.email})
        
        if (userExist) return res.status(400).send("email Already Taken")
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
       const  user= new schemaUser({
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPassword,
        })
       
        await user.save()
      return  res.status(201).send({Message:"User registered Successfully"})
    } catch (error) {
        // c
        console.log(error);
        res.send(error)
    }

}
export {login,sign}
// import express from "express";
// import schemaUser from "../models/user.js";
// import { jwtSecret,jwtSession } from "../config.js";
// import jwt from 'jwt-simple'

// const login = (req,res) =>{
//     schemaUser.findOne({userName:req.body.userName},(error,user)=>{
//         if (error) {
//             res.send("failed to login")
//         }else{
//             const payload = {
//                 id:schemaUser.id,
//                 expire: Date.now() * 1000
//             };
//             const token = jwt.encode(payload, jwtSecret)
//             res.json({
//                 token:token
//             })
//         }
//     })
// }
//  const register = (req,res)=>{
//     schemaUser.register(new schemaUser({userName:req.body.userName,email:req.body.email }),req.body.password,(err,msg) =>{
//         if (err) {
//             res.send(err)
//         }else{
//             res.send({message:"successifull"})
//         }
//     })
// }
//  {login, register}