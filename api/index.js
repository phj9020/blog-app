import 'dotenv/config';
import "regenerator-runtime";
import express from 'express';
import './db';
import AuthRouter from './routes/auth';
import UserRouter from './routes/users';
import PostRouter from './routes/posts';
import CategoryRouter from './routes/categories';

const app = express();
const port = process.env.PORT || 5000;


// middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

// route
app.use("/api/auth", AuthRouter); 
app.use("/api/users", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/categories", CategoryRouter);


app.listen(port, ()=>{
    console.log(`blog app backend is listening on http://localhost:${port}`)
});

