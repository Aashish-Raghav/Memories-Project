import { ObjectId } from "mongodb";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req,res)=>{
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
};

export const createPost = async (req,res)=>{
    const body = req.body;
    const newPost = new PostMessage(req.body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const updatePost = async (req,res)=>{
    try{
        const updates = req.body;
        const updatedPost = await PostMessage.findOneAndUpdate({id : req.params.id},updates);
        PostMessage.findOne({id : req.params.id}).then(data =>{console.log(data)});
        res.status(200).json(updates);
    }
    catch(error){
        res.status(409).json({message : error.message});
    }
}

export const deletePost = async (req,res)=>{
    try {
        PostMessage.deleteOne({id: req.params.id}).then((data)=>{
            console.log(data);
            console.log("Successfully delelted");
        })  
        res.status(200).json({message:"success"});
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const likePost = async (req,res)=>{
    console.log("Liking process");
    console.log(req.params.id);
    try {
        PostMessage.findOne({id : req.params.id}).then((post)=>{
            PostMessage.findOneAndUpdate({id : req.params.id},{likeCount : post.likeCount+1}).then((post)=>{
                res.status(200).json()
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
            console.log(error);
        });
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}