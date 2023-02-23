import mongoose  from 'mongoose'

const schema = mongoose.Schema({
    'title':String,
    'content':String,
    'category':String,
    'summary':String,
    'id':String,
    'image':String,
    blogComment:[{type:mongoose.Schema.Types.ObjectId, ref:'comments'}],
    likedBy:[{type:mongoose.Schema.Types.String, ref:'user'}],
    likes:{type: Number,
    default:0}
})
 const blogModel = mongoose.model('posts', schema)
export default blogModel
