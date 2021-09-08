import express from 'express';
import postModule from '../models/Post';
import userModule from '../models/User';

const PostRouter = express.Router();

// Get All Posts
const handleGetAllPosts = async (req, res) => {
    try {
        const posts = await postModule.find();
        if(posts) {
            res.status(200).json({data: posts})
        } else {
            res.status(404).json({error: "data not Found"})
        }
    } catch (err) {
        res.status(500).json({error:err})
    }
}


// Create Post
const handleCreatePost = async (req, res) => {
    try {
        const newPost = new postModule(req.body);
        const savedPost = await newPost.save();
        
        const user = await userModule.findById({
            _id: req.body.owner._id,
        });

        user.posts.push(newPost._id);
        user.save();

        res.status(200).json({data: savedPost})

    } catch (err) {
        res.status(500).json({error: err})
    }
};

// Update Post 


// Delete Post 


// Get single Post /:id

PostRouter.get("/getAllPosts", handleGetAllPosts);
PostRouter.post("/createPost", handleCreatePost);

export default PostRouter;