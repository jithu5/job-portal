const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/Asynchandler');
const usermodel = require('../models/usermodel');
const companymodel = require('../models/companymodel');
const adminmodel = require('../models/adminmodel');


//login
const Login = asyncHandler(async(req,res)=>{
   try {
    const {email, password} = req.body;
    const admin = await adminmodel.findOne({email});
    const isMatch = await admin.comparePassword(password);
    if(!admin ||!isMatch){
        throw new ApiError(401, 'Invalid email or password');
    }
    const token = admin.generateToken();
    const cookieOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res.cookie("userToken", token, cookieOptions).json(
        new ApiResponse(200, admin, "Admin logged in successfully")
    );
   } catch (error) {
       throw new ApiError(error.statusCode,error.message);
   }
});

const GetUsers = asyncHandler(async (req, res) => {
    try {
        const users = await usermodel.find({});
        if (!users) {
            return res.json(new ApiResponse(200,"Users not found"));
        }
        return res.json(new ApiResponse(200, users, "Users fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const GetCompany = asyncHandler(async (req, res) => {
    try {
        const company = await companymodel.find({});
        if (!company) {
            return res.json(new ApiResponse(200,"Company not found"));
        }
        return res.json(new ApiResponse(200, company, "Company fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const Logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure it's secure
            sameSite: "lax",
        });

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Admin logged out"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

module.exports = {
    Login,
    GetUsers,
    GetCompany,
    Logout,
}