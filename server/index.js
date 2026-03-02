import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRouter from './routes/post.routes.js';
import dalleRouter from './routes/dall-e.routes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.use("/api/v1/post" , postRouter);
app.use("/api/v1/dalle" , dalleRouter);

app.get("/" , async(req , res) => {
    res.send("Hello from DALL.E");
})

const startServer = async() => {
    try {
        connectDB(process.env.MONGODB_URI);
        app.listen(8080 , () => console.log("Server is running on port 8080"))
    } catch (error) {
        console.log(error);
    }
    
}

startServer();