const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');
const asyncHandler = require('../utils/Asynchandler.js');
const usermodel = require('../models/usermodel.js');

const UserRegister = asyncHandler(async(req,res)=>{

    const {username,name,email,password} = req.body;

    if (!username || !name || !email || !password) {
        throw new ApiError(400,"All fields are required")
    }
    try {
        //check if username already exists
        const ExistingUser = await usermodel.findOne({
            $or:[{username: username},{email: email}]
        })
        if (ExistingUser) {
            throw new ApiError(400 , "User already exists");
        }

        // create user 
        const user = "created"

        // create token
        const token = 1234;

        const cookieOptions = {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
            sameSite: "lax", // Protects against CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (e.g., 1 day)
        };

        // attach to cookie
        res.status(201)
        .cookie("token",token,cookieOptions)
        .json(new ApiResponse(201,user,"User registered successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})

const GetUser = asyncHandler( async(req, res) => {
    // code
})

module.exports = {
    UserRegister,
    GetUser
}