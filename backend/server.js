import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adsRouter from "./routes/ads.route.js";
import userRouter from "./routes/user.route.js";
import 'dotenv/config';
import cookieParser from 'cookie-parser'; 
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'express-formidable';
 

//app config
const app = express();
const port = 8000;

cloudinary.config({ 
    cloud_name: 'dmpddds7y', 
    api_key: '559493991877522', 
    api_secret: '_orIYNQVmM3VdNPZAjIrY8bK7vE' // Click 'View API Keys' above to copy your API secret
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

app.post("/test", (req, res) => {
    console.log("test", req.fields)
    return res.send(req.fields)
 }); 

 app.get("/test", (req, res) => {
    console.log("get", req.fields)
    return res.send(req.fields)
 }); 

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
