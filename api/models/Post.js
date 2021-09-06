import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photo: {
            type:String,
            required: false,
        },
        username: {
            type:String,
            required: true,
        },
        categories: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const postModule = mongoose.model('Post', postSchema);

export default postModule;