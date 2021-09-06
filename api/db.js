require('dotenv').config();
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://phj9020:phj1042518!@cluster0.vpzst.mongodb.net/blog-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = ()=> console.log("Connected to MongoDB");
const handleError = (error)=> console.log("DB Error", error);

db.on('error', handleError);
db.once('open', handleOpen);