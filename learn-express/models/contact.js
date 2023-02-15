import mongoose from "mongoose";

const schema = mongoose.Schema({
    userName:String,
    email: String,
    message: String

})

const contact = mongoose.model('contact', schema)

export default contact