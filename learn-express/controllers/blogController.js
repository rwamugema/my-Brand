import express from "express";
import Joi from "joi";
import blogModel from "../models/post.js";
import upload from "../services/multer.js";
import cloudinary from "../services/cloudinary.js";
// import userSchema from "../models/user.js";

//create blog method
const createBlog = async(req,res)=>{
    const post = new blogModel({
        title:req.body.title,
        content:req.body.content,
        id:req.body.id
    })
        if (!post.title) {
            res.send("post content is too short")
        }else if (!post.content) {
            res.send("post content is too short")
        }else if (post.title.length < 5) {
            res.send("post content is too short")
        }else if (post.content.length < 10) {
            res.send("post content is too short")
        }
    else{
        await post.save()
        res.send(post)
    }
}

// get all blogs method
const getBlog = async(req,res)=>{
    const posts = await blogModel.find()
    res.send(posts)
}

//update blog
const updateBlog = async(req,res) =>{
    try {
        const post = await blogModel.findOne({_id: req.params.id})
        if (req.body.title) {
            post.title = req.body.title
        }
        if (req.body.content) {
            post.content = req.body.content
        } 
        await post.save()
        res.send(post)
    } catch{
        res.status(404)
        res.send({error:'post does not exits'})
    }
 }

 //get sinle blog 
 const getSingleBlog = async(req,res) =>{
    try{
    const post = await blogModel.findOne({_d:req.params.id})
    res.send(post)
    }catch{
        res.status(404)
        res.send({error:'post does not exist'})
    }
}

//delete blog
const deleteBlog = async(req,res) =>{
    // console.log(req.params.id);
    const post = await blogModel.findOne({_id:req.params.id})
    if (post) {
        const result =  await blogModel.deleteOne({_id: req.params.id})
        res.status(204).json(result)
    }
        res.status(400).send({error:'post does not exists'})
}

// const uploadImage = (upload.single("image"), async(req,res) =>{
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path)
//         // res.json(result)
//         const blog = new blogModel({
//             title:req.body.title,
//             content:req.body.content,
//             image:result.url,
//             cloudinary_id:result.public_id
//         }) 
//         await blog.save()
//         res.json(blog)
//     } catch (err) {
//         console.log(err);
//     }
// })
export {createBlog,getBlog,updateBlog,getSingleBlog,deleteBlog}