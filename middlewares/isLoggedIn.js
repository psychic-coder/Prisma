import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken";


const isLoggedIn=async(req,res,next)=>{
    try {
        const token=req.cookie.token;
        if(!token){
            res.send('Please Login')
            throw new Error('Your are not logged in');
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await prisma.findUnique({
            where:{
                id:decoded.userId
            }
        })
        next();
    } catch (error) {
        throw new Error(error);
    }
}