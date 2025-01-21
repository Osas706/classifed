import express from "express";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adsRouter from "./routes/ads.route.js";
import userRouter from "./routes/user.route.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'express-formidable';
import { fileURLToPath } from 'url';

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

// Mimic __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
