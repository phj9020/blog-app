import 'dotenv/config';
import "regenerator-runtime";
import express from 'express';
import './db';
import AuthRouter from './routes/auth';
import UserRouter from './routes/users';
import PostRouter from './routes/posts';
import CategoryRouter from './routes/categories';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 5000;


// middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

// upload image using multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },filename:(req,file,cb) => {
        cb(null, file.originalname+ '-' + Date.now() + ".jpeg")
    }
});

const upload = multer({storage: storage});


// route
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("파일이 성공적으로 업로드 되었습니다.")
})
app.use("/api/auth", AuthRouter); 
app.use("/api/users", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/categories", CategoryRouter);


app.listen(port, ()=>{
    console.log(`blog app backend is listening on http://localhost:${port}`)
});

