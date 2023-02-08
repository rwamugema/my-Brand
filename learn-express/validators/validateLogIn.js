import joi  from "joi";
import express from "express";
import validator from "./validate.js";
import { generate } from "../controllers/authController.js";

const login = express.Router()

const loginSchema = joi.object({
    userName:joi.string(),
    email:joi.string().email().required(),
    password:joi.string()
})
login.post('/login',validator(loginSchema),generate, (req,res) =>{
   res.send("login successifully")
})

export default login;