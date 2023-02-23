import blogModel from "../models/post.js";
const addlike =async (req,res) =>{
    const postId = req.params.id;
    const userEmail = req.body.email;
    // Find the post in the database
    const post = await blogModel.findById(postId);
    if (!post.likedBy.includes(userEmail)) {
      post.likes += 1;
      post.likedBy.push(userEmail);
      await post.save();
      return res.json(post)
    }else{
      post.likes -=1
      post.likedBy.pop(userEmail)
      await post.save();
      return res.json(post)
    }
}


  export {addlike}