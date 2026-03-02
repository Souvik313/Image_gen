import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const dalleRouter = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

dalleRouter.get("/" , async(req , res) => {
    res.send("Hello from DALL-E");
})

dalleRouter.post("/" , async(req , res) => {
    try {
        const {prompt} = req.body;
        if(!prompt){
            return res.status(400).json({
                message: "Prompt is required",
            })
        }
        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        });

        const imageUrl = aiResponse.data[0].url;
        res.status(200).json({
            photo: imageUrl,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        })
    }
})

export default dalleRouter;