import express from 'express';
import bcrypt from 'bcrypt';
import userModule from '../models/User';

const AuthRouter = express.Router();


// Register
const handleRegister = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const alreadyExistUser = await userModule.findOne({
            username: username,
            email: email,
        });
        if(alreadyExistUser) {
            return res.status(409).json({error:"이메일 또는 유저이름이 이미 사용중입니다"})
        } else {
            const newUser = new userModule({
                username: username,
                email: email,
                password: hashedPassword,
            });
    
            const user = await newUser.save();
            return res.status(201).json(user);
        }
    } catch(err){
        res.status(500).json({error: "이메일 또는 유저이름이 이미 사용중입니다"});
    }
};

// Login 
const handleLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModule.findOne({
            email: email,
        }); 
        
        if(!user) {
            res.status(400).json("입력하신 이메일은 없는 계정입니다.")
        }

        const validate = await bcrypt.compare(password, user.password);

        if(!validate) {
            res.status(400).json("비밀번호가 일치하지 않습니다")
        }

        const {password:hashedPassword, ...otherInfo} = user._doc;
        res.status(200).json(otherInfo);

    } catch(err){
        res.status(500).json(err);
    }
}

AuthRouter.post("/register", handleRegister);
AuthRouter.post("/login", handleLogin);


export default AuthRouter;