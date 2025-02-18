const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/Asynchandler.js');
const usermodel = require('../models/usermodel.js');
const companymodel = require('../models/company.js');
const adminmodel = require('../models/admin.js');


//register
const Register = asyncHandler(async(req,res) => {
    try {
        const {name, email, password} = req.body;
        const existingAdmin = await adminmodel.findOne({email});
        if(existingAdmin) {
            throw new ApiError(400, 'Admin already exists');
        }
        const newAdmin = await adminmodel.create({name, email, password});
        const token = newAdmin.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        }
    return res.cookie("adminToken", token, cookieOptions).json(
        new ApiResponse(201, newAdmin, "Admin registered successfully"));
    }catch{
        throw new ApiError(500, 'Server error');
    }
});

//login
const Login = asyncHandler(async(req,res)=>{
   try {
    const {email, password} = req.body;
    const admin = await adminmodel.findOne({email});
    const isMatch = await admin.comparePassword(password);
    if(!admin ||!isMatch){
        throw new ApiError(401, 'Invalid email or password');
    }
    const token = await admin.generateToken();
    const cookieOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res.cookie("adminToken", token, cookieOptions).json(
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
    Register,
    Login,
    GetUsers,
    GetCompany,
    Logout,
}