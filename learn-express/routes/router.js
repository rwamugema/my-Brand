
import express from 'express'
import schemaModel from '../models/post.js'
import mongoose from 'mongoose'
import {signupSchema,loginSchema, schemaComment} from '../validators/validateSignUp.js'
import { createBlog,getBlog, getSingleBlog, updateBlog,deleteBlog } from '../controllers/blogController.js'
import validator from '../validators/validate.js'
import { sign} from '../controllers/authController.js'
import { login } from '../controllers/authController.js'
import { validateToken } from '../middleware/auth.js'
import { Comment } from '../models/comment.js'
import { createComment, getComment } from '../controllers/blogCommentController.js'
import cloudinary from '../services/cloudinary.js'
import upload from '../services/multer.js'
import { addLike } from '../controllers/blogLikeController.js'
const router = express.Router()
// const signup =express.Router()
//get all posts
router.get('/blogs', getBlog )

//update post
 router.patch('/blogs/:id',validateToken, updateBlog)

//get single/individual post
router.get('/blogs/:id', getSingleBlog)
//create post
router.post('/blogs',upload.single('image'), createBlog)

//delete post
router.delete('/blogs/:id',validateToken, deleteBlog)
router.get("/logout",validateToken, (req,res) =>{
    res.send("logout")
})
router.post('/login', validator(loginSchema),login,(req,res)=>{
    res.json(user)
})
// sign up router
router.post('/signup', validator(signupSchema), sign)
router.post('/blogs/:id/comment/create', validator(schemaComment), createComment)
router.post('/blogs/:id/likes',validateToken, addLike)
router.get('/blogs/comment', getComment )
export default router