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