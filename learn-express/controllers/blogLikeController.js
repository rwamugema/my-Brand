// import { Like } from "../models/blogLike.js";
// import blogModel from "../models/post.js";
// import schemaUser from "../models/user.js";

import blogModel from "../models/post.js";

// const addLike = async (req,res) =>{
//     const blogId = req.params.id
//    await blogModel.findOne({_id:blogId}).then(async(blog) =>{
//         if (!blog) {
//            return res.status(403).send({error:"blog doesn't exists"}) 
//         }else{
//             const like = new Like({
//                 blogId:blogId
//             })
//             await blogModel.updateOne(
//                 {_id:blogId},
//                 {
//                     $push:[{like:like._id}]
//                 })
//                 await like.save()
//                 return res.status(200).send({message:"like added"})

//         }
//     }).catch((err) =>{
//         return res.status(400).send({error:err.message})
//     })
// }
// export {addLike}
const addlike =async (req,res) =>{
    const postId = req.params.id;
    const userId = req.body.id;
  
    // Find the post in the database
    const post = await blogModel.findById(postId);
    post.likes += 1;
    post.likedBy.push(userId);
    await post.save();
    return res.json(post)
}


  export {addlike}