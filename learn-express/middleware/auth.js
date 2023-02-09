import  Jwt  from "jsonwebtoken";
import schemaUser from "../models/user.js";

const validateToken = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    const token =authHeader && authHeader.split(" ")[1]
    let result
  if (!authHeader) {
    res.status(403).send("access denied")
  }
  const expire = {
    expireIn: "24h"
  }
  try {
    // const user = await schemaUser.findOne({
    //     email:req.body.email
    // })
    // if (!user) {
    //  return res.status(403).send("no user")
    // }
    result = Jwt.verify(token, "japhet")
    //  if (!user.userName === result.userName) {
    //     return res.status(403).send("invalid token")
    //  }
     req.user = result.user
     next();
  } catch (error) {
    return res.status(403).send("authorization failed")
  }
}
export {validateToken}
