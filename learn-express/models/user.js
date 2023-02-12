import mongoose from "mongoose"
// import passportLocalMongoose from 'passport-local-mongoose'
const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    
})
// userSchema.plugin(passportLocalMongoose)
const schemaUser = mongoose.model('user',userSchema)
export default schemaUser 