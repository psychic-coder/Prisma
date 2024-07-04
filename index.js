import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"

const app=express()
dotenv.config({path:"./.env"});

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie middleware
app.use(cookieParser());



app.get("/",(req,res)=>{
    res.send("Hello world!")
})
app.use("/api",userRouter)


app.listen(3000,()=>{
    console.log("Server is running on the port 3000 ");
})