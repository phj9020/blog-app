import express from 'express';
import userModule from '../models/User';
import postModule from '../models/Post';
import bcrypt from 'bcrypt';

const UserRouter = express.Router();

// UPDATE User
const handleUpdateUser = async(req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            req.body.password =  await bcrypt.hash(req.body.password, 10);
        };
        try {
            const updatedUser = await userModule.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});   // return updated object by using  {new: true}
            res.status(200). json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("본인 계정이 아닌 정보를 업데이트 할 수 없습니다.")
    }
}

// DELETE User
const handleDeleteUser = async (req, res) => {
    const {userId} = req.body;
    const {id} = req.params;

    if(userId === id) {
        const user = await userModule.findById(id);
        if(!user) {
            res.status(404).json({message:"계정를 찾지 못했습니다"})
        }
        try {
            // delete posts written by user
            await postModule.deleteMany({
                username: user.username
            });

            // delete user account
            await userModule.findByIdAndDelete(id);
            res.status(200).json({message:"계정이 성공적으로 삭제되었습니다"});

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json({message: "본인 소유 계정만 삭제할 수 있습니다"})
    }
}


// GET USER
const handleGetUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await userModule.findById(id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err) {
        res.status(500).json({error:err});
    }
};

UserRouter.put("/:id", handleUpdateUser);
UserRouter.delete("/:id", handleDeleteUser);
UserRouter.get("/:id", handleGetUser);

export default UserRouter
