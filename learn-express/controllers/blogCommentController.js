import blogModel from "../models/post.js"
import { Comment } from "../models/comment.js"
import schemaUser from "../models/user.js"
const createComment = async (req,res) =>{
    const blogId = req.params.id
    blogModel.findOne({_id:blogId}).then(async (blog) =>{
        if (!blog) {
            return res.status(403).send({
                message:"no blog found",
            data:{}})
        }else{
            const comment = new Comment({
                comment: req.body.comment,
                blogId:blogId,
                userId:req.body._id
            })
         await blogModel.updateOne(
                {_id:blogId},
                {
                    $push:{blogComment: comment._id}
                }
                
                )
            await comment.save()
            return res.status(200).send({
                message: "comment created succefully",
                data:comment
            })
        }
    }).catch((error) =>{
        res.status(402).send({
            error:error.message
        })
    })
}
const getComment = async (req,res) =>{
    const comment = await Comment.find()
    res.send(comment)
}
export {createComment,getComment}