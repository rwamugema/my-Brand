import mongoose  from 'mongoose'

const schema = mongoose.Schema({
    'title':String,
    'content':String,
    'id':String,
    'image':String,
    cloudinary_id:String
})
 const blogModel = mongoose.model('posts', schema)
export default blogModel