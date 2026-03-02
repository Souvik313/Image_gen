import express from 'express';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import PostSchema from '../mongodb/models/post.js';

dotenv.config();

const postRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create a post
postRouter.post("/" , async(req , res) => {
    try {
        const {name , prompt , photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await PostSchema.create({
            name,
            prompt,
            photo: photoUrl.url
        });

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create post",
            error: error.message
        })
    }
})

// Get all posts
postRouter.get("/" , async(req , res) => {
    try {
        const allPosts = await PostSchema.find({}).sort({createdAt: -1});
        
        if (allPosts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: allPosts,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch posts",
            error: error.message,
        })
    }
})

export default postRouter;