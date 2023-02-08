import express from "express"
import Joi from "joi"
 const users= express.Router()
import cloudinary from "../services/cloudinary.js"
import userSchema from "../models/user.js"
import blogModel from "../models/post.js"
import upload from "../services/multer.js"
// import path from "path"

users.post('/', upload.single("image"), async(req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        // res.json(result)
        const blog = new blogModel({
            title:req.body.title,
            content:req.body.content,
            image:result.url,
            cloudinary_id:result.public_id
        }) 
        await blog.save()
        res.json(blog)
    } catch (err) {
        console.log(err);
    }
})
export default users