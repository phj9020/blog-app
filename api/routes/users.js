import express from 'express';
import userModule from '../models/User';
import bcrypt from 'bcrypt';

const UserRouter = express.Router();
// UPDATE
const handleUpdate = async(req, res) => {

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

// DELETE 


UserRouter.put("/:id", handleUpdate)

export default UserRouter
