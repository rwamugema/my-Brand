import express from 'express'
import router from './routes/router.js'
export const createServer = () =>{
    const app = express()
    app.use(express.json())
    app.use('/api/v1',router)
    return app
}
