import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adsRouter from "./routes/ads.route.js";
import userRouter from "./routes/user.route.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'express-formidable';

dotenv.config();
 

//app config
const app = express();
const port = 8000;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true }));  
app.use(express.text())
app.use(formidable());

//db connection
connectDB();

//api endpoint
app.use("/api/ads", adsRouter);
app.use("/api/user", userRouter);


//test api
// app.get("/", (req, res) => {
//    res.send('HEllO')
// });

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
