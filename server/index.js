import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/routes.js";
import registerrouter from './Routes/registerroutes.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
const app=express();

const allowedOrigins = [
    'http://localhost:3000', // Your frontend
    'http://localhost:3001', // Your backend
  ];
  
app.use(cookieParser());
app.use(cors({credentials:true,origin:allowedOrigins}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config({path:'../server/config.env'});

app.use('/',registerrouter);
app.use('/task',router);

mongoose.connect(process.env.MONGO_URI,{dbName:'ToDoList'})
.then(e=>app.listen(process.env.PORT ||3001,process.env.HOST,()=>console.log('Connection Established!')))
.catch(e=>console.log(e.message));


