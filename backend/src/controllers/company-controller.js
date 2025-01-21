const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/Asynchandler.js");
const companymodel = require("../models/company.js");

//company register
const CRegister = asyncHandler(async (req, res) => {
    const { cname, email, password, address, phone } = req.body;

    if (!cname || !email || !password || !address || !phone) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        //check if username already exists
        const ExistingC = await companymodel.findOne({
            $or: [{ Cname: cname }, { email: email }],
        });

        if (ExistingC) {
            throw new ApiError(400, "User already exists");
        }

        // create user
        const newcompany = new companymodel({
            Cname: cname,
            email: email,
            address: address,
            phone: phone,
            password: password,
        });
        await newcompany.save();

        const token = await newcompany.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.cookie("companyToken", token, cookieOptions).json(
            new ApiResponse(201, newcompany, "Company registered successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//user login
const CLogin = asyncHandler(async (req, res, next) => {
    const {email,password} = req.body;

    try {
        const company = await companymodel.findOne({email: email});

        if (!company) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = await company.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.cookie("companyToken", token, cookieOptions).json(
            new ApiResponse(200, company, "Company logged in successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const GetCompany = asyncHandler(async (req, res) => {
    const companyId = req.company;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        res.json(new ApiResponse(200, company, "Company retrieved successfully"));
    }
    catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

module.exports = {
    CRegister,
    GetCompany,
    CLogin,
};
