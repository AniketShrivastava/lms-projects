// const { default: User } = require("../models/user.model.js");
// const { default: AppError } = require("../utils/AppError.js");
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
 const register = async (req, res) => {
    // Destructuring the necessary data from req object
    const { fullName, email, password } = req.body;

    // Check if the data is there or not, if not throw error message
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    // Check if the user exists with the provided email
    const userExists = await User.findOne({ email });

    // If user exists send the reponse
    if (userExists) {
        return next(new AppError('Email already exists', 409));
    }

    // Create new user with the given necessary data and save to DB
    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url:
                'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        },
    });

    // If user not created send message response
    if (!user) {
        return next(
            new AppError('User registration failed, please try again later', 400)
        );
    }
    // Save the user object
    await user.save();

    // TODO: get JWT Token  in cookie


    // Setting the password to undefined so it does not get sent in the response
    user.password = undefined;
    // If all good send the response to the frontend
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
}
const login = async (req, res) => {
    // Destructuring the necessary data from req object
    const { email, password } = req.body
    // Check if the data is there or not, if not throw error message
    if (!email || !password) {
        return next(new AppError('All fields are required', 400));
    }
    // Finding the user with the sent email
    const user = await User.findOne({ email }).select('+password');

 // If no user or sent password do not match then send generic response
    if (!user || !user.comparePassword(password)) {
        return next(new AppError('Email or Password do not match or user does not exist', 401));
    }

     // Generating a JWT token
    const token = await user.generateJWTToken();
    // Setting the password to undefined so it does not get sent in the response
    user.password = undefined;

     // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOptions);

   // If all good send the response to the frontend
   res.status(200).json({
    success:true,
    message:'User logged in  Successfully',
    user
   })
}
 const logout = (req, res) => {
    // Setting the cookie value to null
res.cookie('token',null,{
    secure:true,
    maxAge:0,
    httpOnly:true
})
  // Sending the response
res.status(200).json({
    success:true,
    message:'Userlogged out Successfully'
})
}
 const getProfile = async(req, res) => {
 // Finding the user using the id from modified req object
 const user = await User.findById(req.user._id);

   // Sending the response
res.status(200).json({
    success:true,
    message:'user details',
    user
});
}

export{
    register,
    login,
    logout,
    getProfile
}
