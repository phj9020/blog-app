import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type:String,
            required: true,
        },
        profilePic: {
            type: String,
            default: ''
        },
        posts: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
    },
    {
        timestamps: true
    }
);

const userModule = mongoose.model('User', userSchema);

export default userModule;