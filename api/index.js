require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;

// middleware 
// body-parser is deprecated use express.json() instead
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

// route
app.use("/api/auth", AuthRouter); 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("Mongo DB is now Connected");
    app.listen(port, ()=>{
        console.log(`blog app backend is listening on http://localhost:${port}`)
    });
}).catch(e => console.log(e));






