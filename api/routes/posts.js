import express from 'express';
import postModule from '../models/Post';
import userModule from '../models/User';

const PostRouter = express.Router();

// Get All Posts
const handleGetAllPosts = async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.category;
    try {
        let posts;

        if(username) {
            posts = await postModule.find({username});
        } else if(categoryName) {
            posts = await postModule.find({
                categories: {
                    $in: [categoryName]
                }
            });
        } else {
            posts = await postModule.find();
        }
        
        res.status(200).json({data: posts})
        
    } catch (err) {
        res.status(500).json({error:err})
    }
}

// GET Single Post
const handleGetSinglePost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await postModule.findById(id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({error: err})
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
const handleUpdatePost = async(req, res) => {
    const {id: postId} = req.params;
    const {username}= req.body;
    try {
        const post = await postModule.findById(postId);
        if(post.username === username) {
            const updatedPost  = await postModule.findByIdAndUpdate(postId, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedPost)
        } else {
            res.status(401).json({error: "본인 글만 수정할 수 있습니다."})
        }
    }catch (err) {
        res.status(500).json({error: err})
    }
}

// Delete Post
const handleDeletePost = async(req, res) => {
    const {id: postId} = req.params;
    const {id: userId}= req.body;

    try {
        const post = await postModule.findById(postId);
        const user = await userModule.findById(userId);

        if(post.username === user.username) {
            user.posts.pull(postId);
            user.save();
            await post.delete();
            res.status(200).json({message: "글을 성공적으로 삭제했습니다"})
        } else {
            res.status(401).json({error: "본인 글만 삭제할 수 있습니다."})
        }

    } catch (err) {
        res.status(500).json({error: err})
    }
}

// Routes
PostRouter.get("/", handleGetAllPosts);
PostRouter.get("/:id", handleGetSinglePost);
PostRouter.post("/createPost", handleCreatePost);
PostRouter.put("/:id", handleUpdatePost);
PostRouter.delete("/:id", handleDeletePost);

export default PostRouter;