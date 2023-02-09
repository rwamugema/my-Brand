import  Mongoose from "mongoose";

const commentSchema = Mongoose.Schema({
    comment:String,
    blogId:{type:Mongoose.Schema.Types.ObjectId,
         ref:'posts'},
         userId:{type:Mongoose.Schema.Types.ObjectId,ref:'users'}
})
 const Comment = Mongoose.model('comment', commentSchema)
 export {Comment}