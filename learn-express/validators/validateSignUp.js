import joi from "joi";
import express from "express";
import validator from "./validate.js";
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