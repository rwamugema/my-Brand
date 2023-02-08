
import multer from 'multer'
import path from 'path'
const upload =multer({
    storage:multer.diskStorage({}),
    filefilter:(req,res,cb) =>{
        let ext =path.extname(file.originalname)
        if (!ext ==='.jpg' && !ext === '.png' && !ext === '.jpeg') {
            cb(new Error("file type not supporrted"), false)
            return
        }
        cb(null,true)
    }
})

export default upload