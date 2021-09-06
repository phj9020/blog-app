require('dotenv').config();
import express from 'express';
import AuthRouter from './routes/auth';
import './db';

const app = express();
const port = process.env.PORT || 5000;


// middleware 
// body-parser is deprecated use express.json() instead
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

// route
app.use("/api/auth", AuthRouter); 


app.listen(port, ()=>{
    console.log(`blog app backend is listening on http://localhost:${port}`)
});

