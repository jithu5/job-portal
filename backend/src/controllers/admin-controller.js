const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/Asynchandler.js');
const usermodel = require('../models/usermodel.js');
const companymodel = require('../models/company.js');
const adminmodel = require('../models/admin.js');
const jobmodel = require('../models/jobs.js');
const applicantmodel = require('../models/applicants.js');
const wishlistmodel = require("../models/wishlist.js");


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

//view user profile
const ViewUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.json(new ApiResponse(404, "User not found"));
        }
        return res.json(new ApiResponse(200, user, "User fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});


//view company profile
const ViewCompany = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            return res.json(new ApiResponse(404, "Company not found"));
        }
        const jobs = await jobmodel.find({ company: companyId});
        if (!jobs) {
            throw new ApiError(404, "No posted jobs found");
        }
        const NoOfjobs = await jobs.length;
        const NoOfactivejobs = await jobs.filter(job => job.status === "Active").length;
        console.log("NoOfActive", NoOfactivejobs);
        console.log(NoOfjobs);
        
        
        return res.json(new ApiResponse(200,{company,NoOfactivejobs,NoOfjobs, jobs},"Company fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//delete user
const DeleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await usermodel.findByIdAndDelete(userId);
        if (!user) {
            return res.json(new ApiResponse(404, "User not found"));
        }
        const applicant = await applicantmodel.find({userId:userId});
        if (applicant.length > 0) {
            const jobIds = applicant.map(app => app.jobId);
            console.log("jobs",jobIds);
            await jobmodel.updateMany(
                {_id: {$in: jobIds}},
                {
                    $inc : { workersNeeded : 1},
                    $set : { status : 'Active' },
                },
            ) 
        }
        await applicantmodel.deleteMany({userId:userId});
        const userWishlist = await wishlistmodel.deleteMany({userId: userId});
        
        console.log(userWishlist);
        return res.json(new ApiResponse(200, user, "User deleted successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//delete company
const DeleteCompany = asyncHandler(async(req,res) => {
    const { companyId } = req.params;
    try {
        const company = await companymodel.findByIdAndDelete(companyId);
        if (!company) {
            throw new ApiError(error.statusCode || 500,error.message);
        }
        const jobs = await jobmodel.find({company : companyId});
        if (jobs.length > 0) {
            const jobIds = jobs.map(job => job._id);
            await jobmodel.deleteMany({company : companyId});
            await applicantmodel.deleteMany({jobId : {$in: jobIds}});
            await wishlistmodel.deleteMany({jobId : {$in: jobIds}});
        }
        
        return res.json(new ApiResponse(200, company, "Company deleted successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
})

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
    ViewUser,
    ViewCompany,
    DeleteUser,
    DeleteCompany,
    Logout,
}