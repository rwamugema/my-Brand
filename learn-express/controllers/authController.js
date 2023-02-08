import jwt from 'jsonwebtoken'
import schemaUser from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

export const generate = async(req,res) => {
    const user= await schemaUser.find()
    console.log(user);
    if (!user) {
        return res.json({errr:"failed"})
    }else{
        const accessToken =  jwt.sign({userName:"japhet"}, "japhet")
        
        res.json({accessToken: accessToken})
    }
   
}
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
// export {login, register}