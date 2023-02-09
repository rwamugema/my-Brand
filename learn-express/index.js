import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import localStrategy from 'passport-local'
import joi from 'joi'
import router from './routes/router.js'
import dotenv from 'dotenv'
// import {auth} from './middleware/auth.js'
import schemaUser from './models/user.js'
// import { authRouter } from './routes/authRoute.js'
// import validateSignup from './validators/signup.js'

dotenv.config()
// const port = process.env.PORT || 3000
// const server = http.createServer(image)
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.use(auth.initialize)
// server.listen(port)
app.use(express.json())
mongoose.set("strictQuery",true)
.connect("mongodb+srv://japhet:empire@cluster0.wcifge7.mongodb.net/test", {
    useNewUrlParser:true,
   
})
.then(()=>{
    
    app.use('/api/v1',router)
    app.listen(5000, ()=>{
        console.log('server has started');
    })
    
})
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))
// // app.use(new localStrategy(schemaUser.authenticate()))
// app.use(passport.initialize())
// app.use(passport.session())
// passport.serializeUser(schemaUser.serializeUser())
// passport.deserializeUser(schemaUser.deserializeUser())

// app.use(authRouter)
// app.use('/api/v1/user',users )

