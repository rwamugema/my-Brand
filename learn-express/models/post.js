import mongoose  from 'mongoose'

const schema = mongoose.Schema({
    'title':String,
    'content':String,
    'id':String,
    'image':String,
    cloudinary_id:String,
    blogComment:[{type:mongoose.Schema.Types.ObjectId, ref:'comments'}],
    blogLike:[{type:mongoose.Schema.Types.ObjectId, ref:'blogLikes'}]
})
 const blogModel = mongoose.model('posts', schema)
export default blogModel