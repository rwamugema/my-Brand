import express from 'express'
import router from './learn-express/routes/router.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors  from 'cors'
   
export const createServer = () =>{
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
              title: 'BLOGS API',
              description: 'Document REST api ',
              version: '0.7.5',
            },
    
            servers:[{
                url:"https://naughty-jay-tank-top.cyclic.app"
            }],
            components: {
                securitySchemes: {
                  bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                  },
                },
              },
            
        },
        apis:['learn-express/routes/router.js']
    
    }
    const swaggerSpec = swaggerJsdoc(options)
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use(router)
    return app
}

// ({
//   origin:"*",methods:["GET","POST","DELETE","UPDATE","PUT","PATCH"]
// })