import Mongoose from "mongoose";

const likeSchema = Mongoose.Schema({
    blogId:{type:Mongoose.Schema.Types.ObjectId, ref:'posts'},
    userId:{type:Mongoose.Schema.Types.ObjectId, ref:'users'}
})

const Like = Mongoose.model('blogLikes', likeSchema)

export {Like}