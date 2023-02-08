import Joi from "joi";
const validator =(Schema) => (req,res,next) =>{
   const {error} = Schema.validate(req.body)
   if (error) {
    res.status(400).send(error.details)
   }else{
    next()
   }
}
export default validator