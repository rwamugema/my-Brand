
import express from 'express'
import schemaModel from '../models/post.js'
import mongoose from 'mongoose'
import signupSchema from '../validators/validateSignUp.js'
import validator from '../validators/validate.js'
import { createBlog,getBlog, getSingleBlog, updateBlog,deleteBlog } from '../controllers/blogController.js'
import { generate } from '../controllers/authController.js'
const router = express.Router()
// const signup =express.Router()
//get all posts
router.get('/blog',getBlog )

//update post
 router.patch('/blog/:id',updateBlog)

//get single/individual post
router.get('/blog/:id', getSingleBlog)
router.post('/token', generate)
//create post
router.post('/blog', createBlog)

//delete post
router.delete('/blog/:id', deleteBlog)
// sign up router
router.post('/signup',validator(signupSchema), (req,res) =>{
    res.send("sign up succefully")
})
export default router