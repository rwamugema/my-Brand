import express from "express";
import  passport from "passport";
import schemaUser from "../models/user.js";
import passportJWT from 'passport-jwt'
import {jwtSecret,jwtSession} from '../config.js'
 const Strategy = passportJWT.Strategy
 const extractJWT = passportJWT.ExtractJwt

 const params = {
    secretOrKey:jwtSecret,
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken("jwt")
 }
 const auth = () =>{
   const strategy = new Strategy(params, (payload, done) =>{
    const user = schemaUser.findById(payload.id, (err,msg) =>{
        if(err){
            return done(new Error("userNotFound"), null)
        }else if(payload.expire <= Date.now()){
            return done(new Error("tokenexpired"), null)
        }else{
            return done(null, user)
        }
    })
   })
   passport.use(strategy)
   return {initialize: function(){
        passport.initialize()
   },
   authenticate: () =>{
    passport.authenticate('jwt', jwtSession)
   }
}
 }

 export {auth}