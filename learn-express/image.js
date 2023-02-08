
// import bodyParse from 'body-parser'
// import urlencoded from 'body-parser'
// import express from 'express'
// import uploads from './cloudinary.js'
// import upload from './multer.js'
// import fs from 'fs'
// const image = express()

// image.use(bodyParse.urlencoded({
//     extended:false
// })
// )
// image.use("/uploadImage",upload.single('image'),async(req,res) =>{
//     const uploader =async(path) =>await cloudinary.uploads(path,'Images');
//     if (req.method =='POST') {
//         const urls =[]
//         const files = req.files
//         for (const file of files) {
//             const {path} = file
//             const newPath = await uploader(path)
//             urls.push(newPath)
//             fs.unlinkSync(path)   
//         }
//         res.status(200).JSON({
//             message:'upload succefully',
//             data:urls
//         })
//     }else{
//         res.status(405).JSON({
//             err:`${req.method} not allowed`
//         })
//     }
// })
// image.use(bodyParse.json())

// export default image


// {
//     "env": {
//       "test": {
//         "plugins": ["@babel/plugin-transform-modules-commonjs"]
//       }
//     }
//   }