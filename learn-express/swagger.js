import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'BLOGS API',
          description: 'Document REST api ',
          version: '0.7.5',
        },

        servers:[{
            url:"http://localhost:5000"
        }]
        
    },
    apis:['./routes/router.js']
}

const swaggerSpec = swaggerJsdoc(options)

export const swaggerDocs = (app, port) =>{
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // app.get('docs.json', (req,res) =>{
    //     res.setHeader('Content-type', 'application/json')
    //     res.send(swaggerSpec)
    // })
}