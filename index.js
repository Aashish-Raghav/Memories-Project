import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.urlencoded({limit : "30mb" ,extended : true}));
app.use(bodyParser.json({limit : "30mb", extended : true}))
app.use(cors());
app.use("/posts",postRouter);
dotenv.config();


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Successfully connected to port" + PORT);
    })
})
.catch((err)=>{
    console.log(err);
});