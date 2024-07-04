import jwt from "jsonwebtoken";

export const getJwtToken = (userId) => {
  return jwt.sign({userId: userId},process.env.JWT_SECRET,{expiresIn: "1 day"}
  );
};




//THIS middleware guve a jwttoken