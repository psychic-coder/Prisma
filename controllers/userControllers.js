import prisma from "../prisma/index.js"
import {cookieToken} from "../utils/cookieToken.js"

//user signup
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      throw new Error('Please provide all fields.');
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    })

    // Send user the token
    cookieToken(user, res);

  } catch (error) {
    next(error);
  }
};

export const login=async(req,res,next)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password){
      throw new Error (' Please provide email and password ')
    }
    //find a user based on email
    const user =await prisma.user.findUnique({
      where:{
        email
      }
    })
    //when there is no user
    if(!user){
      throw new Error (' No user with this emailId ');
    }
    
    //password mismatch

  if(user.password!==password){
      throw new Error (' Incorrect password ');
    }

  //user is there and validation

    cookieToken(user,res);
 
  } catch (error) {
    throw new Error(error);
  }
}

export const logout=async(req,res,next)=>{
  try {
    res.status(200).clearCookie('token').json({
      success:true
    })
  } catch (error) {
    throw new Error('Error while logging out');
  }
}