import express from 'express';
import bcrypt from 'bcrypt';
import userModule from '../models/User';

const AuthRouter = express.Router();


// Register
const handleRegister = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = new userModule({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch(err){
        res.status(500).json(err);
    }
};

// Login 
const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        // to do : jwt 
        // bcrypt.compare 
    } catch(err){
        res.status(500).json(err);
    }
}

AuthRouter.post("/register", handleRegister);
AuthRouter.post("/login", handleLogin);


export default AuthRouter;