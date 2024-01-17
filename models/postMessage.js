import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likeCount : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    id : String
})

const PostMessage = new mongoose.model("PostMessage",postSchema);
export default PostMessage;