import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import localStrategy from 'passport-local'
import joi from 'joi'
import schemaUser from './models/user.js'
import { createServer } from './server.js'

const app = createServer()
mongoose.set("strictQuery",false)
.connect("mongodb+srv://japhet:empire@cluster0.wcifge7.mongodb.net/test", {
    useNewUrlParser:true,
})
    // app.listen(5000)
        // console.log('server has started');
        export default app
