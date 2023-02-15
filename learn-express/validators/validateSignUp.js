import joi from "joi";
import express from "express";
import schemaUser from "../models/user.js";
 
export const signupSchema = joi.object({
    userName:joi.string(),
    email:joi.string(),
    password:joi.string()
})
export const loginSchema = joi.object({
    userName:joi.string(),
    email:joi.string().email().required(),
    password:joi.string()
})
export const schemaComment = joi.object({
    comment:joi.string()
    .min(5)
    .required()
})
export const contactSchema = joi.object({
    userName:joi.string().required().min(3).max(15),
    email:joi.string().email().required(),
    message:joi.string().min(5).max(30).required()
})