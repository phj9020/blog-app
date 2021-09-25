import express from 'express';
import categoryModule from '../models/Category';

const CategoryRouter = express.Router();

const handlePostCategory = async (req, res) => {
    const {addCategory} = req.body;
    const newCategory = new categoryModule({
        name: addCategory
    });
    try {
        const saveCategory = await newCategory.save();
        res.status(200).json(saveCategory);
    }catch(err){
        res.status(500).json({error: err})
    }
}

const handleGetCategory = async (req, res) => {
    try {
        const category = await categoryModule.find()
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err)
    }
}


CategoryRouter.post("/", handlePostCategory);
CategoryRouter.get("/", handleGetCategory);

export default CategoryRouter;