import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken";


export const isLoggedIn=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            res.send('Please Login')
            throw new Error('Your are not logged in');
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await prisma.user.findUnique({
            where:{
                id:decoded.userId
            }
        })
        next();
    } catch (error) {
        throw new Error(error);
    }
}