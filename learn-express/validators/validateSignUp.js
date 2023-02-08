import joi from "joi";
import express from "express";
import validator from "./validate.js";
import schemaUser from "../models/user.js";
 
const signup = express.Router()

const signupSchema = joi.object({
    userName:joi.string(),
    email:joi.string(),
    password:joi.string()
})
signup.post('/signup', validator(signupSchema),async (req,res) =>{
    try {    

        const userExist = await schemaUser.findOne({email: req.body.email})
        
        if (userExist) return res.status(400).send("email Already Taken")
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        const user= new schemaUser({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
        })
    
         await user.save();
        res.status(201).send({Message:"User registered Successfully"})
    } catch (error) {
        // c
        console.log(error);
        res.send(error)
    }

})
export default signup