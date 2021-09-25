import 'dotenv/config';
import "regenerator-runtime";
import express from 'express';
import './db';
import AuthRouter from './routes/auth';
import UserRouter from './routes/users';
import PostRouter from './routes/posts';
import CategoryRouter from './routes/categories';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import multerS3 from "multer-s3";
import aws from 'aws-sdk';

const app = express();
const port = process.env.PORT || 5000;

const isHeroku = process.env.NODE_ENV === "production";
console.log(isHeroku)

const s3 = new aws.S3({ 
    // pass aws key and secret
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

const multerUploader = multerS3({
    s3: s3,
    bucket: 'hjp-blog-app/images', 
    acl: 'public-read', 
})

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? "https://agitated-curie-dd026a.netlify.app" : "http://localhost:3000",
    credentials: true,
};

// middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "/src/images")));

// upload image using multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images")
    },filename:(req,file,cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({
    dest: 'uploads/images',
    storage: isHeroku ? multerUploader : storage
});


// route
app.post("/api/upload", upload.single("file"), (req, res) => {
    const {location} = req.file;
    res.status(200).json(location)
})

app.get("/", (req, res) => {
    res.status(200).send("this is a HJP's Blog app api")
});
app.use("/api/auth", AuthRouter); 
app.use("/api/users", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/categories", CategoryRouter);


app.listen(port, ()=>{
    console.log(`blog app backend is listening on http://localhost:${port}`)
});

