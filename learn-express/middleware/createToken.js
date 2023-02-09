import  Jwt from "jsonwebtoken";

const createToken = (user) =>{
    try {
        const payload = {user}
     const token =  Jwt.sign(payload, "japhet")
     return {accessToken: token}
    } catch (error) {
        return {error:true}
    }
    
}
export {createToken}