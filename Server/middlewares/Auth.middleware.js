import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const isLoggedIn = function(req,res,next){
  // extracting token from the cookies
    const {token}= req.cookies;
     // If no token send unauthorized message
    if(!token){
        return next(new AppError('Unauthenticated,please login',401))
    }
    // Decoding the token using jwt package verify method
    const tokenDetails = jwt.verify(token,process.env.JWT_SECRET);

    if(!tokenDetails){
        return next(new AppError('Unauthenticated, please login',401))
    }

    req.user = tokenDetails;
    next();
    
}
export default isLoggedIn;