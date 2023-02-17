import express from "express";
import Joi from "joi";
import blogModel from "../models/post.js";
import upload from "../services/multer.js";
import cloudinary from "../services/cloudinary.js";
// import userSchema from "../models/user.js";

//create blog method
const createBlog = async(req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newBlog = await blogModel.create({
            title : req.body.title,
            content:req.body.content,
            image : result.secure_url
        })
        const blogCreated =await newBlog.save()
        res.status(200).json(blogCreated)
    } catch (error) {
        res.status(404).json(error)
    }
}

// get all blogs method
const getBlog = async(req,res)=>{
    const posts = await blogModel.find({})
    return res.status(200).json(posts)
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
       return res.send(post).status(200)
    } catch{
        res.status(404)
        res.send({error:'post does not exits'})
    }
 }

 //get sinle blog 
 const getSingleBlog = async(req,res) =>{
    try {
        const blog = await blogModel.findOne({ _id: req.params.id });
        if (!blog) {
        res.status(404).json({message:"Post not found"});
        } else {
        res.send(blog).status(200);
        }
        } catch (error) {
        res.status(500).json({message:"something went wrong!"});
        }
        };


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