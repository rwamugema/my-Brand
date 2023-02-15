
import express from 'express'
import mongoose from 'mongoose'
import {signupSchema,
   loginSchema, 
   schemaComment, 
   contactSchema
} from '../validators/validateSignUp.js'
import { createBlog,
   getBlog, 
   getSingleBlog, 
   updateBlog,
   deleteBlog 
} from '../controllers/blogController.js'
import validator from '../validators/validate.js'
import { sign} from '../controllers/authController.js'
import { login } from '../controllers/authController.js'
import { validateToken } from '../middleware/auth.js'
import { Comment } from '../models/comment.js'
import { createComment, 
   getComments
} from '../controllers/blogCommentController.js'
import cloudinary from '../services/cloudinary.js'
import upload from '../services/multer.js'
import { addLike } from '../controllers/blogLikeController.js'
import { createContact, deleteQuery, getQueries } from '../controllers/contactController.js'
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blogs  api
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blog Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 */
router.get('/api/v1/blogs', getBlog )

//update post
/**
 * @swagger
 * /api/v1/blogs/:id:
 *   patch:
 *     tags:
 *       - Blogs
 *     summary: Update blog by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: The updated content of the blog
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: The updated title of the blog.
 *             content:
 *               type: string
 *               description: The updated content of the blog.
 *             image:
 *               type: file
 *               description: The updated image of the blog.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The updated title of the blog.
 *                 content:
 *                   type: string
 *                   description: The updated content of the blog.
 *                 image:
 *                   type: file
 *                   description: The updated image of the blog.
 *       404:
 *         description: Not Found
 */ 
 router.patch('/api/v1/blogs/:id',validateToken, updateBlog)

//get single/individual post
/**
 * @swagger
 * /api/v1/blogs/:id:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get blog a single blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The title of the blog.
 *                 content:
 *                   type: string
 *                   description: The content of the blog.
 *                 image:
 *                   type: file
 *                   description: The image of the blog.
 *       404:
 *         description: Not Found
 */
router.get('/api/v1/blogs/:id', getSingleBlog)
//create post
/**
 * @swagger
 * "/api/v1/blogs":
 *  post:
 *     tags:
 *     - Blogs
 *     summary: Create a Blog
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - image
 *            properties:
 *              id:
 *                type: number and vowels
 *                default: 23sldf3353453e
 *              title:
 *                type: string
 *                default: swagger
 *              content:
 *                type: string
 *                default: swagger documentation
 *              image:
 *                type: file
 *                default: profile.jpg
 *     responses:
 *      200:
 *        description: blog
 *      403:
 *       description: access denied
 *      404:
 *        description: Please provide all required details
 *      
 */
router.post('/api/v1/blogs',validateToken, upload.single('image'), createBlog)

//delete post
/**
 * @openapi
 * '/api/v1/blogs/:id':
 *  delete:
 *     tags:
 *     - Blogs
 *     summary: Deleted a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      403:
 *        description: access denied
 *      404:
 *        description: post does not exist
 */
router.delete('/api/v1/blogs/:id',validateToken, deleteBlog)
router.get("/api/v1/logout",validateToken, (req,res) =>{
   return res.json({message:"logout"})
})
/**
 * @swagger
 * "/api/v1/login":
 *  post:
 *     tags:
 *     - login
 *     summary: user login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: email@gmail.com
 *              password:
 *                type: string
 *                default: email123
 *              
 *     responses:
 *      200:
 *        description: login successfull
 *      400:
 *        description: user doesn't exist
 *      403:
 *        description: password is invalid
 *      
 */
router.post('/api/v1/login', validator(loginSchema),login,(req,res)=>{
   return res.json(user)
})
// sign up router
/**
 * @swagger
 * "/api/v1/signup":
 *  post:
 *     tags:
 *     - signup
 *     summary: user registration
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userName
 *              - email
 *              - password
 *            properties:
 *              userName:
 *                type: string
 *                default: swagger
 *              email:
 *                type: string
 *                default: swaggerDoc@gmail.com
 *              password:
 *                type: string
 *                default: swagger documentation
 *              
 *     responses:
 *      201:
 *        description: User registered Successfully
 *      400:
 *       description: email Already Taken    
 */
router.post('/api/v1/signup', validator(signupSchema), sign)
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blog
 *         - name
 *         - comment
 *       properties:
 *         blogId:
 *           type: string
 *           description: The unique identifier of the associated blog.
 *         userId:
 *           type: string
 *           description: The id of the user created comment.
 *         comment:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/blogs/{id}/comments:
 *   post:
 *     tags:
 *       - comments
 *     summary: Create a new comment for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: comment not found 
 */ 
router.post('/api/v1/blogs/:id/comment/create', validator(schemaComment), createComment)
/**
 * @swagger
 * /api/v1/blogs/{id}/likes:
 *   post:
 *     tags:
 *       - like
 *     summary: Update the number of likes for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog to update likes for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: like added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: number
 *                   description: The updated number of likes for the blog.
 *       404:
 *         description: Not Found
 */
router.post('/api/v1/blogs/:id/likes',validateToken, addLike)
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - blog
 *         - name
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the comment.
 *         blog:
 *           type: object
 *           description: The blog associated with the comment.
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier for the blog.
 *             title:
 *               type: string
 *               description: The title of the blog.
 *             content:
 *               type: string
 *               description: The content of the blog.
 *             image:
 *               type: file
 *               description: The image of the blog.
 *         name:
 *           type: string
 *           description: The name of the commenter.
 *         message:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/blogs/{id}/comments:
 *   get:
 *     tags:
 *       - comments
 *     summary: Get comments by blog ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier for the blog.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get('/api/v1/blogs/:id/comment', getComments )

//contact from user
/**
 * @swagger
 * /api/v1/contact:
 *   get:
 *     tags:
 *       - contact
 *     summary: Get all contact
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the message.
 *                   name:
 *                     type: string
 *                     description: The name of the sender.
 *                   email:
 *                     type: string
 *                     description: The email of the sender.
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *       404:
 *         description: Not Found
 */
router.get('/api/v1/contact', getQueries)
/**
 * @swagger
 * /api/v1/contact:
 *   post:
 *     tags:
 *       - contact
 *     summary: Create a new message
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the message sender.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the message sender.
 *               message:
 *                 type: string
 *                 description: Content of the message.
 *             required:
 *               - userName
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: message sent successfully
 *       400:
 *         description: all inputs are required
 */
router.post('/api/v1/contact',validator(contactSchema), createContact)
/**
 * @openapi
 * '/api/v1/contact/:id':
 *  delete:
 *     tags:
 *     - contact
 *     summary: Deleted a message
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the message
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      404:
 *        description: Not Found
 */
router.delete('/api/v1/contact/:id', validateToken, deleteQuery)
export default router