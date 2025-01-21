const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/Asynchandler.js");
const usermodel = require("../models/usermodel.js");






//user register
const UserRegister = asyncHandler(async (req, res) => {
    const { username, name, email, password, gender, address, phone, age } =
        req.body;

    if (
        !username ||
        !name ||
        !email ||
        !password ||
        !gender ||
        !address ||
        !phone ||
        !age
    ) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        //check if username already exists
        const ExistingUser = await usermodel.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (ExistingUser) {
            throw new ApiError(400, "User already exists");
        }

        // create user
        const newuser = new usermodel({
            username: username,
            name: name,
            email: email,
            gender: gender,
            address: address,
            phone: phone,
            age: age,
            password: password,
        });
        await newuser.save();

        const token = await newuser.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        

        res.
        cookie("userToken",token,cookieOptions).json(
            new ApiResponse(201, newuser, "User registered successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//user login
const UserLogin = asyncHandler(async (req, res, next) => {
    console.log("Login route hit"); // Debug log
    const { email, password } = req.body;
    
    if (!email ||!password) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials");
        }
        const token = await user.generateToken();
        
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.
        cookie("userToken", token, cookieOptions).json(
            new ApiResponse(200, user, "User logged in successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});



const GetUser = asyncHandler(async (req, res) => {
    const userId = req.user;
    try {
        const user = await usermodel.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.json(new ApiResponse(200, user, "User fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
        
    }
});

module.exports = {
    UserRegister,
    GetUser,
    UserLogin,
};
