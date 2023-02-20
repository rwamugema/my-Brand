import mongoose from 'mongoose'
import { createServer } from './server.js'

const app = createServer()
mongoose.set("strictQuery",false)
.connect("mongodb+srv://japhet:empire@cluster0.wcifge7.mongodb.net/test", {
    useNewUrlParser:true,
})
    app.listen(5000)
        export default app
