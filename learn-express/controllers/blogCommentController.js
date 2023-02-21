import blogModel from "../models/post.js"
import { Comment } from "../models/comment.js"
import schemaUser from "../models/user.js"
const createComment = async (req,res) =>{
    const blogId = req.params.id
    const userId = req.body._id
    blogModel.findOne({_id:blogId}).then(async (blog) =>{
        if (!blog) {
            return res.status(403).send({
                message:"no blog found",
            data:{}})
        }else{
            const comment = new Comment({
                comment: req.body.comment,
                blogId:blogId,
                userName:req.body.userName
            })
        //  await blogModel.updateOne(
        //         {_id:blogId},
        //         {
        //             $push:{blogComment: comment._id}
        //         }
        //         )
            await comment.save()
            return res.status(200).send(
                "comment created succefully",
                
            )
        }
    }).catch((error) =>{
        res.status(402).send({
            error:error.message
        })
    })
}
// const getComments = async (req, res) => {
//     try {
//         const blogId = req.params.id;
//         const Comments = await Comment.find({ blogId });
//         const messages = Comments.map(Comment => Comment.message);
//         res.status(200).json({ messages });
//     } catch (err) {
//         res.status(404).json(err);
//     }
// };
const getComments = async (req, res) => {
    try {
        const blogId = req.params.id
      const comment = await Comment.find({blogId})
    //   .select("name content -_id");
      if (!comment)
        return res
          .status(204)
          .json({ message: "Can't find comment with given Blog id" });
  
      return res.status(200).json({comment:comment});
    } catch (error) {
      res.status(500).json({ error:error.message});
    }
  };
export {createComment,getComments}